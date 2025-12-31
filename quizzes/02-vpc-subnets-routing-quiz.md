# Quiz 02 — VPC, Subnets, and Routing

## Instructions
Answer first without looking at the key. Then check the answers.

## Questions

1) Why is choosing a VPC CIDR that won’t overlap with other networks important?

2) A subnet in AWS is scoped to:
A. A region
B. An Availability Zone
C. An AWS account
D. An Internet Gateway

3) What route exists in every VPC route table by default?

4) What makes a subnet “public” (common definition)?

5) Which statement is correct?
A. A public subnet means all instances are internet-reachable.
B. A public subnet typically has `0.0.0.0/0 → IGW`, but instances still need public IPs + rules.
C. Only private subnets can have route tables.
D. NAT Gateways must be placed in private subnets.

6) Private subnet instances need outbound internet access for patching. Which is the most common pattern?
A. `0.0.0.0/0 → IGW`
B. `0.0.0.0/0 → NAT Gateway` (NAT GW in a public subnet)
C. `0.0.0.0/0 → local`
D. `0.0.0.0/0 → Security Group`

7) Can a single subnet be associated with multiple route tables?

8) List two things to verify when “internet access doesn’t work” besides route tables.

## Answer key

1) Because overlap breaks routing (you can’t unambiguously decide where to send traffic) and complicates peering/TGW/VPN/DX integration.

2) B

3) The VPC CIDR route pointing to `local`.

4) Its route table has a `0.0.0.0/0` route to an Internet Gateway (IGW).

5) B

6) B

7) No. A subnet is associated with exactly one route table at a time.

8) Examples: instance has a public IP (for inbound/outbound via IGW), security group rules, NACL rules, DNS resolution, OS firewall, correct target (IGW vs NAT).
