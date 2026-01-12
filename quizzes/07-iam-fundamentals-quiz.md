# Quiz 07 — IAM Fundamentals

## Instructions

Answer first without looking at the key. Then check the answers.

## Questions

1. AuthN vs AuthZ: which one answers "who are you?" and which answers "what can you do?"

2. Which is generally preferred for workloads and automation?
   A. Long-lived IAM user access keys
   B. IAM roles with temporary credentials
   C. Root user
   D. Security Groups

3. What AWS service issues temporary credentials when you assume a role?

4. A role has a trust policy and a permissions policy. What does each control?

5. True/False: In IAM, "not explicitly allowed" means "allowed".

6. What is the most important rule of policy evaluation?
   A. Allows override denies
   B. Denies override allows
   C. The newest policy wins
   D. Groups override roles

7. Name two best practices for the root user.

8. When might you still use access keys, and what's a key risk to manage?

9. What is an instance profile and how does EC2 use it?

10. What is IAM Identity Center and when would you recommend it?

## Answer key

1. AuthN = who are you? AuthZ = what can you do?

2. B

3. STS (Security Token Service).

4. Trust policy: who can assume the role. Permissions policy: what actions/resources are allowed after assumption.

5. False. Default is deny.

6. B (Explicit deny wins).

7. Enable MFA; don't use for daily work; lock away credentials; minimize where root is used.

8. For a system that can't assume roles (rare/legacy). Risk: long-lived credentials can leak; mitigate via least privilege, rotation, monitoring, and preferring temporary creds.

9. An instance profile is how you attach a role to EC2. EC2 queries the instance metadata service and automatically receives temporary credentials—no access keys stored on the instance.

10. IAM Identity Center (formerly AWS SSO) provides centralized workforce identity management, integrates with corporate directories, and creates temporary role sessions. Recommended for organizations with multiple accounts.
