---
marp: true
title: Security Groups, NACLs, and Reachability
paginate: true
style: |
  section {
    background: #fbf6ea;
    color: #1f2937;
  }

  h1, h2, h3 {
    color: #111827;
  }

  a { color: #1e40af; }

  code {
    background: #f3e8d2;
  }

  pre code {
    background: #f3e8d2;
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

- Inbound: what you allow *to reach* the ENI
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

## Summary

- SGs: stateful allow-only, attached to ENIs
- NACLs: stateless allow/deny, attached to subnets
- Debug with a chain mindset

Next: NAT, endpoints, and DNS for private networking.

---

## Acronyms (quick reference)

- **ALB** — Application Load Balancer
- **CIDR** — Classless Inter-Domain Routing (IP range notation)
- **DB** — Database
- **DNS** — Domain Name System
- **ENI** — Elastic Network Interface
- **NACL** — Network Access Control List
- **SG** — Security Group
- **TCP** — Transmission Control Protocol
- **VPC** — Virtual Private Cloud
