# Quiz 10 — Troubleshooting and Design

## Instructions

Answer first without looking at the key. Then check the answers.

## Questions

1. In troubleshooting, why is "define the symptom precisely" step #1?

2. Put these in a sensible network-debug order:

   - filtering
   - routing
   - DNS
   - app listening

3. Name two tools/log sources you'd use to debug an IAM access denied.

4. True/False: Overlapping CIDRs are usually fine and won't impact future connectivity.

5. Give one reason "one NAT Gateway for all AZs" can be problematic.

6. Why can complex NACL rule sets be risky?

7. List two practical design principles for AWS networking security.

8. What's the main benefit of multi-account setups at scale?

9. You have permission to call `sts:AssumeRole` on a role, but get "Access Denied". What's likely wrong?

10. Your SG allows inbound traffic, but connections time out. The NACL allows inbound too. What's a common cause?

11. Your Lambda can't call S3 even though the IAM policy allows `s3:GetObject`. The S3 bucket has a policy with `aws:SourceVpce` condition. What's wrong?

---

## 🎯 Tricky Questions

**⚠️ Warning: These questions are designed to trick you! Read carefully.**

12. Your instance is in a public subnet with a public IP. Security groups and NACLs both allow all traffic. You still can't reach it from the internet. What did you forget?
    A. The route table
    B. DNS configuration
    C. Internet Gateway attachment
    D. Could be A or C

13. VPC Flow Logs show your traffic as "ACCEPT". Does this mean the application received the request?

14. CloudTrail shows your API call succeeded. Does this prove the operation completed as expected?

15. You enable VPC Flow Logs but don't see the traffic you're debugging. What are two possible reasons?

## Answer key

1. Because vague symptoms lead to random changes; precise symptoms let you form testable hypotheses.

2. DNS → routing → filtering → app listening (often; you may swap routing/filtering depending on context, but DNS first is frequently high leverage).

3. CloudTrail; IAM Policy Simulator; Access Analyzer; CloudWatch Logs (for app-side errors).

4. False. Overlaps create routing ambiguity and block/complicate peering/TGW/VPN/DX designs.

5. It's AZ-scoped; using a single NAT can reduce resilience and add cross-AZ dependencies (and sometimes surprising costs).

6. They are stateless and ordered; it's easy to accidentally block return traffic or create hard-to-debug intermittent failures.

7. Examples: keep workloads private, use a controlled front door (ALB/API GW), least privilege IAM, enable audit logs.

8. Reduced blast radius and clearer guardrails/ownership boundaries (often enforced with SCPs and centralized logging).

9. The role's **trust policy** doesn't list your principal. You have permission to assume, but the role doesn't trust you. Check the role's "Trust relationships" tab—it must explicitly allow your principal (user/role/service).

10. The NACL is **stateless**—it may be blocking the return traffic on ephemeral ports. You need outbound rules allowing traffic back to the client's high ports.

11. The bucket policy requires access through a specific VPC endpoint (`aws:SourceVpce`), but the Lambda isn't using that endpoint. Either route Lambda through the VPC with the S3 endpoint, or adjust the bucket policy.

**Tricky Questions:**

12. **D. Could be A or C.** The tricks: (1) The subnet's route table might not have a `0.0.0.0/0 → IGW` route—being in a "public subnet" doesn't mean it automatically has the right route. (2) The IGW might not be attached to the VPC. Both are easy to miss.

13. **No!** The trick: "ACCEPT" means the _network layer_ (SG/NACL) allowed the packet. It says nothing about what happened after—the OS firewall could block it, the app might not be listening, or the app could reject the request. Flow Logs are network-layer only.

14. **Not always.** The trick: CloudTrail records API _calls_, not outcomes. Example: `ec2:RunInstances` might succeed as an API call, but the instance could fail to launch due to capacity issues, wrong AMI, etc. Always verify the actual result.

15. Two possibilities: (1) **Timing**—there's a delay of several minutes before logs appear. (2) **Scope**—Flow Logs might be on a different ENI/subnet than the one your traffic is using.
