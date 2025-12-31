export const quizBank = [
  {
    id: "01",
    title: "Quiz 01 — Networking Foundations",
    questions: [
      {
        prompt: "Which set best describes what must be true for a packet to work end-to-end?",
        choices: [
          "CPU, memory, disk, time",
          "Addressing, routing (both directions), filtering rules, and (often) DNS/name resolution",
          "TLS, HTTP, JSON, IAM",
          "Region, AZ, account, VPC"
        ],
        answerIndex: 1,
        explanation: "Connectivity usually fails due to addressing, routing (return path!), filtering (SG/NACL/host firewall), or DNS/name resolution."
      },
      {
        prompt: "A VPC primarily provides:",
        choices: [
          "A managed database",
          "A logically isolated network with IP space + routing control",
          "A single EC2 instance",
          "A load balancer"
        ],
        answerIndex: 1,
        explanation: "A VPC is your isolated network boundary: CIDR, routing, and attachments (subnets, gateways, endpoints)."
      },
      {
        prompt: "A subnet in AWS is:",
        choices: [
          "Always multi-AZ",
          "AZ-scoped and a slice of a VPC CIDR",
          "An IAM policy",
          "Always public"
        ],
        answerIndex: 1,
        explanation: "Subnets live in exactly one AZ and represent an IP range within the VPC."
      },
      {
        prompt: "In the common AWS definition, a subnet is 'public' when:",
        choices: [
          "Instances have public IPs",
          "Its route table has a 0.0.0.0/0 route to an Internet Gateway",
          "It contains a NAT Gateway",
          "It has a Network ACL"
        ],
        answerIndex: 1,
        explanation: "Public/private is usually defined by the route table's default route target (IGW vs not)."
      },
      {
        prompt: "Which control is stateful by default?",
        choices: ["Network ACL", "Security Group", "Route table", "CIDR"],
        answerIndex: 1,
        explanation: "Security Groups are stateful; NACLs are stateless."
      },
      {
        prompt: "Which statement is most accurate?",
        choices: [
          "If a subnet is public, all instances are internet-reachable by default.",
          "A public subnet can still host instances that are not internet-reachable.",
          "Public subnets cannot have security groups.",
          "Private subnets must always use peering for outbound traffic."
        ],
        answerIndex: 1,
        explanation: "Instances also need public IPs (or a public LB), SG/NACL allows, and correct routing."
      }
    ]
  },
  {
    id: "02",
    title: "Quiz 02 — VPC, Subnets, and Routing",
    questions: [
      {
        prompt: "Why do teams avoid overlapping CIDRs (especially if hybrid/multi-VPC is likely)?",
        choices: [
          "Overlaps increase performance",
          "Overlaps create routing ambiguity and complicate connectivity",
          "AWS requires overlaps",
          "Overlaps reduce NAT costs"
        ],
        answerIndex: 1,
        explanation: "Overlapping IP ranges make it impossible to unambiguously route traffic across networks."
      },
      {
        prompt: "A subnet is scoped to:",
        choices: ["A region", "An Availability Zone", "An AWS Organization", "An Internet Gateway"],
        answerIndex: 1,
        explanation: "Subnets are AZ-scoped."
      },
      {
        prompt: "What route exists in every VPC route table by default?",
        choices: [
          "0.0.0.0/0 → IGW",
          "VPC CIDR → local",
          "0.0.0.0/0 → NAT",
          "10.0.0.0/8 → TGW"
        ],
        answerIndex: 1,
        explanation: "The 'local' route enables connectivity within the VPC CIDR (subject to SG/NACL)."
      },
      {
        prompt: "Which is the most common pattern for private subnets needing outbound internet access?",
        choices: [
          "0.0.0.0/0 → IGW",
          "0.0.0.0/0 → NAT Gateway (NAT in a public subnet)",
          "0.0.0.0/0 → local",
          "0.0.0.0/0 → Security Group"
        ],
        answerIndex: 1,
        explanation: "Private subnets route default traffic to a NAT Gateway to reach the internet without inbound exposure."
      },
      {
        prompt: "Can a subnet be associated with multiple route tables at once?",
        choices: ["Yes", "No"],
        answerIndex: 1,
        explanation: "A subnet is associated with exactly one route table (though many subnets can share one table)."
      },
      {
        prompt: "Which statement is correct?",
        choices: [
          "NAT Gateways must be placed in private subnets.",
          "A public subnet usually has 0.0.0.0/0 → IGW, but instances still need public IPs + rules.",
          "Route tables are a security feature that replaces SGs.",
          "Only public subnets have route tables."
        ],
        answerIndex: 1,
        explanation: "Public subnet is about routing to IGW; instance reachability depends on multiple factors."
      }
    ]
  },
  {
    id: "03",
    title: "Quiz 03 — Security Groups, NACLs, and Reachability",
    questions: [
      {
        prompt: "Security Groups are:",
        choices: [
          "Stateless and subnet-scoped",
          "Stateful and ENI-scoped",
          "Deny-only rules",
          "Evaluated by lowest rule number"
        ],
        answerIndex: 1,
        explanation: "SGs attach to ENIs and are stateful allow-only."
      },
      {
        prompt: "Network ACLs are:",
        choices: [
          "Stateful and allow-only",
          "Stateless and can allow or deny",
          "Attached to ENIs",
          "Not ordered"
        ],
        answerIndex: 1,
        explanation: "NACLs attach to subnets, are stateless, and evaluated in order."
      },
      {
        prompt: "Why do ephemeral ports matter for NACLs?",
        choices: [
          "They don’t; only destination ports matter",
          "Return traffic uses ephemeral ports, and NACLs must explicitly allow both directions",
          "They only matter for DNS",
          "They are only for UDP"
        ],
        answerIndex: 1,
        explanation: "Because NACLs are stateless, you must allow inbound and outbound flows including ephemeral port ranges."
      },
      {
        prompt: "True or False: If inbound is allowed in a Security Group, return traffic is automatically allowed.",
        choices: ["True", "False"],
        answerIndex: 0,
        explanation: "SGs are stateful: return traffic is allowed automatically."
      },
      {
        prompt: "A web request times out. Which is a good next check beyond SG rules?",
        choices: [
          "Only change SGs again",
          "Check NACL, routes, DNS/target IP, and whether the app is listening",
          "Disable IAM",
          "Recreate the VPC"
        ],
        answerIndex: 1,
        explanation: "Timeouts often come from NACL, routing, DNS, or app/OS-level issues."
      }
    ]
  },
  {
    id: "04",
    title: "Quiz 04 — Egress, NAT, VPC Endpoints, and DNS",
    questions: [
      {
        prompt: "When someone says “private subnets need internet”, the best first step is to:",
        choices: [
          "Add 0.0.0.0/0 → IGW",
          "Clarify whether they need the public internet or only AWS service APIs",
          "Disable NACLs",
          "Assign public IPs to everything"
        ],
        answerIndex: 1,
        explanation: "Many workloads only need AWS APIs (S3/STS/ECR), which can be done privately via endpoints."
      },
      {
        prompt: "A NAT Gateway primarily provides:",
        choices: [
          "Inbound internet access to private instances",
          "Outbound internet access from private subnets using source translation",
          "Cross-VPC routing",
          "DNS resolution"
        ],
        answerIndex: 1,
        explanation: "NAT is for egress; it does not accept unsolicited inbound connections."
      },
      {
        prompt: "Which endpoint type is used for S3 and DynamoDB?",
        choices: ["Interface endpoint", "Gateway endpoint", "Internet Gateway", "Transit Gateway"],
        answerIndex: 1,
        explanation: "S3 and DynamoDB use gateway endpoints (route-table based)."
      },
      {
        prompt: "Interface endpoints (PrivateLink) create what inside your subnets?",
        choices: ["Route tables", "ENIs", "NAT Gateways", "Internet Gateways"],
        answerIndex: 1,
        explanation: "Interface endpoints create ENIs in your subnets and use security groups."
      },
      {
        prompt: "With private DNS enabled on an interface endpoint, what typically changes?",
        choices: [
          "The service hostname resolves to the endpoint’s private IPs",
          "The service becomes public",
          "The VPC CIDR changes",
          "NACLs become stateful"
        ],
        answerIndex: 0,
        explanation: "Private DNS maps the standard service hostname to the endpoint, keeping traffic private."
      }
    ]
  },
  {
    id: "05",
    title: "Quiz 05 — Connectivity (ALB, NLB, API Gateway)",
    questions: [
      {
        prompt: "Which is best for host/path-based HTTP routing?",
        choices: ["NLB", "ALB", "Transit Gateway", "NAT Gateway"],
        answerIndex: 1,
        explanation: "ALB is Layer 7 and supports host/path routing."
      },
      {
        prompt: "Which is best for TCP/UDP pass-through load balancing?",
        choices: ["API Gateway", "ALB", "NLB", "Route 53"],
        answerIndex: 2,
        explanation: "NLB is Layer 4 and handles TCP/UDP pass-through."
      },
      {
        prompt: "A good default security posture is:",
        choices: [
          "Expose instances directly to the internet",
          "Expose only the front door (ALB/API GW), keep instances private",
          "Disable health checks",
          "Always terminate TLS on the instance"
        ],
        answerIndex: 1,
        explanation: "Minimize exposed surface area; keep workloads private behind controlled entry points."
      },
      {
        prompt: "A common reason targets are marked unhealthy even when the app works is:",
        choices: [
          "Health check is blocked or checks the wrong path/port",
          "Route tables don’t exist",
          "IAM is disabled",
          "CIDR is too large"
        ],
        answerIndex: 0,
        explanation: "Health checks can fail due to SG/NACL blocks, wrong path, wrong port, or unexpected status codes."
      }
    ]
  },
  {
    id: "06",
    title: "Quiz 06 — Hybrid & Multi-VPC Connectivity",
    questions: [
      {
        prompt: "True or False: VPC peering supports transitive routing (A↔B↔C).",
        choices: ["True", "False"],
        answerIndex: 1,
        explanation: "Peering is non-transitive. TGW is the common scalable hub option."
      },
      {
        prompt: "Which is generally best for connecting many VPCs with transitive routing?",
        choices: ["VPC peering", "Transit Gateway", "Internet Gateway", "Security Group"],
        answerIndex: 1,
        explanation: "TGW enables transitive routing and segmentation at scale."
      },
      {
        prompt: "Site-to-Site VPN is:",
        choices: [
          "Dedicated physical connectivity",
          "Encrypted tunnel over the public internet",
          "A DNS feature",
          "A load balancer"
        ],
        answerIndex: 1,
        explanation: "VPN is fast to set up and good for hybrid or backup paths, but rides the internet."
      },
      {
        prompt: "Direct Connect primarily offers:",
        choices: [
          "Private, more consistent connectivity to AWS",
          "Automatic IAM permissions",
          "Stateless firewalling",
          "Public IP assignment"
        ],
        answerIndex: 0,
        explanation: "DX provides private connectivity with more consistent latency/bandwidth."
      }
    ]
  },
  {
    id: "07",
    title: "Quiz 07 — IAM Fundamentals",
    questions: [
      {
        prompt: "AuthN vs AuthZ: which maps correctly?",
        choices: [
          "AuthN = what can you do; AuthZ = who are you",
          "AuthN = who are you; AuthZ = what can you do",
          "AuthN = networking; AuthZ = DNS",
          "AuthN = S3; AuthZ = EC2"
        ],
        answerIndex: 1,
        explanation: "Authentication identifies you; authorization determines allowed actions."
      },
      {
        prompt: "For workloads/automation, what is generally preferred?",
        choices: [
          "Long-lived IAM user access keys",
          "IAM roles with temporary credentials",
          "Root user",
          "Security groups"
        ],
        answerIndex: 1,
        explanation: "Roles + STS reduce risk by using short-lived credentials."
      },
      {
        prompt: "Which AWS service issues temporary credentials for assumed roles?",
        choices: ["S3", "STS", "Route 53", "CloudWatch"],
        answerIndex: 1,
        explanation: "STS issues temporary credentials (access key + secret + session token)."
      },
      {
        prompt: "A role’s trust policy controls:",
        choices: [
          "What the role can do",
          "Who can assume the role",
          "Which subnets can route to it",
          "How TLS is terminated"
        ],
        answerIndex: 1,
        explanation: "Trust policy answers: who is allowed to assume the role?"
      },
      {
        prompt: "What is the default in IAM if nothing explicitly allows an action?",
        choices: ["Allowed", "Denied"],
        answerIndex: 1,
        explanation: "IAM is default-deny; you need an explicit allow that matches."
      }
    ]
  },
  {
    id: "08",
    title: "Quiz 08 — IAM Policies, Boundaries, SCPs",
    questions: [
      {
        prompt: "Which statement about policy evaluation is true?",
        choices: [
          "Allow overrides deny",
          "Explicit deny overrides allow",
          "The newest policy wins",
          "Groups override roles"
        ],
        answerIndex: 1,
        explanation: "Explicit deny wins across IAM evaluation."
      },
      {
        prompt: "A permissions boundary is best described as:",
        choices: [
          "A policy that grants permissions",
          "A limit that caps what an identity can be allowed to do",
          "A subnet firewall",
          "A DNS rule"
        ],
        answerIndex: 1,
        explanation: "Boundaries are guardrails: identity permissions must be within the boundary."
      },
      {
        prompt: "An SCP is best described as:",
        choices: [
          "A policy that grants permissions to roles",
          "An org/account-level guardrail that limits maximum permissions",
          "A security group listener",
          "A route table"
        ],
        answerIndex: 1,
        explanation: "SCPs set the outer limit for what an account can do; they do not grant."
      },
      {
        prompt: "Conditions in policies are used to:",
        choices: [
          "Define subnets",
          "Add constraints like MFA, source IP, tags, VPCE, TLS",
          "Create NAT gateways",
          "Replace CloudTrail"
        ],
        answerIndex: 1,
        explanation: "Conditions are how you implement real guardrails beyond action/resource matching."
      }
    ]
  },
  {
    id: "09",
    title: "Quiz 09 — Logging, Detection, and Response",
    questions: [
      {
        prompt: "CloudTrail is best at answering:",
        choices: [
          "Who did what, when, from where (API activity)",
          "Which subnet is public",
          "How many packets were dropped at the instance OS",
          "How to terminate TLS"
        ],
        answerIndex: 0,
        explanation: "CloudTrail is the AWS API audit record."
      },
      {
        prompt: "VPC Flow Logs are best for:",
        choices: [
          "Issuing temporary credentials",
          "Understanding network accept/reject metadata",
          "Editing IAM policies",
          "Creating Route 53 hosted zones"
        ],
        answerIndex: 1,
        explanation: "Flow logs help answer: did traffic flow, and was it accepted/rejected?"
      },
      {
        prompt: "True or False: GuardDuty primarily blocks malicious traffic.",
        choices: ["True", "False"],
        answerIndex: 1,
        explanation: "GuardDuty detects and generates findings; it does not block by itself."
      },
      {
        prompt: "AWS Config helps you:",
        choices: [
          "Track configuration changes and compliance",
          "Create NAT gateways",
          "Make SGs stateful",
          "Replace CloudTrail"
        ],
        answerIndex: 0,
        explanation: "Config is great for drift/change timelines and compliance rules."
      }
    ]
  },
  {
    id: "10",
    title: "Quiz 10 — Troubleshooting and Design",
    questions: [
      {
        prompt: "Why is step #1 'define the symptom precisely'?",
        choices: [
          "So you can change random settings faster",
          "So you can form testable hypotheses and avoid guesswork",
          "So CloudTrail stops logging",
          "So CIDRs don’t overlap"
        ],
        answerIndex: 1,
        explanation: "Precise symptoms lead to testable hypotheses and faster, safer debugging."
      },
      {
        prompt: "Which is a sensible network-debug order in many cases?",
        choices: [
          "App listening → DNS → routing → filtering",
          "DNS → routing → filtering → app listening",
          "Filtering → CIDR → IAM → TLS",
          "NACL → SCP → AZ → DX"
        ],
        answerIndex: 1,
        explanation: "DNS mistakes are common; then verify routes and filtering before app/OS-level checks."
      },
      {
        prompt: "Overlapping CIDRs are usually fine and won’t impact future connectivity.",
        choices: ["True", "False"],
        answerIndex: 1,
        explanation: "Overlaps cause routing ambiguity and complicate peering/TGW/VPN/DX."
      },
      {
        prompt: "The biggest advantage of multi-account setups at scale is:",
        choices: [
          "More public IPs",
          "Reduced blast radius and clearer guardrails/ownership",
          "No need for IAM",
          "Automatic transitive routing"
        ],
        answerIndex: 1,
        explanation: "Multi-account is a security and operational boundary that limits blast radius and improves control."
      }
    ]
  }
];
