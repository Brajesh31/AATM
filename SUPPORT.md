# 🧭 AATM Support Guide

Welcome to the AATM support guide. This document helps visitors, learners, and contributors choose the right place to ask a question, report a reproducible problem, or suggest an improvement.

AATM is a learning-oriented command-line simulation. It uses Inquirer to collect fictional user and transaction-style inputs. It is not connected to a bank and must not be used with real banking credentials or financial information.

Support is provided on a best-effort basis. The project does not promise a guaranteed response time, resolution time, or service-level agreement.

## 📚 Table of Contents

- [🚦 Start Here](#-start-here)
- [🧭 Choose the Right Support Channel](#-choose-the-right-support-channel)
- [📦 Installation Help](#-installation-help)
- [▶️ Running the JavaScript Program](#️-running-the-javascript-program)
- [🔷 TypeScript Validation Help](#-typescript-validation-help)
- [⌨️ Interactive Terminal Problems](#️-interactive-terminal-problems)
- [🔀 Prompt and Transaction Flow Questions](#-prompt-and-transaction-flow-questions)
- [⚖️ JavaScript and TypeScript Differences](#️-javascript-and-typescript-differences)
- [⚙️ CI and Workflow Problems](#️-ci-and-workflow-problems)
- [🧾 Information to Include in a Report](#-information-to-include-in-a-report)
- [✍️ Writing a Useful Support Request](#️-writing-a-useful-support-request)
- [🔐 Security and Privacy](#-security-and-privacy)
- [🚧 Support Boundaries](#-support-boundaries)
- [🛠️ Maintainer Triage Checklist](#️-maintainer-triage-checklist)

## 🚦 Start Here

If you are new to the repository, follow this order:

1. Read [README.md](README.md) for the overview and quick setup.
2. Read [docs/README.md](docs/README.md) for the technical documentation index.
3. Follow [docs/DEVELOPMENT.md](docs/DEVELOPMENT.md) to install and run the project.
4. Read [docs/TRANSACTION-FLOW.md](docs/TRANSACTION-FLOW.md) to understand the prompt paths.
5. Read [docs/TROUBLESHOOTING.md](docs/TROUBLESHOOTING.md) if a command or prompt fails.
6. Read [CONTRIBUTING.md](CONTRIBUTING.md) before proposing a code change.

Before opening an issue, search existing reports and verify that the problem can be reproduced on the current default branch.

## 🧭 Choose the Right Support Channel

| Request type | Recommended channel | Notes |
|---|---|---|
| Reproducible application defect | Bug report issue template | Include steps and environment |
| New learning-oriented idea | Feature request issue template | Explain the problem and expected result |
| Incorrect or unclear instructions | Documentation issue or focused PR | Identify the exact file and section |
| General usage question | GitHub Discussions, if enabled | Search existing discussions first |
| Vulnerability | Private reporting described in SECURITY.md | Never publish exploit details |
| Conduct concern | Private contact with repository owner | Do not expose personal details |

Do not create multiple reports for the same problem unless there is a clear reason to track separate work.

## 📦 Installation Help

Start from a clean checkout:

```bash
git clone https://github.com/Brajesh31/AATM.git
cd AATM
npm ci
```

Check the runtime versions:

```bash
node --version
npm --version
```

If installation fails, include the exact command and the first meaningful error. Confirm that the terminal is in the repository root and that the lockfile exists. Do not delete the lockfile or switch package managers as the first troubleshooting action.

## ▶️ Running the JavaScript Program

Run:

```bash
node atm.js
```

Use a real interactive terminal that supports keyboard input. Some CI panels and IDE output panes do not provide a TTY, so prompts may not display or accept input there.

The current JavaScript implementation collects the answers and ends. It does not run the active random-value comparison found in the TypeScript source.

## 🔷 TypeScript Validation Help

The repository includes TypeScript source and a compiler configuration, but the TypeScript compiler is not currently declared as a direct project development dependency.

Use the existing type-check command:

```bash
npx --yes --package typescript tsc --noEmit
```

This command validates the source but does not execute the interactive TypeScript application. Include the exact compiler output and your runtime versions when asking for help.

## ⌨️ Interactive Terminal Problems

Inquirer requires an interactive terminal. If prompts do not appear:

- Run from a normal terminal window.
- Confirm dependencies installed successfully.
- Confirm the terminal accepts keyboard input.
- Check whether the process is running in a non-interactive task runner.
- Run the command again from the repository root.

If the visitor cancels with Ctrl+C, the process may exit. That is not necessarily a prompt defect.

## 🔀 Prompt and Transaction Flow Questions

Each Inquirer prompt uses a `name` property. That exact value becomes a property key in the returned answers object. Spelling and whitespace are significant.

The current source has a known trailing-space mismatch in the withdrawal amount key. If an amount appears missing, inspect the prompt's exact `name` and the property later read by the code.

See [docs/TRANSACTION-FLOW.md](docs/TRANSACTION-FLOW.md) for the two conditional branches.

## ⚖️ JavaScript and TypeScript Differences

The current implementations are not identical:
- JavaScript collects prompt answers and then ends.
- TypeScript contains a random-value demonstration calculation.
- The withdrawal amount key contains a whitespace mismatch.
- The TypeScript answer type does not fully represent conditional results.

These are known limitations. Do not open duplicate reports unless a separate regression or distinct symptom has been found.

## ⚙️ CI and Workflow Problems

The current CI workflow checks:
- JavaScript syntax using `node --check atm.js`.
- TypeScript types using `npx --yes --package typescript tsc --noEmit`.

It does not run an interactive terminal session and does not execute a unit-test suite. The npm `test` script is currently a placeholder that exits with an error.

When CI fails, identify the exact workflow job and step. Include the relevant sanitized error output, but never include secrets.

## 🧾 Information to Include in a Report

| Detail | Why it helps |
|---|---|
| Commit or branch | Identifies the code being tested |
| Operating system | Helps diagnose environment-specific behaviour |
| Node.js version | Identifies runtime differences |
| npm version | Helps diagnose package installation |
| Exact command | Makes the failure reproducible |
| Prompt path | Shows which conditional branch was selected |
| Expected output | Defines the intended behaviour |
| Actual output | Describes the observed result |
| Error message | Provides technical evidence |
| Terminal type | Identifies interactive input limitations |

Use fictional prompt values. Redact personal information and credentials from all terminal output.

## ✍️ Writing a Useful Support Request

A helpful request can follow this structure:

```text
Title:
Repository commit:
Environment:
Operating system:
Node.js:
npm:
Terminal:
Command:
Affected file or prompt:

Steps to reproduce:
1.
2.
3.

Expected result:
Actual result:
Error output:
Does it affect JavaScript, TypeScript, or both?
Additional context:
```

For a feature proposal, explain the user problem, expected outcome, alternatives, and acceptance criteria rather than presenting only an implementation idea.

## 🔐 Security and Privacy

AATM is not a financial product. Never enter real banking information.

Do not use a public issue to report a vulnerability or disclose secrets. Follow [SECURITY.md](SECURITY.md). Do not post private messages, customer information, passwords, PINs, or screenshots containing sensitive values.

For conduct concerns, use the private reporting path described in [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).

## 🚧 Support Boundaries

Support does not include:
- Recovery of third-party account credentials.
- Access to bank accounts or financial systems.
- Debugging systems that the reporter is not authorized to access.
- Guaranteed implementation of every feature request.
- Legal or financial advice.
- A promised response or resolution time.

The project can help investigate reproducible problems in this repository. Issues with Node.js, npm, GitHub, or third-party provider infrastructure may need to be raised with the relevant provider.

## 🛠️ Maintainer Triage Checklist

- [ ] The request uses the correct channel.
- [ ] Existing issues were checked.
- [ ] The affected commit and environment are known.
- [ ] Reproduction steps are clear.
- [ ] Only fictional sample values are included.
- [ ] Logs have been checked for secrets.
- [ ] JavaScript versus TypeScript behaviour is identified.
- [ ] Known limitations have been considered.
- [ ] The severity and scope are clear.
- [ ] The next action is communicated.

Thank you for providing clear, safe, and reproducible reports.
