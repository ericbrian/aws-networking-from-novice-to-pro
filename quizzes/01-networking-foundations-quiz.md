# Quiz 01 — Networking Foundations

## Instructions
Answer first without looking at the key. Then check the answers.

## Questions

1) In one sentence, what four things must be true for a packet to work end-to-end?

2) What does a VPC primarily provide?
A. A single EC2 instance
B. A logically isolated network with IP space + routing control
C. A managed database
D. A load balancer

3) A subnet in AWS is:
A. Always multi-AZ
B. Always public
C. AZ-scoped and a slice of the VPC CIDR
D. An IAM policy

4) What makes a subnet “public” in the common AWS definition?

5) True/False: If a subnet is public, every instance in it is reachable from the internet by default.

6) Which AWS controls are *stateful* by default?
A. Security Groups
B. Network ACLs
C. Route tables
D. Both A and C

7) Name two common “next hops” you might see in a route table besides `local`.

8) Why is DNS often a hidden cause of timeouts?

## Answer key

1) Addressing, routing (both directions), filtering rules, and (often) name resolution/DNS must align.

2) B

3) C

4) The subnet’s associated route table has a 0.0.0.0/0 route pointing to an Internet Gateway (IGW).

5) False. Instances still need things like a public IP (or a public load balancer), correct SG/NACL rules, and routes.

6) A

7) Examples: IGW, NAT Gateway, Transit Gateway, VPC Endpoint.

8) Because an app may be connecting to a hostname; if it resolves to the wrong IP (or can’t resolve), it looks like a network issue even if routing/firewalls are fine.
