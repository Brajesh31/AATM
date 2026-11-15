# 🧑‍💻 AATM Development Guide

This guide explains how to prepare a local environment, install project dependencies, run the JavaScript CLI, validate TypeScript, and contribute safely.

AATM is a small interactive terminal exercise. This guide describes the commands and tools that exist in the repository. It does not assume scripts or runtime functionality that have not been implemented.

## 📚 Table of Contents

- [🎯 Development Overview](#-development-overview)
- [🧰 Requirements](#-requirements)
- [🔍 Verify Your Environment](#-verify-your-environment)
- [📥 Clone the Repository](#-clone-the-repository)
- [📦 Install Dependencies](#-install-dependencies)
- [▶️ Run JavaScript](#️-run-javascript)
- [🔷 Validate TypeScript](#-validate-typescript)
- [🧩 Understand Prompt Definitions](#-understand-prompt-definitions)
- [✏️ Modify a Prompt Safely](#️-modify-a-prompt-safely)
- [🔀 Keep Implementations Consistent](#-keep-implementations-consistent)
- [📦 Work with the Lockfile](#-work-with-the-lockfile)
- [📜 Current npm Scripts](#-current-npm-scripts)
- [⚙️ Continuous Integration](#️-continuous-integration)
- [🔄 Recommended Development Loop](#-recommended-development-loop)
- [✅ Before Committing](#-before-committing)
- [🧭 Future Developer Experience Improvements](#-future-developer-experience-improvements)

## 🎯 Development Overview

AATM uses Inquirer to collect terminal answers. It contains two entrypoints:
- `atm.js`, the JavaScript prompt flow.
- `atm.ts`, the TypeScript prompt flow with a random-value demonstration.

The implementations are not identical after prompt collection. Read [ARCHITECTURE.md](ARCHITECTURE.md) and [TRANSACTION-FLOW.md](TRANSACTION-FLOW.md) before changing the prompt sequence or expected output.

## 🧰 Requirements

| Tool | Recommended baseline | Reason |
|---|---|---|
| Node.js | 18 or newer | Runs the ES module application |
| npm | Compatible with Node.js | Installs dependencies |
| Git | Recent stable version | Source control |
| Terminal | Interactive TTY | Supports Inquirer prompts |

The current CI workflow uses Node.js 20. Align local and CI environments where practical.

## 🔍 Verify Your Environment

```bash
node --version
npm --version
git --version
```

Confirm that commands resolve to the expected installations before installing dependencies.

## 📥 Clone the Repository

```bash
git clone https://github.com/Brajesh31/AATM.git
cd AATM
```

Run application and npm commands from the repository root so Node.js can resolve local dependencies.

## 📦 Install Dependencies

```bash
npm ci
```

The project has a committed `package-lock.json`. The `npm ci` command installs the dependency tree represented by that lockfile and is the preferred clean installation for repeatability.

If it fails:
1. Confirm the current directory.
2. Check Node.js and npm versions.
3. Confirm registry connectivity.
4. Inspect the first relevant error.
5. Compare the package manifest and lockfile if they were changed separately.

Do not delete the lockfile as a first response.

## ▶️ Run JavaScript

```bash
node atm.js
```

The package declares ES module mode and the JavaScript file uses import syntax and top-level `await`.

Use fictional values only. The current JavaScript entrypoint collects answers and then ends. It does not execute the random-number calculation present in TypeScript.

## 🔷 Validate TypeScript

```bash
npx --yes --package typescript tsc --noEmit
```

The repository contains `atm.ts` and `tsconfig.json`, but does not declare TypeScript as a direct development dependency. The current CI workflow obtains the compiler through npx.

The `--noEmit` flag performs a type check without generating JavaScript output. It does not execute the interactive application.

Do not assume `node atm.ts` is a supported command. A TypeScript runtime or compilation step would need to be selected and documented separately.

## 🧩 Understand Prompt Definitions

Each Inquirer prompt object can include:
- `type` for prompt style.
- `name` for the answer object key.
- `message` for displayed instructions.
- `choices` for list options.
- `when` for conditional display.

The exact `name` becomes the property name in the returned answer object. Spelling and whitespace matter. The current source has a known trailing-space mismatch in the withdrawal amount key.

## ✏️ Modify a Prompt Safely

When changing a question:
1. Decide what input the question should collect.
2. Choose a clear, stable answer key.
3. Avoid leading or trailing whitespace.
4. Use a suitable prompt type.
5. Add choices when only predefined options should be accepted.
6. Ensure conditional callbacks refer to previous, valid answer keys.
7. Consider prompt cancellation.
8. Validate numeric inputs beyond their prompt type when needed.
9. Update the TypeScript type for conditional answers.
10. Update the transaction-flow documentation.
11. Manually test each branch.

Never use real account credentials or financial data in local testing.

## 🔀 Keep Implementations Consistent

When a change is intended for both files:
- Keep question order aligned.
- Keep messages and choices aligned.
- Use exactly the same answer keys.
- Represent optional conditional fields accurately in TypeScript.
- Test the affected branch in both implementations where execution is supported.
- Document any intentional behaviour difference.

The current code has a known difference: JavaScript stops after prompt collection, while TypeScript performs a random-value comparison.

## 📦 Work with the Lockfile

When a dependency change is necessary:
1. Explain why the dependency is needed.
2. Check whether current packages already provide the capability.
3. Update dependency metadata with npm.
4. Regenerate the lockfile with npm.
5. Review the manifest and lockfile diff.
6. Run syntax and type checks.
7. Manually exercise interactive behaviour.

The repository currently tracks a large `node_modules/` tree. Do not mix changes to installed third-party package files into an ordinary feature contribution.

## 📜 Current npm Scripts

The package currently defines a placeholder `test` script that exits with an error. It is not a working automated test suite.

Use the existing direct checks:

```bash
node --check atm.js
npx --yes --package typescript tsc --noEmit
```

Do not claim that `npm test` passed or that coverage exists until a real test framework has been configured.

## ⚙️ Continuous Integration

The current CI workflow:
1. Checks out the repository.
2. Sets up Node.js 20.
3. Runs `npm ci`.
4. Runs `node --check atm.js`.
5. Runs the TypeScript no-emit check.

It does not run an interactive Inquirer session. Interactive behaviour must be tested locally or with a separately implemented test harness.

## 🔄 Recommended Development Loop

```bash
git pull origin main
npm ci
node --check atm.js
npx --yes --package typescript tsc --noEmit
node atm.js
```

After the commands:
- Exercise the affected transaction branch.
- Inspect returned answer property names.
- Review terminal output.
- Check the complete Git diff.
- Update relevant documentation.
- Confirm no sensitive data is included.

## ✅ Before Committing

- [ ] The change has a clear purpose.
- [ ] The affected source was inspected.
- [ ] Prompt keys contain no accidental whitespace.
- [ ] Conditional branches were reviewed.
- [ ] JavaScript and TypeScript impact is understood.
- [ ] Available syntax and type checks were run.
- [ ] Manual prompt behaviour was tested where relevant.
- [ ] Only fictional values were used.
- [ ] No secrets or financial data were added.
- [ ] Documentation matches actual behaviour.
- [ ] No unrelated dependency files were changed.

## 🧭 Future Developer Experience Improvements

Potential improvements include:
- Declaring TypeScript as a direct development dependency.
- Adding explicit `typecheck` and `check` npm scripts.
- Replacing the placeholder test script with a real test suite.
- Extracting pure calculation functions.
- Representing conditional prompt results more precisely.
- Aligning JavaScript and TypeScript behaviour.
- Reviewing whether `node_modules/` should remain tracked.

These are suggestions for separate source or repository-maintenance work.
