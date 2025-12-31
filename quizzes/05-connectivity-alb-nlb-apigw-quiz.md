# Quiz 05 — Connectivity Patterns (ALB, NLB, API Gateway)

## Instructions
Answer first without looking at the key. Then check the answers.

## Questions

1) Match the tool to the common use:
- ALB:
- NLB:
- API Gateway:

2) Which is best for host/path-based HTTP routing?
A. NLB
B. ALB
C. Transit Gateway
D. NAT Gateway

3) Which is best for TCP/UDP pass-through load balancing?
A. API Gateway
B. ALB
C. NLB
D. Route 53

4) Give one reason health checks can mark a target unhealthy even if “the app works for me”.

5) True/False: A good default is to expose only the load balancer/API gateway to the internet, not the instances.

6) Name two factors you consider when choosing where to terminate TLS.

7) What’s a common security-group pattern between an ALB and app instances?

## Answer key

1) ALB: HTTP/HTTPS routing features. NLB: L4 TCP/UDP load balancing and performance. API Gateway: API management (auth, throttling, transforms, integrations).

2) B

3) C

4) Examples: health check path wrong, health check port wrong, security group/NACL blocks health checks, app returns 401/302 and LB expects 200.

5) True.

6) Examples: operational simplicity/cert management, end-to-end encryption requirements, performance, where you need client certs, auditing requirements.

7) Allow app SG inbound from ALB SG (SG-to-SG reference), not from `0.0.0.0/0`.
