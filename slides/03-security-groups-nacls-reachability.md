---
marp: true
title: Security Groups, NACLs, and Reachability
paginate: true
style: |
  section {
    background: #0b1220;
    color: #e5e7eb;
  }

  h1, h2, h3 {
    color: #f8fafc;
  }

  a { color: #93c5fd; }

  code {
    background: #111827;
  }

  pre code {
    background: #111827;
  }
---

# Security Groups, NACLs, and Reachability

How AWS decides “allowed” vs “blocked”.

---

## Learning goals

- Know when to use SGs vs NACLs
- Understand stateful vs stateless behavior
- Troubleshoot “timeouts” systematically

---

## Agenda

- Security Groups (stateful)
- NACLs (stateless)
- Stateful vs stateless in practice (ephemeral ports)
- Reachability mindset + debugging tools

---

## Security Groups (SGs)

- Attached to **ENIs** (instance/network interface)
- **Stateful**: return traffic is automatically allowed
- Rules are **allow-only**
- Best for: most workload protection

---

## NACLs (Network ACLs)

- Attached to **subnets**
- **Stateless**: you must allow both directions
- Rules can **allow** and **deny**
- Evaluated in order (lowest rule number wins)

---

## SG vs NACL: quick guidance

- Default: use **SGs** for app-level network control
- Use **NACLs** for:
  - broad subnet guardrails
  - explicit deny requirements
  - extra defense-in-depth (carefully)

---

## “Stateful” matters (example)

If SG allows inbound `TCP 443`:

- Response traffic is allowed automatically

If NACL allows inbound `TCP 443`:

- You must also allow outbound ephemeral ports

---

## Ephemeral ports (why they matter)

Client connects from a high port (example):

- client `49152–65535` → server `443`

Return traffic is:

- server `443` → client ephemeral port

NACLs must allow the return path.

---

## Common failure pattern

“SG looks right but it still times out” often means:

- NACL blocks return traffic
- route table wrong
- target is wrong IP / wrong DNS
- app isn’t listening

---

## Inbound vs outbound in SGs

- Inbound: what you allow _to reach_ the ENI
- Outbound: what the ENI can initiate

Least privilege means tightening both, but don’t break dependencies (DNS, metrics, updates).

---

## Referencing SGs

Instead of CIDRs, you can allow traffic from:

- another **security group**

This is great for tiering:

- ALB SG → app SG
- app SG → DB SG

---

## Default SG behavior

The **default** security group in a VPC:

- allows **all outbound** traffic
- allows **inbound only from itself** (same SG)

Best practice: create custom SGs rather than modifying the default.

---

## SG limits to know

Default limits (can request increases):

- **5 SGs** per ENI (can increase to 16)
- **60 inbound + 60 outbound** rules per SG

**Critical hard limit**: max **1000 combined rules per ENI** (inbound + outbound across all attached SGs).

This limit **cannot be increased**—it's architectural.

---

## The 1000-rule formula

`(SGs per ENI) × (rules per SG) ≤ 1000`

Examples:

- 5 SGs × 60 rules each = 300 ✅
- 10 SGs × 100 rules each = 1000 ✅
- 16 SGs × 80 rules each = 1280 ❌ **Error!**

If you hit this, you'll see: "maximum number of rules per security group has been reached"

---

## Workarounds for the 1000-rule limit

If you're hitting the limit:

1. **Consolidate SGs**: Merge similar rules into fewer groups
2. **Use SG references**: One SG reference = 1 rule (vs many CIDRs)
3. **Use prefix lists**: Group CIDRs into managed prefix lists (1 entry = 1 rule)
4. **Architecture change**: Split workloads across multiple ENIs/instances
5. **Review for cleanup**: Remove stale or redundant rules

SGs don't log denials—use **VPC Flow Logs** for visibility.

---

## Prefix lists (what they are)

A **prefix list** is a named collection of CIDR blocks.

Use them in:

- Security group rules (instead of individual CIDRs)
- Route tables (instead of individual destination CIDRs)

Benefits:

- **Reduce rule count**: 1 prefix list = 1 rule (even with many CIDRs)
- **Central management**: Update once, applies everywhere it's referenced

---

## Prefix list types

**AWS-managed prefix lists**:

- Pre-built for AWS services (S3, DynamoDB, CloudFront)
- Automatically updated by AWS
- Example: `com.amazonaws.us-east-1.s3`

**Customer-managed prefix lists**:

- You define the CIDR ranges
- Use for: partner IPs, corporate networks, trusted sources
- Can be shared across accounts via **Resource Access Manager (RAM)**

---

## Prefix lists in practice

In a Security Group rule:

- Instead of 50 individual CIDR rules → 1 prefix list rule

In a Route Table:

- Route to S3 endpoint using the S3 managed prefix list

Rule count impact:

- Each prefix list entry counts toward the 1000-rule limit
- But in the _rule definition_, it's just 1 rule to manage

---

## Security Group best practices

- Name SGs by **function**, not server (`web-tier-sg`, not `instance-1-sg`)
- Use **SG references** instead of CIDRs where possible (self-documenting)
- Restrict outbound where practical (limit blast radius)
- Review periodically with **IAM Access Analyzer**
- Remember: SGs don't log—enable **VPC Flow Logs** for visibility

---

## Security layers (the full picture)

Internet → **WAF** → **ALB SG** → **NACL** → **App SG** → **App**

Each layer can block. IAM controls who can _change_ these layers.

Debugging tip: start from the outside, work inward.

---

## Reachability is a chain

To reach an instance/service you typically need:

- correct IP/DNS
- correct routing
- NACL allows
- SG allows
- OS/app allows

One “deny” anywhere breaks it.

---

## Tools to debug

- VPC Reachability Analyzer (path analysis)
- VPC Flow Logs (see accepts/rejects)
- Instance-level checks (listening ports, firewall)

---

## Recap

- Security Groups (stateful)
- NACLs (stateless)
- Stateful vs stateless in practice (ephemeral ports)
- Reachability mindset + debugging tools

---

## Next

NAT, endpoints, and DNS for private networking.

---

## Acronyms (quick reference)

- **ALB** — Application Load Balancer
- **CIDR** — Classless Inter-Domain Routing (IP range notation)
- **DB** — Database
- **DNS** — Domain Name System
- **ENI** — Elastic Network Interface
- **NACL** — Network Access Control List
- **RAM** — Resource Access Manager
- **SG** — Security Group
- **TCP** — Transmission Control Protocol
- **VPC** — Virtual Private Cloud
- **WAF** — Web Application Firewall
