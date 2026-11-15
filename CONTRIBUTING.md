# 🤝 Contributing to AATM

Thank you for your interest in contributing to AATM. This project is an educational command-line simulation that demonstrates interactive prompts and basic transaction-style branching using Inquirer, JavaScript, and TypeScript.

This guide explains how to propose a change, prepare a local environment, understand the existing program, validate a modification, and submit a clear contribution.

> [!CAUTION]
> AATM is not a banking application. Use fictional IDs, PIN-like values, and amounts only. Do not add real financial credentials, connect to real accounts, or describe the simulation as capable of performing real transactions.

## 📚 Table of Contents

- [🎯 Contribution Principles](#-contribution-principles)
- [🧭 Ways to Contribute](#-ways-to-contribute)
- [🔎 Before You Start](#-before-you-start)
- [🖥️ Development Environment](#️-development-environment)
- [🗂️ Understanding the Repository](#️-understanding-the-repository)
- [🧩 Working with Inquirer Prompts](#-working-with-inquirer-prompts)
- [🔷 JavaScript and TypeScript Consistency](#-javascript-and-typescript-consistency)
- [🧪 Validation Expectations](#-validation-expectations)
- [🔐 Security and Data Safety](#-security-and-data-safety)
- [🌿 Branch and Commit Practices](#-branch-and-commit-practices)
- [📦 Pull Request Guidelines](#-pull-request-guidelines)
- [✅ Contributor Checklist](#-contributor-checklist)
- [🚫 What Not to Submit](#-what-not-to-submit)
- [❓ Getting Help](#-getting-help)

## 🎯 Contribution Principles

A good contribution should make the project more correct, understandable, testable, or useful as a programming exercise.

The project values:

1. **Clarity:** A new contributor should be able to follow the prompt sequence and understand the output.
2. **Correctness:** Conditional prompts and answer keys should behave as documented.
3. **Consistency:** JavaScript and TypeScript should remain aligned where they are intended to represent the same flow.
4. **Honesty:** Documentation must distinguish simulation from real financial functionality.
5. **Safety:** No real credentials or personal financial data should be used.
6. **Reproducibility:** Validation steps should be clear and repeatable.
7. **Scope control:** Keep changes focused rather than rewriting the entire project for a small improvement.

## 🧭 Ways to Contribute

| Area | Example contribution | Useful evidence |
|---|---|---|
| 🐛 Bug fixes | Correct a prompt condition or answer-key mismatch | Reproduction steps and output |
| ✨ Improvements | Clarify prompt flow or improve cancellation handling | Expected vs. observed behaviour |
| 🔷 TypeScript | Improve answer modelling for conditional fields | Type-check results |
| 📚 Documentation | Explain setup or a prompt branch | Verified commands and code references |
| 🧪 Testing | Add isolated tests for pure calculations | Test command and results |
| 🛠️ Maintenance | Improve CI or dependency reproducibility | Workflow results |
| ♿ Accessibility | Improve terminal instructions and non-visual clarity | Clearer output and documentation |

Contributors do not need to add features. A precise issue report or a correction to misleading documentation can be valuable.

## 🔎 Before You Start

Before making changes:

1. Read the root README.
2. Read the relevant guide in `docs/`.
3. Search existing issues and discussions.
4. Inspect the affected implementation in `atm.js` or `atm.ts`.
5. Confirm whether the problem is in prompt collection, answer naming, type modelling, or calculation logic.
6. Decide whether both implementations are affected.
7. Discuss broad changes before investing in a large refactor.

Do not assume that the JavaScript and TypeScript files are exact translations. The current implementations differ after prompt collection.

## 🖥️ Development Environment

### Requirements

- Node.js 18 or newer is recommended.
- npm.
- Git.
- An interactive terminal with TTY input support.

The CI workflow currently uses Node.js 20.

Check versions:

```bash
node --version
npm --version
git --version
```

### Clone and install

```bash
git clone https://github.com/Brajesh31/AATM.git
cd AATM
npm ci
```

Use `npm ci` to install from the committed lockfile. Avoid removing or regenerating the lockfile without a reason and an accompanying review of the dependency changes.

### Run JavaScript

```bash
node atm.js
```

The package uses ES module mode and the JavaScript file uses top-level `await`.

### Type-check TypeScript

```bash
npx --yes --package typescript tsc --noEmit
```

This checks TypeScript without emitting JavaScript. The current project does not declare TypeScript as a direct development dependency.

## 🗂️ Understanding the Repository

| Path | Purpose |
|---|---|
| `atm.js` | JavaScript prompt sequence |
| `atm.ts` | TypeScript prompt sequence and random-value demonstration |
| `package.json` | Project metadata and dependencies |
| `package-lock.json` | Locked npm dependency tree |
| `tsconfig.json` | TypeScript compiler settings |
| `.github/workflows/ci.yml` | JavaScript syntax and TypeScript validation |
| `docs/ARCHITECTURE.md` | Code organization and runtime flow |
| `docs/TRANSACTION-FLOW.md` | Conditional prompt paths |
| `docs/DEVELOPMENT.md` | Local development |
| `docs/TESTING.md` | Current validation strategy |
| `docs/TROUBLESHOOTING.md` | Common problems |

The repository currently tracks a `node_modules/` directory. Do not add, edit, or reformat dependency files as part of an ordinary feature contribution. Any cleanup of tracked dependencies should be discussed as a separate repository-maintenance change.

## 🧩 Working with Inquirer Prompts

Each Inquirer prompt has a `name` property. This becomes the property name in the returned answer object.

When adding or modifying a prompt:

- Use stable, consistent answer keys.
- Avoid leading or trailing whitespace in key names.
- Use consistent spelling across prompt definitions, code, and TypeScript types.
- Make conditional behaviour explicit.
- Ensure a `when` callback refers to an answer that already exists.
- Keep prompt messages clear and understandable.
- Define choices when only a fixed set of answers is appropriate.
- Consider what happens when the user cancels the prompt.
- Do not assume a number prompt enforces the business rules of a transaction.

The current implementation contains a trailing-space mismatch in the withdrawal amount answer key. This is a known source-code issue. Do not hide it by documenting an incorrect key; resolve it in a separately reviewed source change if the implementation is being modified.

## 🔷 JavaScript and TypeScript Consistency

The repository contains two implementations, but they currently differ.

- `atm.js` collects prompt answers and then ends.
- `atm.ts` declares an answer type and contains a random-value comparison.
- Prompt answer keys contain a known whitespace inconsistency.
- The TypeScript type currently models fields more simply than the conditional prompts require.

When a change is intended for both files:
1. Update the prompt sequence in both implementations.
2. Keep question labels and choices aligned.
3. Keep answer keys identical.
4. Represent conditional values accurately in the TypeScript type.
5. Test each branch in both versions where execution is supported.
6. Explain any intentional difference in the documentation.

Do not assume TypeScript compiles or executes the JavaScript file automatically. They are separate source entrypoints in the current repository.

## 🧪 Validation Expectations

The available CI checks are:

```bash
node --check atm.js
npx --yes --package typescript tsc --noEmit
```

Run them after relevant modifications.

Also perform manual validation in an interactive terminal:
- Enter fictional IDs and PIN-like values.
- Select current and savings accounts.
- Select withdrawal.
- Select fast cash.
- Verify the expected amount prompt appears.
- Try unusual numeric inputs.
- Cancel with Ctrl+C.
- Confirm output matches the implementation being tested.

The current npm `test` script is a placeholder that intentionally exits with an error. Do not claim that it is a working test suite.

## 🔐 Security and Data Safety

Never commit:
- Real banking IDs or PINs.
- Account numbers or card details.
- Real customer or transaction data.
- Passwords, API keys, or access tokens.
- Private information in terminal recordings or screenshots.
- Credentials in test fixtures or sample output.

Use synthetic data such as clearly fictional IDs and non-sensitive numeric examples.

If a real secret is accidentally committed, revoke or rotate it immediately. Removing it in a later commit does not make the exposed value safe.

Report vulnerabilities privately through [SECURITY.md](SECURITY.md). Do not publish exploit details in a public issue.

## 🌿 Branch and Commit Practices

Use a focused branch:

```bash
git checkout main
git pull origin main
git checkout -b fix/prompt-answer-key
```

Suggested prefixes:

| Prefix | Purpose |
|---|---|
| `fix/` | Defect correction |
| `feat/` | New learning-oriented capability |
| `docs/` | Documentation |
| `test/` | Test additions |
| `chore/` | Maintenance |

Use descriptive commit messages:

```text
docs: clarify transaction flow
fix: align withdrawal answer key
test: cover amount validation
feat: add mock transaction summary
```

Do not claim that a defect is fixed unless it has been reproduced and validated.

## 📦 Pull Request Guidelines

A useful pull request should explain:

- The problem being addressed.
- The file or implementation affected.
- Whether JavaScript, TypeScript, or both were changed.
- The expected behaviour after the change.
- Commands and manual checks performed.
- Known limitations.
- Any changes to prompt choices, answer keys, or output.
- Why the change remains within the educational scope.

Keep pull requests focused. Avoid mixing unrelated dependency upgrades, documentation changes, and application refactors unless the work is clearly connected.

## ✅ Contributor Checklist

- [ ] I read the README and relevant technical guides.
- [ ] I checked for existing issues.
- [ ] I understand the existing prompt sequence.
- [ ] I kept the change focused.
- [ ] I checked answer key spelling and whitespace.
- [ ] I considered conditional TypeScript fields.
- [ ] I ran the JavaScript syntax check where applicable.
- [ ] I ran the TypeScript no-emit check where applicable.
- [ ] I tested the affected prompt path manually.
- [ ] I used fictional values only.
- [ ] I did not include credentials or financial data.
- [ ] I updated relevant documentation.
- [ ] I accurately reported what was and was not tested.

## 🚫 What Not to Submit

Do not submit:
- Real banking credentials or financial information.
- Changes that claim to provide real bank authentication when they do not.
- Unrelated changes to the tracked `node_modules/` tree.
- Generated files without a documented reason.
- A new dependency for a trivial task without justification.
- Unverified claims about test coverage or production readiness.
- Broad rewrites without a clear problem statement.
- Documentation that hides the limitations of the simulation.

## ❓ Getting Help

For general development questions, read [SUPPORT.md](SUPPORT.md). For technical setup issues, see [docs/DEVELOPMENT.md](docs/DEVELOPMENT.md) and [docs/TROUBLESHOOTING.md](docs/TROUBLESHOOTING.md). For conduct concerns, read [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md). For security issues, use the private process in [SECURITY.md](SECURITY.md).

Thank you for contributing to a clear, safe, and useful programming exercise.
