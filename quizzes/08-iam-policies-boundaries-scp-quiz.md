# Quiz 08 — IAM Policies, Boundaries, SCPs

## Instructions
Answer first without looking at the key. Then check the answers.

## Questions

1) Name the four most common IAM statement elements.

2) True/False: If there is no explicit Allow, access is still allowed.

3) What wins in policy evaluation?
A. Allow
B. Deny
C. The most specific policy
D. The oldest policy

4) Identity-based vs resource-based policies: what’s the difference?

5) What is a permissions boundary?
A. A way to grant permissions to everyone
B. A limit that caps what an identity can be allowed to do
C. A network firewall
D. A DNS rule

6) What is an SCP?
A. A policy that grants permissions to roles
B. An org/account-level guardrail that limits maximum permissions
C. A security group rule
D. A load balancer listener

7) True/False: SCPs can prevent actions even for administrators.

8) Give one example of a condition you might use in a policy.

## Answer key

1) Effect, Action, Resource, Condition.

2) False (default deny).

3) B

4) Identity-based policies attach to users/groups/roles; resource-based attach to a resource (e.g., S3 bucket) and can control who can access it.

5) B

6) B

7) True.

8) Examples: require MFA, restrict by source IP, restrict by VPC endpoint, require tags, require TLS.
