# Quiz 10 — Troubleshooting and Design

## Instructions
Answer first without looking at the key. Then check the answers.

## Questions

1) In troubleshooting, why is “define the symptom precisely” step #1?

2) Put these in a sensible network-debug order:
- filtering
- routing
- DNS
- app listening

3) Name two tools/log sources you’d use to debug an IAM access denied.

4) True/False: Overlapping CIDRs are usually fine and won’t impact future connectivity.

5) Give one reason “one NAT Gateway for all AZs” can be problematic.

6) Why can complex NACL rule sets be risky?

7) List two practical design principles for AWS networking security.

8) What’s the main benefit of multi-account setups at scale?

## Answer key

1) Because vague symptoms lead to random changes; precise symptoms let you form testable hypotheses.

2) DNS → routing → filtering → app listening (often; you may swap routing/filtering depending on context, but DNS first is frequently high leverage).

3) CloudTrail; IAM Policy Simulator; Access Analyzer; CloudWatch Logs (for app-side errors).

4) False. Overlaps create routing ambiguity and block/complicate peering/TGW/VPN/DX designs.

5) It’s AZ-scoped; using a single NAT can reduce resilience and add cross-AZ dependencies (and sometimes surprising costs).

6) They are stateless and ordered; it’s easy to accidentally block return traffic or create hard-to-debug intermittent failures.

7) Examples: keep workloads private, use a controlled front door (ALB/API GW), least privilege IAM, enable audit logs.

8) Reduced blast radius and clearer guardrails/ownership boundaries (often enforced with SCPs and centralized logging).
