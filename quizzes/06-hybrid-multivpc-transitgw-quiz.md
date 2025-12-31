# Quiz 06 — Hybrid & Multi-VPC Connectivity

## Instructions
Answer first without looking at the key. Then check the answers.

## Questions

1) True/False: VPC peering supports transitive routing (A↔B↔C).

2) What’s the most common reason teams avoid overlapping CIDRs?

3) Which is generally the best fit for connecting many VPCs with transitive routing?
A. VPC peering
B. Transit Gateway
C. Security Group
D. Internet Gateway

4) Name two things you typically must configure for VPC peering to work.

5) Site-to-Site VPN is:
A. Dedicated physical link
B. Encrypted tunnel over the public internet
C. A DNS service
D. A load balancer

6) Direct Connect primarily offers:
A. Stateless firewalling
B. Private, more consistent connectivity to AWS
C. Automatic IAM permissions
D. Public IP assignment

7) What does “segmentation” mean in a TGW design?

8) What’s one symptom of asymmetric routing?

## Answer key

1) False. Peering is non-transitive.

2) Overlaps break routing decisions and complicate peering/TGW/VPN/DX connectivity.

3) B

4) Add routes in both VPC route tables; ensure SG/NACL allow traffic; configure DNS if needed.

5) B

6) B

7) Using separate TGW route tables (and attachment associations/propagations) to control which networks can communicate.

8) Timeouts or one-way connectivity (SYN sent but no response), especially when return traffic takes a different path and gets dropped.
