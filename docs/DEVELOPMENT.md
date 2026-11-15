# 🧑‍💻 AATM Development Guide

This guide explains how to prepare a local environment, install the project dependencies, run the JavaScript CLI, check the TypeScript source, and make a focused contribution.

AATM is a small interactive terminal exercise. The guide intentionally describes the commands and tooling that exist in the repository rather than inventing additional scripts or runtime behaviour.

## 📚 Table of Contents

- [Development Overview](#-development-overview)
- [Requirements](#-requirements)
- [Verify Your Environment](#-verify-your-environment)
- [Clone the Repository](#-clone-the-repository)
- [Install Dependencies](#-install-dependencies)
- [Run the JavaScript Implementation](#-run-the-javascript-implementation)
- [Check the TypeScript Implementation](#-check-the-typescript-implementation)
- [Understand the Prompt Definitions](#-understand-the-prompt-definitions)
- [Modify a Prompt Safely](#-modify-a-prompt-safely)
- [JavaScript and TypeScript Consistency](#-javascript-and-typescript-consistency)
- [Working with the Lockfile](#-working-with-the-lockfile)
- [Current npm Scripts](#-current-npm-scripts)
- [Continuous Integration](#-continuous-integration)
- [Recommended Local Workflow](#-recommended-local-workflow)
- [Before Committing](#-before-committing)
- [Future Developer Experience Improvements](#-future-developer-experience-improvements)

## 🎯 Development Overview

AATM uses Inquirer to collect terminal answers. The repository contains two entrypoints:
- `atm.js`, the JavaScript prompt flow.
- `atm.ts`, the TypeScript prompt flow with a random-value demonstration.

The two entrypoints currently differ after prompt collection. Read [ARCHITECTURE.md](ARCHITECTURE.md) and [TRANSACTION-FLOW.md](TRANSACTION-FLOW.md) before changing behaviour.

## 🧰 Requirements

| Tool | Recommended baseline | Reason |
|---|---|---|
| Node.js | 18 or newer | Runs the ES module application |
| npm | Version compatible with Node.js | Installs project dependencies |
| Git | Recent version | Source control |
| Terminal | Interactive TTY | Supports Inquirer prompts |

The CI workflow currently configures Node.js 20. When investigating CI-specific failures, use the workflow's runtime as a reference.

## 🔍 Verify Your Environment

Run:

```bash
node --version
npm --version
git --version
```

Confirm that the version output is plausible for the toolchain before installing dependencies.

## 📥 Clone the Repository

```bash
git clone https://github.com/Brajesh31/AATM.git
cd AATM
```

Run project commands from the repository root. Node.js resolves the installed dependencies relative to the project.

## 📦 Install Dependencies

```bash
npm ci
```

The repository includes `package-lock.json`. `npm ci` installs the dependency tree represented by the lockfile and is the preferred clean installation for repeatability.

If it fails:
1. Confirm the terminal is in the repository root.
2. Check Node.js and npm versions.
3. Confirm package registry connectivity.
4. Inspect the first relevant error.
5. Compare `package.json` and `package-lock.json` if dependency metadata may be inconsistent.

Do not delete the lockfile as a first troubleshooting step. Regenerating it changes dependency resolution and should be reviewed deliberately.

## ▶️ Run the JavaScript Implementation

```bash
node atm.js
```

The JavaScript implementation uses ES module import syntax and top-level `await`. The project manifest declares `"type": "module"`, so modern Node.js interprets the entrypoint as an ES module.

Use fictional values only. The JavaScript version currently collects the answers and ends. It does not execute the active random-balance demonstration found in the TypeScript source.

## 🔷 Check the TypeScript Implementation

The repository includes `atm.ts` and `tsconfig.json`, but the project does not declare TypeScript as a direct development dependency.

The existing CI command obtains TypeScript through `npx`:

```bash
npx --yes --package typescript tsc --noEmit
```

The `--noEmit` option checks the source without producing JavaScript output. This is a type-validation command, not an execution command.

Do not assume that `node atm.ts` is a supported command. Running TypeScript requires an appropriate runtime or a compile step, neither of which is currently defined as a dedicated project script.

## 🧩 Understand the Prompt Definitions

Inquirer receives an array of prompt objects. The prompt properties used in this repository include:
- `type` to select the prompt style.
- `name` to define the key in the answer object.
- `message` to display instructions.
- `choices` to provide fixed list options.
- `when` to conditionally show a question.

The `name` property must be treated as an exact identifier. Spaces and spelling matter. The current source has a trailing-space mismatch between the withdrawal amount prompt key and the expected TypeScript property.

## ✏️ Modify a Prompt Safely

When adding or editing a prompt:

1. Decide what information the prompt collects.
2. Choose a clear and consistent answer key.
3. Avoid leading/trailing spaces.
4. Use the correct prompt type.
5. Add finite choices when only predefined options are allowed.
6. If conditional, ensure the `when` callback reads an earlier answer.
7. Consider what happens when the user cancels.
8. Validate values beyond their prompt type where appropriate.
9. Update the TypeScript answer representation.
10. Update transaction-flow documentation.
11. Test each branch manually.

Do not use real banking credentials or account information in local testing.

## 🔷 JavaScript and TypeScript Consistency

The implementations currently have known differences:
- JavaScript ends after prompt collection.
- TypeScript performs a random-number comparison.
- The manual withdrawal amount key has trailing whitespace.
- The TypeScript answer type does not precisely represent the conditional amount field.

When implementing a change intended for both versions, keep the prompts, choices, messages, and answer keys aligned. If the implementations intentionally differ, explain why in the README and transaction-flow guide.

## 📦 Working with the Lockfile

If a dependency change is necessary:
1. Explain why the dependency is needed.
2. Check whether an existing package already provides the capability.
3. Update the package manifest with npm.
4. Regenerate the lockfile using npm.
5. Review the lockfile diff.
6. Run the CI checks.
7. Manually exercise the prompt flow.

Do not commit a large dependency tree change without understanding the impact.

## 📜 Current npm Scripts

The package currently contains a `test` placeholder that exits with an error. It is not a working unit-test suite.

The relevant checks are direct commands:

```bash
node --check atm.js
npx --yes --package typescript tsc --noEmit
```

Do not claim that `npm test` passed or that test coverage exists until the script is replaced by a real test framework and tests are implemented.

## ⚙️ Continuous Integration

The current CI workflow:
1. Checks out the repository.
2. Sets up Node.js 20.
3. Installs dependencies with `npm ci`.
4. Checks JavaScript syntax with `node --check atm.js`.
5. Checks TypeScript using `npx --yes --package typescript tsc --noEmit`.

It does not run an interactive Inquirer session. CI generally lacks a human terminal input session, so interactive behaviour should be validated locally or by a purpose-built test harness.

## 🔄 Recommended Local Workflow

A focused development loop:

```bash
git pull origin main
npm ci
node --check atm.js
npx --yes --package typescript tsc --noEmit
node atm.js
```

Then:
- Exercise the branch affected by the change.
- Check the answer object keys.
- Review the terminal output.
- Inspect the complete Git diff.
- Update the relevant documentation.
- Confirm no sensitive data is included.

## ✅ Before Committing

- [ ] The change has a clear purpose.
- [ ] The relevant implementation was inspected.
- [ ] Prompt keys are consistent and have no accidental whitespace.
- [ ] Conditional branches were checked.
- [ ] JavaScript and TypeScript impact is understood.
- [ ] Available syntax and type checks were run.
- [ ] Manual prompt behaviour was tested where relevant.
- [ ] Only fictional example values are used.
- [ ] No secrets or real financial data are included.
- [ ] Documentation describes the actual behaviour.
- [ ] No unrelated dependency tree files were changed.

## 🧭 Future Developer Experience Improvements

Potential future maintenance work includes:
- Declaring TypeScript as a project development dependency.
- Adding explicit `typecheck` and `check` npm scripts.
- Replacing the placeholder test script with an actual test suite.
- Extracting pure calculation functions that can be tested without Inquirer.
- Representing conditional prompt answers more precisely.
- Aligning JavaScript and TypeScript behaviour.
- Reviewing whether the committed `node_modules/` tree should remain tracked.

These are suggestions. They are not part of the current documented implementation and require separate project changes.
