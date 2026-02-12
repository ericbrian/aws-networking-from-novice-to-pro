---
marp: true
title: IAM Fundamentals — Identities, AuthN/AuthZ, Roles
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

# IAM Fundamentals

Who can do what in AWS (and why).

---

## Learning goals

- Understand IAM identities (users, roles, groups)
- Separate authentication vs authorization
- Know how “assume role” works at a conceptual level

---

## Agenda

- AuthN vs AuthZ (what IAM actually does)
- Users/groups/roles (and why roles win)
- STS + assume-role (temporary credentials)
- EC2 instance profiles
- Identity Center for humans

---

## Two key concepts

- **Authentication (AuthN)**: who are you?
- **Authorization (AuthZ)**: what are you allowed to do?

IAM policies primarily answer AuthZ.

---

## IAM identities

- **Users**: long-lived human/service identities (use sparingly)
- **Groups**: attach policies to a set of users
- **Roles**: intended for temporary credentials (preferred)

---

## Why roles are preferred

Roles support:

- temporary credentials (less risk)
- workload identity (EC2/ECS/Lambda)
- cross-account access

Avoid embedding long-lived access keys in code.

---

## Instance profiles (EC2 + roles)

An **instance profile** is how you attach a role to EC2.

- EC2 queries the instance metadata service
- Gets temporary credentials automatically
- No keys stored on the instance

This is the right way to give EC2 AWS API access.

---

## IAM Identity Center (modern SSO)

For human access, consider **IAM Identity Center** (formerly AWS SSO):

- centralized workforce identity management
- integrates with corporate directories
- creates temporary role sessions

Best practice for organizations with multiple accounts.

---

## STS and temporary credentials

When you assume a role, AWS uses **STS** to issue:

- Access Key ID
- Secret Access Key
- Session Token

These expire automatically.

---

## Trust policy vs permissions policy

A role has two policy dimensions:

1. **Trust policy**: who can assume the role?
2. **Permissions policy**: what can the role do once assumed?

Mixing these up is a very common beginner mistake.

---

## How policy evaluation feels in practice

- Explicit **Deny** beats everything
- Otherwise you need an **Allow** that matches action + resource + conditions
- “Not allowed” is the default

We’ll go deeper in the next module.

---

## Root user: treat as glass

- Root has full power
- Best practice:
  - enable MFA
  - don’t use root for daily work
  - lock away credentials

---

## MFA: why it matters

Multi-factor authentication reduces risk from:

- password reuse
- phishing
- leaked credentials

Use it for:

- console access
- sensitive actions (where possible)

---

## Access keys: when (and when not)

Avoid for humans.

If you must use access keys:

- rotate
- scope permissions tightly
- prefer short-lived credentials via role assumption

---

## Recap

- AuthN vs AuthZ (what IAM actually does)
- Users/groups/roles (and why roles win)
- STS + assume-role (temporary credentials)
- EC2 instance profiles
- Identity Center for humans

---

## Next

Policy structure, boundaries, and SCPs.

---

## Acronyms (quick reference)

- **API** — Application Programming Interface
- **ARN** — Amazon Resource Name
- **AuthN** — Authentication
- **AuthZ** — Authorization
- **EC2** — Elastic Compute Cloud
- **ECS** — Elastic Container Service
- **IAM** — Identity and Access Management
- **MFA** — Multi-Factor Authentication
- **SSO** — Single Sign-On
- **STS** — Security Token Service
