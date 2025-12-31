# Quiz 03 — Security Groups, NACLs, and Reachability

## Instructions
Answer first without looking at the key. Then check the answers.

## Questions

1) Security Groups are:
A. Stateless and subnet-scoped
B. Stateful and ENI-scoped
C. Stateful and VPC-scoped only
D. Deny-only rules

2) NACLs are:
A. Stateful and allow-only
B. Stateless and can allow or deny
C. Attached to ENIs
D. Not evaluated in order

3) Why do ephemeral ports matter for NACLs?

4) True/False: If inbound is allowed in a Security Group, return traffic is automatically allowed.

5) You allow inbound `TCP 443` to a web server. Traffic still times out. Name three non-SG causes to check.

6) Which is usually the best practice default?
A. Put detailed app rules in NACLs
B. Put detailed app rules in Security Groups
C. Avoid Security Groups
D. Use only route tables

7) What AWS feature can help you analyze whether a network path should be reachable?

8) In one line: what does “reachability is a chain” mean?

## Answer key

1) B

2) B

3) Because clients use ephemeral source ports; with stateless NACLs you must explicitly allow both the inbound destination port *and* the return traffic to/from ephemeral ports.

4) True (SGs are stateful).

5) Examples: NACL blocks return traffic, wrong route table/next hop, DNS resolves to wrong IP, instance has no public IP, app not listening, OS firewall blocks, target is wrong subnet/VPC.

6) B

7) VPC Reachability Analyzer (and also VPC Flow Logs for evidence of accepts/rejects).

8) Every hop/control (DNS, routes, NACL, SG, OS/app) must permit traffic—one block anywhere breaks it.
