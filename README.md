# 🏧 AATM, Interactive ATM Flow Simulation

<p align="center">
  <strong>A command-line ATM interaction simulation built with Node.js, Inquirer, JavaScript, and TypeScript.</strong>
</p>

<p align="center">
  Learn how interactive terminal prompts, conditional questions, typed answers, and simple transaction-style calculations work together.
</p>

<p align="center">
  <a href="https://github.com/Brajesh31/AATM">Repository</a> ·
  <a href="https://github.com/Brajesh31/AATM/issues">Issues</a> ·
  <a href="docs/DEVELOPMENT.md">Development Guide</a> ·
  <a href="docs/ARCHITECTURE.md">Architecture</a>
</p>

> [!CAUTION]
> **AATM is an educational simulation, not a banking product.** It does not connect to a bank, verify customer identities, authenticate PINs, read real balances, authorize withdrawals, persist transactions, or provide financial security. Use fictional test values only. Never enter a real banking ID, PIN, password, account number, card number, or financial information.

---

## 📚 Table of Contents

1. [🌟 Project Overview](#-project-overview)
2. [🎯 Learning Objectives](#-learning-objectives)
3. [✨ Current Features](#-current-features)
4. [🧭 User Journey](#-user-journey)
5. [🧩 Transaction Paths](#-transaction-paths)
6. [⚙️ How the Simulation Works](#️-how-the-simulation-works)
7. [🧰 Technology Stack](#-technology-stack)
8. [🖥️ Requirements](#️-requirements)
9. [🚀 Installation](#-installation)
10. [▶️ Running the JavaScript Version](#️-running-the-javascript-version)
11. [🔷 Working with the TypeScript Version](#-working-with-the-typescript-version)
12. [📜 Available Commands](#-available-commands)
13. [🗂️ Repository Structure](#️-repository-structure)
14. [🏗️ Architecture](#️-architecture)
15. [🧪 Testing and Validation](#-testing-and-validation)
16. [🔐 Security and Safe Usage](#-security-and-safe-usage)
17. [⚠️ Known Limitations](#️-known-limitations)
18. [🧯 Troubleshooting](#-troubleshooting)
19. [🤝 Contributing](#-contributing)
20. [🗺️ Future Learning Opportunities](#️-future-learning-opportunities)
21. [📖 Documentation Index](#-documentation-index)
22. [📄 License](#-license)

---

## 🌟 Project Overview

**AATM** is a command-line programming exercise that models a simplified ATM interaction using interactive terminal prompts. The application asks a visitor to enter a fictional user identifier and PIN-like value, choose an account category, select a transaction path, and provide or choose an amount.

The repository contains two implementations of the prompt flow:

- **JavaScript:** `atm.js`, an ES module that collects user answers with Inquirer.
- **TypeScript:** `atm.ts`, a typed version of the prompt flow that also contains a demonstration balance calculation using a generated random number.

Both implementations are useful for understanding the structure of an interactive CLI program. They are not a production financial system, and they are not behaviorally identical. The TypeScript version includes a random-number demonstration, while the JavaScript version currently ends after collecting the prompt answers.

The focus of this repository is educational: it demonstrates prompt-driven branching and basic conditional logic in a small codebase that can be explored without setting up a database, web server, or external financial integration.

### 📌 Project at a glance

| Area | Current implementation |
|---|---|
| Application type | Interactive command-line simulation |
| Runtime | Node.js |
| Primary language | JavaScript ES modules |
| Additional implementation | TypeScript |
| Prompt library | Inquirer |
| Type checking | TypeScript compiler through the existing CI command |
| Input flow | Identifier, PIN-like number, account type, transaction type, amount |
| Transaction options | Withdrawal and fast cash |
| Persistence | None |
| Bank connectivity | None |
| Automated unit tests | Not currently implemented |
| CI validation | JavaScript syntax check and TypeScript no-emit check |

---

## 🎯 Learning Objectives

AATM is a small project, but it covers several useful programming concepts.

### 1. Interactive terminal input

Learn how a CLI application can ask questions and wait for a user's response. Inquirer provides different prompt types, including input, number, and list prompts.

### 2. Conditional program flow

Some questions depend on earlier answers. For example, the amount prompt depends on the selected transaction type. This demonstrates how user input can determine which part of a program runs next.

### 3. JavaScript ES modules

The JavaScript implementation uses `import` syntax and top-level `await`. The package declares `"type": "module"`, so modern Node.js treats `atm.js` as an ES module.

### 4. TypeScript answer shapes

The TypeScript implementation declares a type for the expected answer object. This introduces the relationship between prompt names and object properties, and shows why optional conditional answers need careful type modelling.

### 5. Numeric comparisons

The TypeScript implementation compares a requested amount with a generated number. This can help explain comparison operators and conditional output. The generated value is random demonstration data, not a financial balance.

### 6. Program boundaries and safe simulation

The project also illustrates an important design distinction: collecting an ID and PIN-like input does not authenticate anyone. A local calculation does not authorize a real withdrawal. A production banking product needs security, persistence, audit, and financial controls that are deliberately outside this exercise.

---

## ✨ Current Features

### 🧾 Interactive user prompts

The program asks for a user ID-like value and a PIN-like numeric value. These are only sample inputs for the exercise. They are not checked against a real user directory or credential store.

### 🏦 Account category selection

The prompt presents two account categories:

- Current
- Savings

The choice is used to demonstrate an account selection in the command-line flow. It does not represent a real bank account or determine access to actual funds.

### 🔀 Transaction type selection

The next prompt presents two transaction paths:

- Withdrawal
- Fast cash

Inquirer uses a conditional `when` callback to decide when a dependent prompt should appear.

### 💵 Fast-cash amount choices

The fast-cash path presents a fixed list of demonstration amounts: `1444`, `2000`, `4000000`, and `10000`.

These are hard-coded prompt choices in the current source. They are not bank-approved withdrawal denominations or recommendations.

### ✍️ Manual withdrawal amount

The withdrawal path asks the user to enter a number. The current source has a trailing-space inconsistency in the answer key for this prompt. This is documented in the transaction-flow and troubleshooting guides and has not been silently changed as part of the documentation work.

### 🔷 TypeScript demonstration calculation

The TypeScript implementation generates a random number, prints it, and compares it with the selected amount. The program then prints a remaining-value message or insufficient-value message depending on the comparison.

This is not an account balance check. The number is randomly generated in memory and has no relationship to any real financial account.

---

## 🧭 User Journey

The intended command-line experience follows a sequence similar to this:

1. Start the application from a terminal.
2. Enter a fictional user identifier.
3. Enter a fictional numeric PIN-like value.
4. Choose a current or savings account category.
5. Choose withdrawal or fast cash.
6. Select a preset amount or enter a manual amount, depending on the selected path.
7. The JavaScript implementation finishes after prompt collection.
8. The TypeScript implementation continues to a demonstration comparison when its condition is met.

The prompts are interactive. A non-interactive CI environment is not expected to answer them. Continuous integration therefore performs syntax and type validation instead of attempting to run a complete interactive session.

---

## 🧩 Transaction Paths

### 💸 Withdrawal path

The visitor selects the withdrawal option. The prompt sequence then asks for a numeric amount.

Conceptually:

```text
Select account
      |
      v
Select transaction: withdrawal
      |
      v
Enter a numeric amount
      |
      v
Prompt collection completes
      |
      v
TypeScript: demonstration comparison
JavaScript: no active calculation
```

The current implementation does not provide a complete validation layer for positive amounts, upper limits, currency formatting, or account authorization. Do not interpret a number prompt as proof that the amount is safe or valid.

### ⚡ Fast-cash path

The visitor selects fast cash. Inquirer presents a fixed list of amounts.

```text
Select account
      |
      v
Select transaction: fast cash
      |
      v
Choose one preset amount
      |
      v
Prompt collection completes
      |
      v
TypeScript: demonstration comparison
JavaScript: no active calculation
```

The exact prompt choices are defined in the source file. If these choices are changed in a future code update, the transaction-flow documentation should be updated at the same time.

### 🧠 Why the paths matter

This branching pattern is common in interactive CLI programs. It teaches how one answer can influence later prompts. In a larger application, the prompt layer should be kept separate from business logic so that the logic can be tested without simulating terminal input.

See [Transaction Flow](docs/TRANSACTION-FLOW.md) for a detailed walkthrough.

---

## ⚙️ How the Simulation Works

The implementation imports Inquirer and passes it an array of prompt definitions. Each definition describes the type of input, the answer key, the displayed message, optional choices, and in some cases a condition.

Inquirer resolves the prompt sequence and returns an answer object. The program can then read values from that object.

A simplified conceptual flow:

```text
Node.js starts the entrypoint
          |
          v
Inquirer displays the first question
          |
          v
Visitor enters a fictional value
          |
          v
Conditional questions are evaluated
          |
          v
Inquirer returns an answer object
          |
          +------------------------------+
          |                              |
          v                              v
      atm.js                         atm.ts
  prompt collection            typed answer object
  then completes               random demo value
                               numeric comparison
```

The answer object's property names are determined by the exact `name` value in each prompt definition. Spelling differences and spaces are significant. The current source contains a known mismatch around the withdrawal amount field. This is a source-code issue and is documented rather than changed here.

---

## 🧰 Technology Stack

| Technology | Role |
|---|---|
| Node.js | JavaScript runtime |
| JavaScript ES modules | Main CLI implementation syntax |
| TypeScript | Typed implementation and compiler validation |
| Inquirer | Interactive terminal prompts |
| npm | Dependency installation and script execution |
| TypeScript compiler | Static type validation |
| GitHub Actions | Automated repository validation |

### 📦 Inquirer

Inquirer provides terminal prompts. The project uses:
- Input prompts for text-like values.
- Number prompts for numeric input.
- List prompts for predefined choices.
- Conditional prompt callbacks through `when`.

The library gathers input. It does not provide bank authentication, input security, financial validation, or account management.

### 🔷 TypeScript

TypeScript adds a declared type for the expected prompt answers. The current type should be reviewed whenever prompt names or conditional questions change. Because some answer fields are only present for specific transaction paths, a production-quality type model would represent optional or discriminated prompt results more precisely.

The current CI command checks TypeScript without emitting files. It does not execute `atm.ts`.

---

## 🖥️ Requirements

- Node.js 18 or newer is the recommended local baseline.
- npm compatible with the installed Node.js release.
- A terminal that supports interactive input.
- Internet access for installing dependencies on a fresh machine.

The existing CI workflow configures Node.js 20. Keep local and CI environments aligned when investigating runtime-specific behaviour.

Check versions:

```bash
node --version
npm --version
```

---

## 🚀 Installation

### 1. Clone the repository

```bash
git clone https://github.com/Brajesh31/AATM.git
cd AATM
```

### 2. Install dependencies

```bash
npm ci
```

Use `npm ci` because the repository contains a package lockfile. It installs the dependency tree recorded in that lockfile and is suitable for repeatable local and CI installation.

Do not remove the lockfile as a first troubleshooting step. If the dependency manifest changes, update the lockfile deliberately and review the resulting diff.

### 3. Confirm the dependency is available

The application imports Inquirer. If Node.js reports that the package cannot be found, check that the installation finished successfully and that the command is run from the repository directory.

---

## ▶️ Running the JavaScript Version

Run:

```bash
node atm.js
```

The JavaScript implementation uses ES module imports and top-level `await`. This matches the `"type": "module"` setting in the current package manifest.

Follow the prompts using fictional values. The JavaScript version currently collects the answers and does not run an active transaction calculation after the prompt sequence.

---

## 🔷 Working with the TypeScript Version

The repository contains `atm.ts` and `tsconfig.json`. TypeScript is not currently listed as a direct development dependency in `package.json`. The CI workflow obtains the compiler through an `npx` command.

To run the existing no-output type check:

```bash
npx --yes --package typescript tsc --noEmit
```

This command validates the TypeScript source against the compiler configuration. It does not execute the interactive TypeScript application.

Do not assume `node atm.ts` is a supported execution command. Use a TypeScript runtime or compile the source as a separate, intentional tooling change if execution is required. That would require deciding how the project manages its TypeScript dependency and runtime.

---

## 📜 Available Commands

| Command | Purpose |
|---|---|
| `npm ci` | Reproducible dependency installation |
| `node atm.js` | Run the JavaScript prompt flow |
| `npx --yes --package typescript tsc --noEmit` | Type-check TypeScript without generating output |
| `node --check atm.js` | Check JavaScript syntax |
| `npm test` | Current placeholder that exits with an error, not a working test suite |

The `test` script is intentionally a placeholder in the current package manifest. It should not be described as an automated test suite.

---

## 🗂️ Repository Structure

```text
AATM/
├── .github/
│   ├── ISSUE_TEMPLATE/
│   │   ├── bug_report.yml
│   │   └── feature_request.yml
│   ├── PULL_REQUEST_TEMPLATE.md
│   └── workflows/
│       ├── ci.yml
│       └── update-readme.yml
├── docs/
│   ├── ARCHITECTURE.md
│   ├── DEVELOPMENT.md
│   ├── TESTING.md
│   ├── TRANSACTION-FLOW.md
│   └── TROUBLESHOOTING.md
├── atm
├── atm.js
├── atm.ts
├── package.json
├── package-lock.json
├── tsconfig.json
├── README.md
├── CONTRIBUTING.md
├── CODE_OF_CONDUCT.md
├── SECURITY.md
└── LICENSE
```

> **Repository note:** The current Git tree contains a committed `node_modules/` directory. It is intentionally not reproduced above in full because it is a dependency tree rather than application source. Committing installed dependencies is generally undesirable for an npm project, but removing it would be a repository maintenance decision and is outside this documentation-only update.

| Path | Responsibility |
|---|---|
| `atm.js` | JavaScript interactive prompt flow |
| `atm.ts` | TypeScript prompt flow and demonstration calculation |
| `atm` | Existing tracked path; its intended purpose should be confirmed before changing it |
| `package.json` | Package metadata and dependency declarations |
| `package-lock.json` | Exact npm dependency resolution |
| `tsconfig.json` | TypeScript compiler options |
| `.github/workflows/ci.yml` | Syntax and type validation |
| `.github/workflows/update-readme.yml` | Existing README timestamp automation |
| `docs/` | Technical and operational documentation |

---

## 🏗️ Architecture

AATM is a small, local, single-process command-line program. It does not run an HTTP server, connect to a database, or communicate with a bank service.

The current flow can be understood in three layers:

1. **Prompt definition:** The array of questions describes the terminal interaction.
2. **Answer collection:** Inquirer asks the questions and returns an object whose keys are defined by each prompt's `name`.
3. **Demonstration logic:** The TypeScript implementation performs a random-number comparison after collecting answers. The JavaScript implementation currently stops after collection.

This separation is conceptual. In the current source, the prompt definitions and demonstration logic are located in the entrypoint files.

Read [Architecture and Code Walkthrough](docs/ARCHITECTURE.md) for source-level detail.

---

## 🧪 Testing and Validation

Run the checks used by the current CI workflow:

```bash
node --check atm.js
npx --yes --package typescript tsc --noEmit
```

Then manually exercise both entrypoints where appropriate.

### Manual validation checklist

- [ ] JavaScript entrypoint starts in an interactive terminal.
- [ ] TypeScript no-emit check completes.
- [ ] User ID prompt accepts a fictional value.
- [ ] PIN-like prompt accepts a fictional numeric value.
- [ ] Current account selection is available.
- [ ] Savings account selection is available.
- [ ] Withdrawal prompt is shown for the withdrawal path.
- [ ] Fast-cash choices are shown for the fast-cash path.
- [ ] The amount value is collected as expected.
- [ ] Ctrl+C cancellation is handled acceptably.
- [ ] Invalid and unusual numeric values are explored.
- [ ] JavaScript and TypeScript differences are understood and documented.

A syntax check does not prove that a prompt branch is correct. A TypeScript check does not verify terminal behaviour. The project currently has no automated unit-test suite.

See [Testing Guide](docs/TESTING.md) for test scenarios and current gaps.

---

## 🔐 Security and Safe Usage

This repository intentionally simulates an ATM-like interaction. It is not a real ATM application.

**Never enter real banking credentials or personal financial information.**

The program does not:
- Authenticate a real customer.
- Verify a PIN against a secure credential store.
- Connect to a financial institution.
- Retrieve an account balance.
- Authorize or perform a withdrawal.
- Persist a transaction.
- Keep an audit record.
- Encrypt or protect account information.
- Provide fraud detection or transaction limits.

Use only fictional identifiers and values. Do not commit real credentials, card details, PINs, personal financial data, or private information in source files, issue reports, screenshots, logs, or tests.

For vulnerability reports, use the private process in [SECURITY.md](SECURITY.md).

---

## ⚠️ Known Limitations

The following are confirmed limitations in the current implementation and package metadata:

| Limitation | Why it matters |
|---|---|
| No real authentication | The ID and PIN-like values are prompt inputs only |
| No persistent account ledger | There is no authoritative balance |
| Random TypeScript balance | The generated value is demonstration data |
| JavaScript/TypeScript differences | The versions do not produce the same post-prompt behaviour |
| JavaScript has no active calculation | The JavaScript entrypoint currently ends after collecting answers |
| Inconsistent answer keys | The withdrawal amount key contains trailing whitespace |
| No robust numeric validation | Positive values, limits, and edge cases are not fully enforced |
| No automated test suite | The current npm test command is a placeholder |
| Generic package metadata | Package name, description, author, and ISC license value do not match the root project documentation and MIT license file |
| Committed dependencies | The repository currently tracks `node_modules/` |

These are documented rather than silently corrected. Fixing code, package metadata, dependency tracking, or workflows requires a separate source/repository-maintenance change.

---

## 🧯 Troubleshooting

| Symptom | What to check |
|---|---|
| Inquirer package cannot be found | Run `npm ci` from the repository root |
| Import syntax fails | Confirm the package still uses ES module mode |
| Prompts do not render | Use an interactive terminal with TTY support |
| TypeScript compiler is missing | Use the documented `npx` type-check command |
| Amount field appears missing | Check the exact prompt `name` and answer property |
| JS and TS outputs differ | This is a known current implementation difference |
| CI fails | Inspect the specific syntax or type-check step |

See [Troubleshooting](docs/TROUBLESHOOTING.md) for detailed diagnostic steps.

---

## 🤝 Contributing

Contributions should preserve the educational scope and make the project easier to understand, validate, and maintain.

Before contributing:
1. Read [CONTRIBUTING.md](CONTRIBUTING.md).
2. Review the relevant guide under `docs/`.
3. Search for an existing issue.
4. Use fictional values only.
5. Keep changes focused.
6. Run the available validation commands.
7. Explain whether the JavaScript version, TypeScript version, or both are affected.
8. Document known limitations and any behaviour that remains different.

See [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) for community expectations.

---

## 🗺️ Future Learning Opportunities

The following are ideas for future educational work, not implemented capabilities:

- Extract pure functions for amount validation and mock calculations.
- Make answer types accurately represent conditional prompt results.
- Align prompt answer names between JavaScript and TypeScript.
- Add a focused automated test suite.
- Add explicit npm scripts for syntax and type validation.
- Add controlled mock account data for exercises.
- Demonstrate transaction states without claiming real financial processing.
- Add structured error handling for cancelled prompts.
- Document how a secure server-side banking system differs from a CLI simulation.

A production financial product would require a much broader architecture, security design, audit controls, authorization, and compliance review. This repository is not a foundation for deploying real financial transactions.

---

## 📖 Documentation Index

| Document | Description |
|---|---|
| [Architecture](docs/ARCHITECTURE.md) | Program boundaries, files, prompt layer, and execution flow |
| [Development](docs/DEVELOPMENT.md) | Local setup and safe development workflow |
| [Testing](docs/TESTING.md) | Current checks, manual scenarios, and test gaps |
| [Transaction Flow](docs/TRANSACTION-FLOW.md) | Prompt sequence and branch behaviour |
| [Troubleshooting](docs/TROUBLESHOOTING.md) | Installation, runtime, prompt, and CI issues |
| [Contributing](CONTRIBUTING.md) | Contribution process |
| [Code of Conduct](CODE_OF_CONDUCT.md) | Community participation standards |
| [Security](SECURITY.md) | Private vulnerability reporting and safe use |

---

## 📄 License

This repository includes the MIT License. See [LICENSE](LICENSE) for the exact terms. The license applies subject to any third-party rights and license obligations that may apply to dependencies or other included material.

---

<p align="center">
  <strong>Built for learning, experimentation, and understanding interactive CLI flows.</strong>
</p>

Last updated: 2026-11-15 19:03 UTC
