---
marp: true
title: Logging, Detection, and Response
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

# Logging, Detection, and Response

Make security and troubleshooting evidence-based.

---

## Learning goals

- Know the key logs for IAM + networking
- Understand detection services and their roles
- Build a simple incident response loop

---

## Agenda

- CloudTrail (API audit)
- CloudWatch (metrics + logs)
- VPC Flow Logs (network evidence)
- Config (change history)
- Detection + response loop

---

## CloudTrail (the audit log)

CloudTrail records:
- AWS API calls (who did what, when, from where)

This is the backbone for:
- security investigations
- IAM troubleshooting
- compliance evidence

---

## CloudWatch (metrics + logs)

CloudWatch provides:
- metrics and alarms
- log ingestion/search (CloudWatch Logs)

Use it for:
- service health
- app/service log centralization

---

## VPC Flow Logs

Flow logs show network metadata:
- accept/reject (depending on config)
- 5-tuple (src/dst IP/port, protocol)
- bytes, packets

Great for answering: “was it blocked or never sent?”

---

## Config (configuration history)

AWS Config tracks:
- resource configuration changes
- compliance against rules

Useful for:
- drift detection
- answering “when did this security group change?”

---

## GuardDuty

GuardDuty detects suspicious activity using:
- CloudTrail
- VPC Flow Logs
- DNS logs (where applicable)

It’s a detector, not a blocker.

---

## Security Hub

Security Hub:
- aggregates findings across services
- helps prioritize and standardize

Think: “single pane for security posture.”

---

## IAM Access Analyzer

Access Analyzer helps identify:
- unintended resource sharing
- overly broad access paths

Great for: S3, IAM roles trust, KMS, and more.

---

## Response loop (simple)

1. Detect (finding/alert)
2. Triage (is it real?)
3. Contain (limit blast radius)
4. Eradicate (remove cause)
5. Recover (restore service)
6. Learn (fix controls)

---

## Practical best practices (starter set)

- Centralize CloudTrail (org trail) to a log archive account
- Retain logs long enough for investigations
- Alert on high-signal events (root use, IAM policy changes)

---

## Recap

- CloudTrail (API audit)
- CloudWatch (metrics + logs)
- VPC Flow Logs (network evidence)
- Config (change history)
- Detection + response loop

---

## Next

Troubleshooting and design patterns.

---

## Acronyms (quick reference)

- **API** — Application Programming Interface
- **AWS** — Amazon Web Services
- **CW** — CloudWatch
- **DNS** — Domain Name System
- **IR** — Incident Response
- **KMS** — Key Management Service
- **SIEM** — Security Information and Event Management
- **VPC** — Virtual Private Cloud
