---
marp: true
title: Hybrid & Multi-VPC Connectivity — Peering, TGW, VPN, DX
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

# Hybrid & Multi-VPC Connectivity

Peering vs Transit Gateway vs VPN vs Direct Connect.

---

## Learning goals

- Pick the right connectivity primitive
- Understand routing and segmentation at scale
- Know common pitfalls (overlaps, propagation, asymmetric routes)

---

## Agenda

- Why multi-VPC/hybrid gets hard (scale)
- VPC Peering (and gotchas)
- Transit Gateway (hub + segmentation)
- VPN vs Direct Connect
- Routing/inspection principles

---

## The scaling problem

As VPC count grows, you need:

- predictable routing
- centralized inspection (sometimes)
- segmentation (prod/dev/shared)
- non-overlapping CIDRs

---

## Option 1: VPC Peering

- Simple, point-to-point connectivity
- No transitive routing
- No overlapping CIDRs

Great for: small numbers of VPCs or explicit pairs.

---

## Peering gotchas

- You must add routes in **both** VPC route tables
- Security rules still apply (SG/NACL)
- DNS resolution across peering requires configuration

---

## Option 2: Transit Gateway (TGW)

Think of TGW as a hub that:

- connects many VPCs and on-prem networks
- supports transitive routing
- enables segmentation via TGW route tables

---

## TGW mental model

- Attachments connect VPCs/VPN/DX
- TGW route tables decide where traffic goes
- You can associate/propagate attachments into route tables

---

## Segmentation with TGW

Common pattern:

- Shared Services VPC
- Prod VPCs
- Dev VPCs

Use separate TGW route tables to control who can talk to whom.

---

## Option 3: Site-to-Site VPN

- Encrypted tunnel over the internet
- Fast to set up
- Usually lower bandwidth / higher variance than DX

Good for: quick hybrid connectivity and backup paths.

---

## Option 4: Direct Connect (DX)

- Private connectivity from on-prem to AWS
- More consistent latency/bandwidth
- Still requires routing design (usually BGP)

Often paired with VPN for encryption/backup.

---

## Routing principles (don’t skip)

- Avoid overlapping CIDRs (future you will thank you)
- Ensure return path exists (no asymmetric routes)
- Consider route propagation vs static routes

---

## Inspection patterns (high level)

Some orgs require centralized inspection:

- Hub-and-spoke with inspection VPC
- Egress control via NAT + firewall
- East-west filtering via appliances

Start simple unless policy requires otherwise.

---

## Recap

- Why multi-VPC/hybrid gets hard (scale)
- VPC Peering (and gotchas)
- Transit Gateway (hub + segmentation)
- VPN vs Direct Connect
- Routing/inspection principles

---

## IGW vs TGW — VPN traffic handling

<!-- footer: Continued on next slide → -->

- Internet Gateway (IGW): provides ingress/egress for internet-originated traffic to resources in a VPC. IGWs are not the termination point for VPN tunnels.

- Transit Gateway (TGW): central hub that terminates IPsec VPN tunnels and routes VPN-originated traffic into the appropriate VPC attachments. Use TGW route tables to control where tunneled traffic is forwarded.

---

## IGW vs TGW — VPN traffic handling (cont.)

<!-- footer: "" -->

- Security Groups and prefix-lists: apply access controls to instances and services. To permit VPN-originated traffic, add the VPN CIDRs or a prefix-list to the relevant Security Group ingress rules.

- Recommended pattern: terminate VPNs at the TGW, propagate/associate attachments into TGW route tables, and enforce access using Security Groups (and NACLs where needed).

---

## Acronyms (quick reference)

- **ASN** — Autonomous System Number
- **AZ** — Availability Zone
- **BGP** — Border Gateway Protocol
- **CIDR** — Classless Inter-Domain Routing (IP range notation)
- **DX** — Direct Connect
- **NACL** — Network Access Control List
- **SG** — Security Group
- **IGW** — Internet Gateway
- **TGW** — Transit Gateway
- **VPN** — Virtual Private Network
- **VPC** — Virtual Private Cloud

---

## Next

IAM fundamentals (who can do what).
