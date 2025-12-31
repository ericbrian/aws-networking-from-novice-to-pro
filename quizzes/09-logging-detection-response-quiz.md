# Quiz 09 — Logging, Detection, and Response

## Instructions
Answer first without looking at the key. Then check the answers.

## Questions

1) What question is CloudTrail best at answering?

2) Which is a good use-case for VPC Flow Logs?
A. Proving which IAM user edited an S3 bucket policy
B. Checking whether traffic was accepted/rejected at the VPC level
C. Issuing temporary credentials
D. Creating subnets

3) True/False: GuardDuty is primarily a prevention control (it blocks traffic).

4) What does AWS Config help you answer?

5) Security Hub is best described as:
A. A DNS service
B. A log shipping agent
C. A findings aggregator and security posture view
D. A NAT gateway

6) Name two “high signal” events you might alert on.

7) List the basic incident response loop steps.

8) What is IAM Access Analyzer used for?

## Answer key

1) Who did what, when, from where (AWS API activity).

2) B

3) False. GuardDuty detects and generates findings; it does not block by itself.

4) What changed in configuration and when; compliance against rules; drift detection.

5) C

6) Examples: root user activity, IAM policy/role trust changes, CloudTrail disabled, new access keys created, security group opened to `0.0.0.0/0` on sensitive ports.

7) Detect → triage → contain → eradicate → recover → learn.

8) Finding unintended access paths and overly broad sharing for supported resource types.
