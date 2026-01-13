---
marp: true
title: Connectivity Patterns — ALB, NLB, API Gateway
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

# Connectivity Patterns — ALB, NLB, API Gateway

Expose services safely and predictably.

---

## Learning goals

- Know what ALB vs NLB vs API Gateway are for
- Understand where TLS terminates
- Pick the simplest correct front door

---

## Agenda

- Pick the right protocol level (L7 vs L4)
- ALB vs NLB vs API Gateway
- Health checks + TLS termination choices
- Security boundaries (WAF, private APIs)

---

## First decision: protocol level

- Layer 7 (HTTP): routing by host/path, headers
- Layer 4 (TCP/UDP): pass-through connections

AWS choices map cleanly:

- **ALB** (L7)
- **NLB** (L4)

---

## ALB (Application Load Balancer)

Great for:

- HTTP/HTTPS apps
- path-based routing (`/api`, `/static`)
- host-based routing (`api.example.com`)
- TLS termination (common)

---

## NLB (Network Load Balancer)

Great for:

- TCP/UDP services
- very high connection rates
- preserving client IP (common requirement)

Often used for:

- gRPC over HTTP/2 with TCP mode
- non-HTTP protocols

---

## Health checks matter

Load balancers are only as good as health checks.

Common pitfalls:

- checking the wrong path
- health check blocked by SG/NACL
- app returns 302/401 and is marked unhealthy

---

## API Gateway (front door for APIs)

Great for:

- public APIs with auth, throttling, usage plans
- request validation/transforms
- integrating with Lambda or HTTP backends

Often paired with:

- WAF
- custom domains + TLS

---

## Private APIs

You can keep APIs private via:

- internal ALB/NLB
- API Gateway private endpoints
- VPC endpoints / PrivateLink patterns

Goal: avoid exposing workloads directly.

---

## TLS termination choices

You can terminate TLS at:

- ALB / API Gateway (common)
- NLB (possible)
- the instance/service (end-to-end)

Tradeoff: central manageability vs strict end-to-end encryption.

---

## Security boundaries

Your “front door” should be the only internet-facing component.

Typical pattern:

- Internet → ALB/API GW
- ALB/API GW → private app targets

Use SG references:

- ALB SG → app SG

---

## ALB security features

- **Security groups**: ALB gets its own SG (control inbound sources)
- **WAF integration**: Block SQL injection, XSS, bad bots at the edge
- **Authentication**: Built-in OIDC/Cognito auth before hitting backend
- **Access logs**: Who accessed what, when (S3 destination)
- **TLS policies**: Choose cipher suites (e.g., `ELBSecurityPolicy-TLS13-1-2-2021-06`)

Pattern: WAF → ALB → private targets

---

## WAF for ALB (quick primer)

AWS WAF sits in front of ALB to:

- Rate-limit requests (prevent abuse)
- Block known-bad IPs (managed rule sets)
- Filter requests by headers/body/geo

Start with **AWS Managed Rules**, then customize.

Common rule groups:

- `AWSManagedRulesCommonRuleSet`
- `AWSManagedRulesSQLiRuleSet`
- `AWSManagedRulesKnownBadInputsRuleSet`

---

## Recap

- Pick the right protocol level (L7 vs L4)
- ALB vs NLB vs API Gateway
- Health checks + TLS termination choices
- Security boundaries (WAF, private APIs)

---

## Next

Multi-VPC and hybrid connectivity.

---

## Acronyms (quick reference)

- **ACM** — AWS Certificate Manager
- **ALB** — Application Load Balancer
- **API** — Application Programming Interface
- **AWS** — Amazon Web Services
- **DNS** — Domain Name System
- **gRPC** — Google Remote Procedure Call (protocol)
- **HTTP** — Hypertext Transfer Protocol
- **HTTPS** — HTTP over TLS
- **L4** — Layer 4 (transport)
- **L7** — Layer 7 (application)
- **NLB** — Network Load Balancer
- **TCP** — Transmission Control Protocol
- **TLS** — Transport Layer Security
- **UDP** — User Datagram Protocol
- **WAF** — Web Application Firewall
