---
marp: true
title: Egress, NAT, VPC Endpoints, and DNS
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

# Egress, NAT, VPC Endpoints, and DNS

How private workloads talk to AWS services and the internet.

---

## Learning goals

- Understand outbound (egress) patterns
- Know when to use NAT vs VPC endpoints
- Use DNS intentionally (not accidentally)

---

## Agenda

- Egress patterns (what “needs internet” really means)
- NAT Gateway design tradeoffs
- VPC Endpoints (Gateway + Interface)
- DNS and Route 53 Resolver behavior

---

## Egress: define what you mean

When someone says “needs internet”, ask:

- Does it need the **public internet**?
- Or just **AWS APIs** (S3, STS, ECR, CloudWatch)?

These are different designs.

---

## NAT Gateway (what it is)

NAT Gateway provides:

- outbound connectivity from private subnets to the internet
- source IP translation to the NAT’s public IP

It does **not** accept unsolicited inbound.

---

## NAT Gateway placement & HA

- NAT Gateway is **AZ-scoped**
- Best practice: **one NAT GW per AZ**
- Private subnets in AZ-A route `0.0.0.0/0` to NAT in AZ-A

This avoids cross-AZ dependency during failure.

---

## Common NAT costs/tradeoffs

- NAT Gateway charges per hour + per GB
- High egress workloads can get expensive

Often cheaper/better:

- VPC endpoints for AWS services
- private registries/mirrors

---

## VPC Endpoints: the big idea

A VPC endpoint lets private resources reach AWS services

- **without** using the public internet
- often without NAT

Two main types:

- **Gateway endpoints**
- **Interface endpoints (PrivateLink)**

---

## Gateway endpoints

Used for:

- S3
- DynamoDB

Characteristics:

- route-table based
- no ENIs
- great for high-throughput private access

---

## Interface endpoints (PrivateLink)

Used for many AWS services (and 3rd party/private services).

Characteristics:

- creates **ENIs** in your subnets
- uses **security groups**
- DNS can map service hostnames to endpoint IPs

---

## Endpoint policies

VPC endpoints can have policies.

Think of them as:

- an additional authorization guardrail

Example: allow only specific S3 buckets via the endpoint.

---

## Endpoint policy example (S3)

```json
{
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::my-approved-bucket/*"
    }
  ]
}
```

This restricts the endpoint to specific buckets—defense in depth.

---

## DNS: what changes with endpoints?

With private DNS enabled for an interface endpoint:

- `service.region.amazonaws.com` resolves to private IPs (the endpoint)

Without it:

- the hostname resolves publicly, and you may need NAT/IGW

---

## Route 53 Resolver (in VPC)

Inside a VPC:

- the VPC resolver answers DNS queries

For hybrid DNS you can use:

- inbound/outbound **Resolver endpoints**
- conditional forwarding rules

---

## Private Hosted Zones

Private hosted zones enable:

- split-horizon DNS (internal vs external names)

Examples:

- `db.internal.example.com` only resolvable inside VPCs

---

## Recap

- Egress patterns (what “needs internet” really means)
- NAT Gateway design tradeoffs
- VPC Endpoints (Gateway + Interface)
- DNS and Route 53 Resolver behavior

---

## Next

Connecting clients and services (ALB, NLB, API Gateway).

---

## Acronyms (quick reference)

- **API** — Application Programming Interface
- **AZ** — Availability Zone
- **DDB** — DynamoDB
- **DNS** — Domain Name System
- **ECR** — Elastic Container Registry
- **ENI** — Elastic Network Interface
- **GW** — Gateway
- **NAT** — Network Address Translation
- **R53** — Route 53
- **S3** — Simple Storage Service
- **STS** — Security Token Service
- **VPC** — Virtual Private Cloud
- **VPCE** — VPC Endpoint
