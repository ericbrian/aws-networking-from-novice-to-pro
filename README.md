# AWS Networking (Novice → Pro) + IAM/Security (Slide Course)

This repo is a slide-show style course you can study module-by-module.
Each module has:

- a **slide deck** in `slides/`
- a **quiz** in `quizzes/` (with an answer key)

## How to view the slides

These slide decks are written in **Marp-flavored Markdown**.

### Option A (recommended): VS Code + Marp extension

1. Install the VS Code extension **“Marp for VS Code”** (`marp-team.marp-vscode`).
2. Reload VS Code (Command Palette → **Developer: Reload Window**) if prompted.
3. Open any file in `slides/`.
4. Open the Command Palette (`Cmd+Shift+P`) and run one of:
    - **Marp: Open Preview**
    - **Marp: Open Preview to the Side**

If you **don’t see any “Marp:” commands**, the extension is not installed or not activated. Confirm it’s installed/enabled, then reload the window.

### Option B: Export to HTML (guaranteed)

This repo includes exported HTML slide decks you can open directly:

- `exports/01-networking-foundations.html`
- `exports/02-vpc-subnets-routing.html`
- `exports/03-security-groups-nacls-reachability.html`
- `exports/04-egress-nat-endpoints-dns.html`
- `exports/05-connectivity-alb-nlb-apigw.html`
- `exports/06-hybrid-multivpc-transitgw.html`
- `exports/07-iam-fundamentals.html`
- `exports/08-iam-policies-boundaries-scp.html`
- `exports/09-logging-detection-response.html`
- `exports/10-troubleshooting-and-design.html`

You can also export more decks later via the Marp CLI or VS Code extension.

### Option C: Read as Markdown

You can also just read the Markdown files directly—each `---` separator is a new slide.

## Course order

1. `slides/01-networking-foundations.md`
2. `slides/02-vpc-subnets-routing.md`
3. `slides/03-security-groups-nacls-reachability.md`
4. `slides/04-egress-nat-endpoints-dns.md`
5. `slides/05-connectivity-alb-nlb-apigw.md`
6. `slides/06-hybrid-multivpc-transitgw.md`
7. `slides/07-iam-fundamentals.md`
8. `slides/08-iam-policies-boundaries-scp.md`
9. `slides/09-logging-detection-response.md`
10. `slides/10-troubleshooting-and-design.md`

## Interactive quizzes

There’s a simple interactive quiz runner that:

- shows one question at a time
- locks your answer after you click
- tells you whether you were correct
- shows your final grade

Because browsers may block module loading from `file://`, run a local server from the repo root:

- `python3 -m http.server 8000`

Then open:

- `http://localhost:8000/interactive-quiz/`

## Is this a good start from novice → pro?

Yes—**if you also practice**.

- Slides + quizzes build mental models and vocabulary.
- “Pro” comes from repetition: designing, implementing, and troubleshooting real VPC/IAM setups.

If you want, I can add a minimal set of hands-on exercises (Terraform-free or Terraform-based) that align with each module.
