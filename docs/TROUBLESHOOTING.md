# 🧯 AATM Troubleshooting Guide

This guide helps diagnose common installation, Node.js, TypeScript, terminal, prompt, and GitHub Actions problems. Its aim is to make investigation systematic: reproduce the problem, identify the failing layer, inspect the first meaningful error, and make one focused change at a time.

AATM is a learning-oriented CLI simulation. Use fictional values only. Never include real banking IDs, PINs, account numbers, passwords, or personal financial information in logs, screenshots, or issue reports.

## 📚 Table of Contents

- [🧭 Troubleshooting Principles](#-troubleshooting-principles)
- [🖥️ Verify the Environment](#️-verify-the-environment)
- [📦 Dependency Installation](#-dependency-installation)
- [❓ Inquirer Cannot Be Found](#-inquirer-cannot-be-found)
- [📦 ES Module Import Errors](#-es-module-import-errors)
- [⏳ Top-Level Await Errors](#-top-level-await-errors)
- [⌨️ Prompts Do Not Render](#️-prompts-do-not-render)
- [🔎 Prompt Answer Is Missing](#-prompt-answer-is-missing)
- [⚠️ Withdrawal Amount Is Not Read](#️-withdrawal-amount-is-not-read)
- [🔀 JavaScript and TypeScript Behave Differently](#-javascript-and-typescript-behave-differently)
- [🔷 TypeScript Compiler Is Missing](#-typescript-compiler-is-missing)
- [🧩 TypeScript Type Errors](#-typescript-type-errors)
- [❌ npm Test Fails](#-npm-test-fails)
- [⚙️ GitHub Actions CI Fails](#️-github-actions-ci-fails)
- [📁 Tracked node_modules Directory](#-tracked-node_modules-directory)
- [🛑 Cancellation and Exit Behaviour](#-cancellation-and-exit-behaviour)
- [🧾 Reporting a Problem](#-reporting-a-problem)

## 🧭 Troubleshooting Principles

Before changing code or dependencies:

1. Confirm the terminal is in the AATM repository root.
2. Record Node.js and npm versions.
3. Copy the exact command that failed.
4. Read the first relevant error message.
5. Identify the failing layer: installation, module loading, syntax, type checking, interactive prompt, or workflow.
6. Reproduce the issue with fictional values.
7. Make one focused change and repeat the same check.

Useful initial commands:

```bash
node --version
npm --version
git status --short
```

Avoid deleting the lockfile, switching package managers, or force-upgrading dependencies as a first response. These actions can change the environment and make the original issue harder to diagnose.

## 🖥️ Verify the Environment

The current CI workflow uses Node.js 20. The README recommends Node.js 18 or newer for local development, subject to dependency compatibility.

Confirm that:
- Node.js is installed.
- npm is available.
- The working directory is the repository root.
- Network access is available when dependency installation needs it.
- The terminal supports interactive input for running the prompts.

## 📦 Dependency Installation

### Symptom
`npm ci` fails before the program can run.

### Investigation
1. Check that `package.json` and `package-lock.json` are present.
2. Check the Node.js and npm versions.
3. Inspect the first meaningful npm error.
4. Confirm registry connectivity.
5. Check whether package metadata and the lockfile have been changed independently.
6. Retry only after correcting the identified cause.

Use:

```bash
npm ci
```

Do not delete the lockfile as the first response. If a dependency update is required, use npm deliberately and review both the manifest and lockfile changes.

## ❓ Inquirer Cannot Be Found

### Symptom
Node.js reports that it cannot find the Inquirer package.

### Suggested checks
- Run `npm ci` from the project root.
- Confirm installation completed without an error.
- Confirm the project directory is the current working directory.
- Confirm `inquirer` remains declared in the package manifest.
- Confirm the command is not being run in an unrelated global Node.js environment.

Run:

```bash
npm ci
node atm.js
```

If the problem continues, report the exact sanitized error and runtime versions.

## 📦 ES Module Import Errors

### Symptom
Node.js reports an import error or complains that an ES module cannot be loaded as CommonJS.

The project currently sets `"type": "module"` in its package manifest. The JavaScript source uses ES module import syntax.

Check:
- The package manifest has not been changed unexpectedly.
- The file is run from the repository package scope.
- Node.js is a supported version.
- A CommonJS-only loader is not being used.

Do not replace `import` with `require` without intentionally changing the project's module strategy and validating the impact.

## ⏳ Top-Level Await Errors

The entrypoints use top-level `await` when calling Inquirer's prompt API. Modern Node.js supports top-level await in ES modules.

If an error appears:
1. Check the Node.js version.
2. Confirm `"type": "module"` remains in the package manifest.
3. Run the file directly with Node.
4. Avoid a loader or wrapper that forces CommonJS parsing.

## ⌨️ Prompts Do Not Render

Inquirer requires an interactive terminal. Some IDE output panes, task runners, CI systems, or redirected processes do not provide a TTY.

Try:
1. Open a regular terminal window.
2. Change to the AATM repository root.
3. Run `node atm.js`.
4. Confirm that the terminal accepts keyboard input.
5. Avoid running the interactive program in a non-interactive CI step.

The current CI workflow deliberately validates syntax and types rather than answering prompts. A prompt that cannot receive input in CI is not automatically an application defect.

## 🔎 Prompt Answer Is Missing

Inquirer uses the exact prompt `name` as the key in the returned answer object.

For example:

```js
{
  type: "number",
  name: "amount",
  message: "Enter an amount"
}
```

The returned value is normally read using:

```js
answers.amount
```

If the prompt name contains a different spelling, an extra space, or a different capitalization, then the returned property name is also different.

Check:
- The prompt's exact `name`.
- The property used by the calculation.
- Whether the prompt was skipped by a conditional `when`.
- Whether the answer exists for the selected transaction path.

## ⚠️ Withdrawal Amount Is Not Read

This is a known issue in the current source.

The fast-cash amount prompt uses `name: "amount"`, while the manual withdrawal prompt uses `name: "amount "` with a trailing space.

These are distinct object properties:

```js
answers.amount
answers["amount "]
```

Code that reads `answer.amount` may therefore fail to get the value collected by the withdrawal prompt.

The documentation intentionally records the current behaviour. Correcting it requires changing the JavaScript and TypeScript prompt definitions and aligning the TypeScript answer shape. That is a source-code change and should be tested in a separate implementation update.

## 🔀 JavaScript and TypeScript Behave Differently

This is a known implementation difference.

| File | Current post-prompt behaviour |
|---|---|
| `atm.js` | Collects the prompt answers and ends; earlier random-value code is commented out |
| `atm.ts` | Generates a random number, prints it, and performs a demonstration comparison |

Do not assume the files are identical implementations or that the JavaScript version prints the same output. See [Transaction Flow](TRANSACTION-FLOW.md).

## 🔷 TypeScript Compiler Is Missing

The repository contains `atm.ts` and `tsconfig.json`, but does not declare TypeScript as a direct development dependency.

The current CI command uses npx:

```bash
npx --yes --package typescript tsc --noEmit
```

This may download the TypeScript compiler if it is not already cached. A network connection may be required.

The command checks types only. It does not execute the TypeScript application.

## 🧩 TypeScript Type Errors

If the compiler reports a diagnostic:
- Read the complete error and source location.
- Inspect the prompt answer names.
- Check whether a conditional question may be skipped.
- Check whether a result property should be optional.
- Compare the declared type with every branch of the prompt flow.
- Confirm the compiler version and configuration.

The current type assumes a required numeric `amount`, even though the prompt sequence presents different conditional amount questions. The trailing-space withdrawal key also contributes to the mismatch.

Do not suppress an error without understanding why the type and runtime result differ.

## ❌ npm Test Fails

The current package manifest defines a placeholder `test` script that prints an error and exits with a nonzero status.

That is not a working unit-test suite. The failure does not mean a real test assertion failed. The repository does not currently have a dedicated automated unit-test framework.

Use the existing checks:

```bash
node --check atm.js
npx --yes --package typescript tsc --noEmit
```

Then perform manual interactive validation.

## ⚙️ GitHub Actions CI Fails

The current CI workflow:
1. Checks out the repository.
2. Sets up Node.js 20.
3. Runs `npm ci`.
4. Checks JavaScript syntax using `node --check atm.js`.
5. Checks TypeScript using `npx --yes --package typescript tsc --noEmit`.

Identify which step failed:
- **Setup or install failure:** inspect runtime, package metadata, lockfile, and registry access.
- **JavaScript syntax failure:** inspect the parser diagnostic and affected line.
- **TypeScript failure:** inspect the compiler diagnostic and answer type.
- **Interactive prompt behaviour:** reproduce locally; CI does not drive the CLI.

When reporting CI issues, include the workflow run, failed step, commit SHA, and sanitized log excerpt.

## 📁 Tracked node_modules Directory

The repository currently contains a committed `node_modules/` tree. For most npm applications, tracking installed dependencies is not recommended because they can be recreated from the package manifest and lockfile.

However, deleting the tracked dependency directory is a repository maintenance change. Do not remove it or bulk-edit third-party package files during a documentation-only task. A maintainer should review Git history, ignore rules, CI behaviour, and deployment assumptions before changing dependency tracking.

## 🛑 Cancellation and Exit Behaviour

Interactive prompts may be cancelled using Ctrl+C. The current source does not implement a detailed cancellation recovery or retry experience.

When investigating cancellation:
- Record which prompt was active.
- Check whether the process exits.
- Check whether the terminal is still usable.
- Confirm whether any partial output is printed.
- Do not treat a user-initiated cancellation as a failed amount calculation.

If cancellation behaviour is changed, document and test it separately.

## 🧾 Reporting a Problem

A useful issue includes:

```text
Title:
Repository commit:
Operating system:
Node.js:
npm:
Terminal:
Command:
Affected file or prompt:
Steps to reproduce:
Expected result:
Actual result:
Sanitized error output:
Does it affect JavaScript, TypeScript, or both?
```

Use only fictional input values. Never publish real PINs, banking details, passwords, tokens, or personal financial information. For a suspected vulnerability, follow [SECURITY.md](../SECURITY.md) and report privately.
