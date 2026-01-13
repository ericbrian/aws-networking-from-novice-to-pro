---
marp: true
title: VPC, Subnets, and Routing
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

# VPC, Subnets, and Routing

How AWS traffic actually moves.

---

## Learning goals

- Choose sensible CIDRs and subnet layouts
- Understand route tables and “next hops”
- Build the common public/private VPC pattern

---

## Agenda

- CIDR planning
- Subnet layout (AZ-scoped)
- Route tables + next hops (IGW, NAT)
- Common architecture + debugging checklist

---

## CIDR planning (practical)

- Pick a VPC CIDR big enough for growth
- Avoid overlaps if you’ll ever connect networks
- Typical starters: `10.0.0.0/16`, `172.16.0.0/16`

Rule of thumb: **renumbering later is painful**.

---

## Subnets are AZ-scoped

Common layout (two AZs):
- `public-a`, `public-b`
- `private-a`, `private-b`

Each subnet has:
- its own CIDR
- an associated route table

---

## Route table basics

A route table is: destination → target

Examples:
- `10.0.0.0/16` → `local`
- `0.0.0.0/0` → `igw-…`
- `0.0.0.0/0` → `nat-…`

---

## Local route (always there)

Every VPC route table has:
- **VPC CIDR → local**

Meaning: instances in different subnets can talk *if security rules allow*.

---

## Internet Gateway (IGW)

IGW enables:
- inbound/outbound internet routing for **public IPs**

Typical public subnet route:
- `0.0.0.0/0` → IGW

---

## Public subnet ≠ public instance

For inbound internet access you still need:
- public IP (or public load balancer)
- security group allowing traffic
- NACL not blocking
- correct routes

---

## Private subnets and NAT

Private subnet typical route:
- `0.0.0.0/0` → NAT Gateway (in a public subnet)

This gives outbound internet for patching, package installs, etc.

---

## Route table associations

- A subnet is associated with **one** route table
- Multiple subnets can share a route table

Pro tip: keep route tables named by purpose, not by AZ.

---

## VPC router is implicit

You don’t manage routers directly.
You manage:
- route tables
- attachments (IGW, NAT, TGW, endpoints)

AWS provides the underlying routing.

---

## Common baseline architecture

- 2+ AZs
- Public subnets: ALB/NLB, NAT gateways
- Private subnets: apps, databases
- No direct inbound to instances unless required

---

## Quick checklist: “why no connectivity?”

1. Are both subnets in the right VPC/CIDR?
2. Correct route table association?
3. Right `0.0.0.0/0` next hop?
4. SG/NACL allow traffic?
5. Does the instance have correct IP / public IP?

---

## Recap

- CIDR planning
- Subnet layout (AZ-scoped)
- Route tables + next hops (IGW, NAT)
- Common architecture + debugging checklist

---

## Next

Security groups, NACLs, and reachability.

---

## Acronyms (quick reference)

- **ALB** — Application Load Balancer
- **AZ** — Availability Zone
- **CIDR** — Classless Inter-Domain Routing (IP range notation)
- **IGW** — Internet Gateway
- **NAT** — Network Address Translation
- **NLB** — Network Load Balancer
- **VPC** — Virtual Private Cloud
