---
marp: true
title: Troubleshooting and Design — From Symptoms to Systems
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

# Troubleshooting and Design

How to think like a pro.

---

## Learning goals

- Troubleshoot network/IAM issues systematically
- Understand common AWS design tradeoffs
- Learn patterns that scale (and patterns that hurt)

---

## Agenda

- A repeatable troubleshooting loop
- Network debugging checklist
- IAM debugging checklist
- Common IAM + network gotchas
- Practical design principles + next steps

---

## The pro troubleshooting loop

1. Define the symptom precisely (who, what, where, when)
2. Form a hypothesis
3. Check the simplest evidence first
4. Change one thing at a time
5. Validate and document the fix

---

## Network debugging checklist (repeatable)

- DNS: does name resolve to expected IP?
- Addressing: right IPs/subnets/CIDRs?
- Routing: route tables + next hops correct both ways?
- Filtering: SG/NACL/OS firewall allow it?
- App: is it listening? correct port? health checks?

---

## IAM debugging checklist (repeatable)

- What principal made the call? (CloudTrail)
- What action/resource was requested?
- Any explicit Deny (SCP, boundary, identity, resource policy)?
- Conditions matched (MFA, source IP, tags, VPCE)?
- Is it actually the right account/region?

---

## Common IAM + Network gotchas

- SG allows traffic, but **NACL blocks return path** (ephemeral ports!)
- IAM policy allows, but **VPC endpoint policy denies**
- Role's **trust policy doesn't list your principal** — you have permission to call `sts:AssumeRole`, but the role itself doesn't trust you (check the role's "Trust relationships" tab)
- Condition `aws:SourceVpce` doesn't match actual endpoint ID
- Cross-account: **missing resource policy** on target side
- Private subnet can't reach AWS APIs (need NAT or endpoint)
- DNS not resolving to endpoint IP (private DNS not enabled)

---

## Avoid common architecture traps

- Overlapping CIDRs (limits future connectivity)
- One NAT GW for all AZs (resiliency + cost surprises)
- Flat network with no segmentation
- Too many complex NACL rules (hard to debug)

---

## Design principles (practical)

- Default to private subnets for workloads
- Expose via a controlled front door (ALB/API GW)
- Use least privilege for IAM
- Log everything you’ll need for investigation

---

## Multi-account is a feature

At scale, prefer:

- separate AWS accounts for prod/dev/security/log-archive
- guardrails via SCPs
- centralized logs

Blast radius reduction is “pro-level” security.

---

## Your next steps to become “pro”

- Rebuild the same VPC design 3 times from scratch
- Break it on purpose and debug it
- Write one least-privilege IAM policy weekly
- Read CloudTrail events until they feel familiar

---

## Recap

- A repeatable troubleshooting loop
- Network debugging checklist
- IAM debugging checklist
- Common IAM + network gotchas
- Practical design principles + next steps

---

## Acronyms (quick reference)

- **ALB** — Application Load Balancer
- **API** — Application Programming Interface
- **CIDR** — Classless Inter-Domain Routing (IP range notation)
- **DNS** — Domain Name System
- **IAM** — Identity and Access Management
- **IR** — Incident Response
- **NACL** — Network Access Control List
- **NAT** — Network Address Translation
- **SCP** — Service Control Policy
- **SG** — Security Group
- **TGW** — Transit Gateway
- **VPC** — Virtual Private Cloud
