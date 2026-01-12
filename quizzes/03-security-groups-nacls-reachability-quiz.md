# Quiz 03 — Security Groups, NACLs, and Reachability

## Instructions

Answer first without looking at the key. Then check the answers.

## Questions

1. Security Groups are:
   A. Stateless and subnet-scoped
   B. Stateful and ENI-scoped
   C. Stateful and VPC-scoped only
   D. Deny-only rules

2. NACLs are:
   A. Stateful and allow-only
   B. Stateless and can allow or deny
   C. Attached to ENIs
   D. Not evaluated in order

3. Why do ephemeral ports matter for NACLs?

4. True/False: If inbound is allowed in a Security Group, return traffic is automatically allowed.

5. You allow inbound `TCP 443` to a web server. Traffic still times out. Name three non-SG causes to check.

6. Which is usually the best practice default?
   A. Put detailed app rules in NACLs
   B. Put detailed app rules in Security Groups
   C. Avoid Security Groups
   D. Use only route tables

7. What AWS feature can help you analyze whether a network path should be reachable?

8. In one line: what does "reachability is a chain" mean?

9. What is the maximum combined number of SG rules per ENI, and can this limit be increased?

10. The default security group in a VPC allows:
    A. All inbound and all outbound
    B. No inbound and no outbound
    C. Inbound only from itself, all outbound
    D. All inbound, no outbound

11. You have 10 security groups attached to an ENI, each with 120 rules. Will this work? Explain.

12. Name the security layers a request passes through from the internet to an application (in order).

---

## 🎯 Tricky Questions

**⚠️ Warning: These questions are designed to trick you! Read carefully.**

13. You add an inbound rule allowing TCP 443. What outbound rule must you add for return traffic to work?
    A. Outbound TCP 443 to 0.0.0.0/0
    B. Outbound TCP 1024-65535 to the client IP range
    C. Outbound all traffic to 0.0.0.0/0
    D. None

14. True/False: A Security Group can have both Allow and Deny rules.

15. Your EC2 instance is in a private subnet. You add it to a Security Group that allows inbound SSH from 0.0.0.0/0. Can the internet SSH to it now?

16. Two instances are in the same VPC but different subnets. Their Security Groups allow all outbound. Can they communicate?

## Answer key

1. B

2. B

3. Because clients use ephemeral source ports; with stateless NACLs you must explicitly allow both the inbound destination port _and_ the return traffic to/from ephemeral ports.

4. True (SGs are stateful).

5. Examples: NACL blocks return traffic, wrong route table/next hop, DNS resolves to wrong IP, instance has no public IP, app not listening, OS firewall blocks, target is wrong subnet/VPC.

6. B

7. VPC Reachability Analyzer (and also VPC Flow Logs for evidence of accepts/rejects).

8. Every hop/control (DNS, routes, NACL, SG, OS/app) must permit traffic—one block anywhere breaks it.

9. 1000 combined rules (inbound + outbound across all attached SGs). This is a hard architectural limit that **cannot** be increased.

10. C

11. No. 10 × 120 = 1200 rules, which exceeds the 1000-rule hard limit per ENI. You'd get an error.

12. WAF → ALB Security Group → NACL → App Security Group → App (OS/process).

**Tricky Questions:**

13. **D. None.** This is the trick! Security Groups are **stateful**—return traffic is automatically allowed. You only need outbound rules for _initiated_ connections, not responses.

14. **False.** Security Groups are **allow-only**. There is no Deny option. If you need explicit denies, use NACLs.

15. **No.** The trick: being in a _private subnet_ means there's no route to an Internet Gateway. The SG rule is irrelevant—the routing makes it unreachable from the internet regardless.

16. **Not necessarily.** The trick: outbound rules don't guarantee the _destination_ will accept. The receiving instance's SG must have an _inbound_ rule allowing the traffic. Both directions of rules matter.
