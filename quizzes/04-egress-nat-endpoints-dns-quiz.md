# Quiz 04 — Egress, NAT, VPC Endpoints, and DNS

## Instructions
Answer first without looking at the key. Then check the answers.

## Questions

1) When a team says “private subnets need internet”, what two clarifying questions should you ask?

2) NAT Gateway primarily provides:
A. Inbound internet access to private instances
B. Outbound internet access from private subnets using source translation
C. DNS resolution
D. Cross-VPC routing

3) Why is “one NAT Gateway per AZ” a common best practice?

4) Which endpoint type is used for S3 and DynamoDB?
A. Interface endpoint
B. Gateway endpoint
C. Internet Gateway
D. Transit Gateway

5) Interface endpoints create what inside your subnets?

6) True/False: Using VPC endpoints always eliminates the need for IAM permissions.

7) What does “private DNS” on an interface endpoint typically change?

8) Name two AWS services where endpoint policies can be used as an additional guardrail.

## Answer key

1) Do you need the public internet or only AWS service APIs? What destinations/protocols must be reachable (and from where)?

2) B

3) Because NAT GWs are AZ-scoped; routing to a NAT in another AZ adds cross-AZ dependency and can reduce resilience during AZ failure.

4) B

5) ENIs (Elastic Network Interfaces) that you can attach security groups to.

6) False. Endpoints are networking; IAM still controls authorization. Endpoint policies can add *additional* restrictions.

7) It makes the standard public service hostname resolve to the private endpoint IPs (so traffic stays inside AWS/private routing).

8) Examples: S3 (gateway endpoint policy), many interface endpoint services (e.g., STS, ECR, CloudWatch Logs) depending on the endpoint.
