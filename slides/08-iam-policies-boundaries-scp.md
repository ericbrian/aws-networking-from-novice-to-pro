---
marp: true
title: IAM Policies — Evaluation, Conditions, Boundaries, SCPs
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

# IAM Policies — Evaluation, Conditions, Boundaries, SCPs

How AWS decides “allowed” at the API level.

---

## Learning goals

- Read policy JSON with confidence
- Understand evaluation order (Deny vs Allow)
- Know what permission boundaries and SCPs do (and don’t do)

---

## Policy building blocks

A statement typically includes:
- `Effect`: Allow or Deny
- `Action`: what API calls
- `Resource`: which ARNs
- `Condition`: extra constraints

---

## Identity vs resource policies

- **Identity-based**: attached to users/groups/roles
- **Resource-based**: attached to a resource (e.g., S3 bucket policy)

Both participate in evaluation.

---

## The golden rule

- **Explicit Deny** wins.

Then, you need a matching Allow.
If nothing matches, default is deny.

---

## Conditions are where power lives

Conditions let you do things like:
- restrict by source IP/VPC endpoint
- require MFA
- require tags
- restrict to TLS

This is how you implement real-world guardrails.

---

## Permission boundaries

A **permissions boundary** is a limit on a role/user.

Think: “Even if identity policies allow it, boundary must also allow it.”

Common use:
- delegated admin (teams can create roles, but only within a safe envelope)

---

## AWS Organizations + SCPs

A **Service Control Policy (SCP)** is an account/OU-level guardrail.

Think: “Maximum permissions an account can use.”

Important:
- SCPs **do not grant** permissions.
- SCPs can block actions even for admins.

---

## Where SCPs fit

Evaluation is roughly:
- SCPs set the outer limits
- permission boundary may further limit
- identity policy must allow
- resource policy must allow (when required)
- session policies may further limit

Always remember: Deny wins.

---

## Common pitfalls

- “I’m admin” but SCP denies it
- Permission boundary blocks a needed action
- Resource policy missing for cross-account
- Conditions too strict (e.g., wrong VPC endpoint ID)

---

## Tooling

- IAM Policy Simulator
- CloudTrail for “what API call was denied?”
- Access Analyzer (for unintended access)

---

## Summary

- Policies are the language of AWS authorization
- Deny wins; everything else must explicitly allow
- Boundaries and SCPs are guardrails (they don’t grant)

Next: logging, detection, and response.

---

## Acronyms (quick reference)

- **API** — Application Programming Interface
- **ARN** — Amazon Resource Name
- **AWS** — Amazon Web Services
- **IAM** — Identity and Access Management
- **JSON** — JavaScript Object Notation
- **MFA** — Multi-Factor Authentication
- **OU** — Organizational Unit
- **SCP** — Service Control Policy
