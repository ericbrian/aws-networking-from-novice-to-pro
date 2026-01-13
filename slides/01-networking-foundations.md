---
marp: true
title: AWS Networking Foundations
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

# AWS Networking Foundations

From “what is a VPC?” to thinking like a network engineer in AWS.

---

## Learning goals

- Understand the *layers* involved (IP, routing, DNS, firewalls)
- Map traditional networking concepts to AWS primitives
- Build a reliable mental model for “why traffic does / doesn’t flow”

---

## Agenda

- Addressing (IPs and CIDR)
- Routing (how traffic finds a path)
- Filtering (SGs/NACLs)
- Name resolution (DNS)

---

## Your core mental model (keep this forever)

For a packet to work end-to-end, you need:

1. **Addressing**: source + destination IPs make sense
2. **Routing**: a path exists *both directions*
3. **Filtering**: stateful/stateless rules allow it
4. **Name resolution** (often): DNS points where you think

---

## AWS networking is still IP networking

- Instances have IPs (private, sometimes public)
- Subnets are IP ranges (CIDR blocks)
- Route tables move packets between networks
- Firewalls decide what is permitted

AWS adds *managed constructs* around these basics.

---

## What is a VPC?

A **VPC** is a logically isolated network in AWS.

In practical terms, a VPC gives you:
- an IP address space (CIDR)
- routing control
- network policy boundaries
- a place to attach subnets and gateways

---

## Subnets (in AWS)

A **subnet** is:
- a slice of the VPC CIDR
- placed in **one** Availability Zone (AZ)

Subnets are where ENIs (network interfaces) live.

---

## Route tables

A **route table** is a set of rules: 
"for destination X, next hop is Y".

Common next hops:
- **local** (within the VPC)
- Internet Gateway (IGW)
- NAT Gateway
- Transit Gateway (TGW)
- VPC Endpoint

---

## Public vs private subnet (definition)

A subnet is typically called:
- **public**: its route table has a route to an **IGW** for 0.0.0.0/0
- **private**: it does *not* have a 0.0.0.0/0 route to an IGW

Important: “public subnet” does not automatically mean instances are public.

---

## Internet access: two different directions

- **Inbound from the internet** requires:
  - public IP (or ALB/NLB) + IGW + routing + security rules
- **Outbound to the internet** from private subnets typically requires:
  - NAT Gateway + routing + security rules

---

## Security controls at a glance

- **Security Groups (SGs)**: stateful, attached to ENIs
- **Network ACLs (NACLs)**: stateless, attached to subnets
- **Route tables**: not “security”, but decide reachability
- **IAM**: not “network”, but controls who can change all of this

---

## DNS basics in AWS

- VPC DNS resolver (Route 53 Resolver) answers queries *inside the VPC*
- Public DNS (Route 53 public hosted zones) resolves on the internet
- Private hosted zones resolve only for associated VPCs

DNS is often the hidden cause of “it times out”.

---

## The “two firewalls” idea

In AWS, traffic can be blocked by:

1. Subnet-level rules (NACL)
2. Interface-level rules (Security Group)

Plus: instance OS firewall, app config, and routing.

---

## AWS availability model matters

- Subnets are AZ-scoped
- Many managed network components are AZ-scoped (e.g., NAT GW)
- Design for failure: use multiple AZs, redundant routes, and resilient endpoints

---
## Recap

- Addressing (IPs and CIDR)
- Routing (how traffic finds a path)
- Filtering (SGs/NACLs)
- Name resolution (DNS)

---

## Next

Build a VPC, subnets, and routing patterns.

---

## Acronyms (quick reference)

- **AWS** — Amazon Web Services
- **AZ** — Availability Zone
- **CIDR** — Classless Inter-Domain Routing (IP range notation)
- **DNS** — Domain Name System
- **ENI** — Elastic Network Interface
- **IAM** — Identity and Access Management
- **IGW** — Internet Gateway
- **IP** — Internet Protocol
- **NACL** — Network Access Control List
- **NAT** — Network Address Translation
- **R53** — Route 53 (DNS service)
- **SG** — Security Group
- **TGW** — Transit Gateway
- **VPC** — Virtual Private Cloud
