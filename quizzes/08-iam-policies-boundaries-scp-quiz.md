# Quiz 08 — IAM Policies, Boundaries, SCPs

## Instructions

Answer first without looking at the key. Then check the answers.

## Questions

1. Name the four most common IAM statement elements.

2. True/False: If there is no explicit Allow, access is still allowed.

3. What wins in policy evaluation?
   A. Allow
   B. Deny
   C. The most specific policy
   D. The oldest policy

4. Identity-based vs resource-based policies: what’s the difference?

5. What is a permissions boundary?
   A. A way to grant permissions to everyone
   B. A limit that caps what an identity can be allowed to do
   C. A network firewall
   D. A DNS rule

6. What is an SCP?
   A. A policy that grants permissions to roles
   B. An org/account-level guardrail that limits maximum permissions
   C. A security group rule
   D. A load balancer listener

7. True/False: SCPs can prevent actions even for administrators.

8. Give one example of a condition you might use in a policy.

9. What does the condition key `aws:SourceVpce` allow you to restrict?

10. True/False: IAM policy allows an action, so the action will definitely succeed.

11. Explain what it means that "IAM meets networking"—give an example.

---

## 🎯 Tricky Questions

**⚠️ Warning: These questions are designed to trick you! Read carefully.**

12. A user has AdministratorAccess policy attached. Can they do anything in AWS?

13. You're troubleshooting why a Lambda can't write to S3. The Lambda's execution role has `s3:PutObject` permission. The bucket has no bucket policy. What else could block it?
    A. Nothing—it should work
    B. VPC endpoint policy
    C. Lambda's VPC configuration
    D. B and/or C, plus potentially SCPs or permission boundaries

14. An SCP allows `s3:*` on all resources. Does this grant S3 permissions to users in that account?

15. Your IAM policy explicitly allows `ec2:TerminateInstances`, but another policy explicitly denies it. What happens when you try to terminate?

16. Why is deleting a KMS key considered a "critical risk"?
    A. You might lose the key policy
    B. It costs extra money to delete it
    C. Data encrypted by that key becomes permanently unrecoverable
    D. It breaks the VPC

17. How can you effectively prevent even the root user from deleting a specific KMS key?
    A. Remove the root user's password
    B. Apply an SCP that denies `kms:ScheduleKeyDeletion`
    C. Use a permission boundary on the root user (which is not possible)
    D. Ask them nicely

## Answer key

1. Effect, Action, Resource, Condition.

2. False (default deny).

3. B

4. Identity-based policies attach to users/groups/roles; resource-based attach to a resource (e.g., S3 bucket) and can control who can access it.

5. B

6. B

7. True.

8. Examples: require MFA, restrict by source IP, restrict by VPC endpoint, require tags, require TLS.

9. `aws:SourceVpce` restricts access to only requests that come through a specific VPC endpoint ID—useful for requiring that S3 or other services are accessed only via your private endpoint.

10. False. Other controls can still deny: VPC endpoint policies, resource policies, permission boundaries, SCPs, and network reachability itself.

11. Some AWS access requires both IAM authorization and network-level controls to agree. Example: An S3 bucket policy with `aws:SourceVpce` condition means even with IAM permission, you can only access it through the specified VPC endpoint.

**Tricky Questions:**

12. **No!** The trick: SCPs can still block actions even for administrators. If an SCP denies an action at the org/OU/account level, AdministratorAccess won't help. Also, permission boundaries (if applied) can limit what the admin can do.

13. **D.** The trick: many things can block beyond the IAM policy! If Lambda is in a VPC, it may not reach S3 (needs NAT or S3 endpoint). If using an endpoint, the endpoint policy might restrict access. SCPs or permission boundaries could also deny.

14. **No.** This is the key trick about SCPs! SCPs **set limits**—they don't _grant_ permissions. They define the maximum permissions possible. You still need an identity policy (like AdministratorAccess) to actually allow actions.

15. **Access Denied.** The golden rule: **explicit Deny always wins**. It doesn't matter how many Allow statements you have—one explicit Deny overrides them all.
16. C
17. B
