# Quiz 05 — Connectivity Patterns (ALB, NLB, API Gateway)

## Instructions

Answer first without looking at the key. Then check the answers.

## Questions

1. Match the tool to the common use:

   - ALB:
   - NLB:
   - API Gateway:

2. Which is best for host/path-based HTTP routing?
   A. NLB
   B. ALB
   C. Transit Gateway
   D. NAT Gateway

3. Which is best for TCP/UDP pass-through load balancing?
   A. API Gateway
   B. ALB
   C. NLB
   D. Route 53

4. Give one reason health checks can mark a target unhealthy even if "the app works for me".

5. True/False: A good default is to expose only the load balancer/API gateway to the internet, not the instances.

6. Name two factors you consider when choosing where to terminate TLS.

7. What's a common security-group pattern between an ALB and app instances?

8. Name three security features available on an ALB.

9. What is AWS WAF and when would you use it with an ALB?

10. Which AWS managed rule groups would you enable first for common web application protection?

---

## 🎯 Tricky Questions

**⚠️ Warning: These questions are designed to trick you! Read carefully.**

11. Your ALB is in a public subnet. Does this mean your backend EC2 instances are publicly accessible?

12. You configure an NLB with TCP listeners. Do you need to allow return traffic in the target's security group?

13. Your ALB health checks pass, but users report 502 errors. Is the app definitely healthy?

14. You have a private API Gateway endpoint. Can anyone on the internet call it if they know the URL?

## Answer key

1. ALB: HTTP/HTTPS routing features. NLB: L4 TCP/UDP load balancing and performance. API Gateway: API management (auth, throttling, transforms, integrations).

2. B

3. C

4. Examples: health check path wrong, health check port wrong, security group/NACL blocks health checks, app returns 401/302 and LB expects 200.

5. True.

6. Examples: operational simplicity/cert management, end-to-end encryption requirements, performance, where you need client certs, auditing requirements.

7. Allow app SG inbound from ALB SG (SG-to-SG reference), not from `0.0.0.0/0`.

8. Security groups on the ALB itself, WAF integration, built-in OIDC/Cognito authentication, access logs (to S3), TLS policy selection (cipher suites).

9. WAF is a Web Application Firewall that sits in front of ALB to rate-limit requests, block known-bad IPs/patterns (SQLi, XSS), and filter by headers/body/geo.

10. `AWSManagedRulesCommonRuleSet`, `AWSManagedRulesSQLiRuleSet`, `AWSManagedRulesKnownBadInputsRuleSet`.

**Tricky Questions:**

11. **No.** The trick: backends can be in _private subnets_ with no public IP, only reachable via the ALB. The ALB location doesn't dictate backend accessibility—that's determined by target subnet type and SG rules.

12. **No (usually).** The trick: for NLB, when client IP preservation is enabled, traffic appears to come directly from the client. But NLBs don't have security groups themselves—you configure SGs on the targets. The target SG needs to allow inbound from _client IPs_ (or use a wide range), and SGs are stateful so return traffic is automatic.

13. **No!** The trick: health checks only verify the _health check endpoint_ (often `/health`). The actual app endpoints (`/api/*`) could be failing while the health check passes. 502 often means the target closed the connection unexpectedly.

14. **No.** Private API Gateway endpoints can only be accessed from within VPCs that have a VPC endpoint for API Gateway—internet traffic cannot reach them, even with the URL.
