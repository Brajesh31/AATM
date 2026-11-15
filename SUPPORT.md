# 🧭 AATM Support Guide

Welcome to the AATM support guide. This document helps users and contributors identify the right place to ask a question, report a problem, or request an improvement.

AATM is a learning-oriented command-line simulation. It uses Inquirer to collect fictional user and transaction-style inputs. It is not connected to a bank and must not be used with real banking credentials or financial information.

Support is provided on a best-effort basis. The project does not promise a guaranteed response time or resolution time.

## 📚 Table of Contents

- [Start Here](#-start-here)
- [Choose the Right Support Channel](#-choose-the-right-support-channel)
- [Installation Help](#-installation-help)
- [Running the JavaScript Program](#-running-the-javascript-program)
- [TypeScript Validation Help](#-typescript-validation-help)
- [Interactive Terminal Problems](#-interactive-terminal-problems)
- [Prompt and Transaction Flow Questions](#-prompt-and-transaction-flow-questions)
- [JavaScript and TypeScript Differences](#-javascript-and-typescript-differences)
- [CI and Workflow Problems](#-ci-and-workflow-problems)
- [Information to Include in a Report](#-information-to-include-in-a-report)
- [Security and Privacy](#-security-and-privacy)
- [Support Expectations](#-support-expectations)
- [Maintainer Triage Checklist](#-maintainer-triage-checklist)

## 🚦 Start Here

For a general understanding, read [README.md](README.md). For a first local run, follow [docs/DEVELOPMENT.md](docs/DEVELOPMENT.md). For prompt behaviour, read [docs/TRANSACTION-FLOW.md](docs/TRANSACTION-FLOW.md). For known issues, review [docs/TROUBLESHOOTING.md](docs/TROUBLESHOOTING.md).

Before opening an issue, search existing issues and verify that you are working from the current default branch.

## 🧭 Choose the Right Support Channel

| Need | Recommended channel |
|---|---|
| Reproducible code problem | Bug report issue template |
| New learning-oriented idea | Feature request issue template |
| Unclear setup instruction | Documentation issue or focused pull request |
| General usage question | GitHub Discussions, if enabled |
| Security vulnerability | Private reporting via SECURITY.md |
| Conduct concern | Private contact with repository owner |

Do not publish credentials or personal data in any public channel.

## 📦 Installation Help

Start from a clean checkout:

```bash
git clone https://github.com/Brajesh31/AATM.git
cd AATM
npm ci
```

Check the environment:

```bash
node --version
npm --version
```

If installation fails, include the full command and the first relevant error. Confirm that the terminal is in the repository root and that the package lockfile is present. Do not delete the lockfile or change package managers as the first troubleshooting action.

## ▶️ Running the JavaScript Program

Run:

```bash
node atm.js
```

Use a real interactive terminal that supports keyboard input. Some CI panels and IDE output panes do not provide a TTY, so the prompts may not display or accept input there.

The current JavaScript implementation collects prompt answers and ends. It does not run the active balance comparison found in the TypeScript source.

## 🔷 TypeScript Validation Help

The repository includes TypeScript source and a compiler configuration, but the TypeScript compiler is not currently declared as a direct project development dependency.

Use the existing check:

```bash
npx --yes --package typescript tsc --noEmit
```

This command checks types but does not execute the interactive TypeScript program. If the compiler reports an error, include the exact output and Node.js/npm versions.

## 🖥️ Interactive Terminal Problems

Interactive prompts require terminal input support. If prompts do not appear:
- Run from a normal terminal window.
- Confirm the process is not running in a non-interactive CI step.
- Confirm dependencies installed successfully.
- Check whether a previous prompt process is still running.
- Try the command again from the repository root.

If the program exits after Ctrl+C, that is a cancellation path rather than necessarily a defect.

## 🔀 Prompt and Transaction Flow Questions

The program uses Inquirer prompt definitions. Each question's `name` property becomes an exact property name in the answer object. Spelling and whitespace matter.

The current source has a known trailing-space difference in the withdrawal amount key. If an amount appears missing, check the prompt's `name` value and the code that reads the returned answer.

Use [docs/TRANSACTION-FLOW.md](docs/TRANSACTION-FLOW.md) to understand the two conditional paths.

## 🔷 JavaScript and TypeScript Differences

The implementations are not identical:
- JavaScript collects prompts and then ends.
- TypeScript includes a demonstration random-value calculation.
- The withdrawal amount answer key has a whitespace mismatch.
- The TypeScript answer type does not fully express the conditional prompt result.

These are known limitations. Do not open duplicate reports unless you have found a distinct symptom or regression.

## ⚙️ CI and Workflow Problems

The current CI workflow checks:
- JavaScript syntax with `node --check atm.js`.
- TypeScript types with `npx --yes --package typescript tsc --noEmit`.

It does not run an interactive terminal session or a unit-test suite. The package `npm test` script is a placeholder that exits with an error.

When CI fails, identify the exact workflow job and step. Include the error output without secrets.

## 🧾 Information to Include in a Report

A useful report includes:

| Detail | Why it helps |
|---|---|
| Commit or branch | Identifies the code being tested |
| Operating system | Helps diagnose environment-specific failures |
| Node.js version | Identifies runtime differences |
| npm version | Helps diagnose install and package issues |
| Exact command | Makes the failure reproducible |
| Prompt answers | Shows which branch was selected, using fictional values |
| Expected output | Defines intended behaviour |
| Actual output | Describes the observed behaviour |
| Error message | Provides technical evidence |
| Terminal type | Identifies interactive input limitations |

Use this format:

```text
Title:
Environment:
Node.js:
npm:
Command:
Steps to reproduce:
Expected result:
Actual result:
Error output:
Additional context:
```

Do not include real IDs, PINs, banking details, credentials, or private user information.

## 🔐 Security and Privacy

AATM is not a financial product. Never enter real banking information.

Do not use public issues to report vulnerabilities or disclose secrets. Follow [SECURITY.md](SECURITY.md). Do not post private messages, real customer information, or screenshots with sensitive values.

## ⏳ Support Expectations

Support is best-effort. Reports with clear reproduction steps and relevant environment details are easier to investigate. The maintainer may ask for additional information, prioritize a different issue, or decide that a request falls outside the educational scope.

Support does not include recovering third-party credentials, accessing bank accounts, debugging unauthorized environments, or providing financial or legal advice.

## 🛠️ Maintainer Triage Checklist

- [ ] Correct issue channel selected.
- [ ] Duplicate issue checked.
- [ ] Commit and environment identified.
- [ ] Reproduction steps are clear.
- [ ] Fictional values are used.
- [ ] Logs have been checked for secrets.
- [ ] JavaScript versus TypeScript behaviour is identified.
- [ ] Known limitations have been considered.
- [ ] Next action is clear.

Thank you for providing clear, safe, and reproducible reports.
