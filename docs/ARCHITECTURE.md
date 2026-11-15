# 🏗️ AATM Architecture and Code Walkthrough

This document explains the current architecture of AATM, including its application boundary, main files, dependency responsibilities, prompt model, and the differences between its JavaScript and TypeScript implementations.

AATM is a local, single-process command-line exercise. It is not a service-oriented application, does not expose an HTTP API, and does not connect to a bank or database.

## 📚 Table of Contents

- [🎯 System Boundary](#-system-boundary)
- [🗂️ Repository Structure](#️-repository-structure)
- [⚙️ Runtime and Dependencies](#️-runtime-and-dependencies)
- [📦 Module System](#-module-system)
- [🟨 JavaScript Entry Point](#-javascript-entry-point)
- [🔷 TypeScript Entry Point](#-typescript-entry-point)
- [🧩 Prompt Definition Model](#-prompt-definition-model)
- [🔄 Answer Object and Data Flow](#-answer-object-and-data-flow)
- [🔀 Conditional Prompt Behaviour](#-conditional-prompt-behaviour)
- [🧮 Demonstration Calculation](#-demonstration-calculation)
- [⚠️ Current Architectural Limitations](#️-current-architectural-limitations)
- [🧱 Possible Future Separation](#-possible-future-separation)
- [🛡️ Safe Extension Boundaries](#️-safe-extension-boundaries)

## 🎯 System Boundary

AATM runs locally in a Node.js process. The terminal is its user interface. Inquirer displays questions, gathers values, and returns an answer object to the entrypoint.

The inspected repository does not define:
- An HTTP server or API.
- A database or persistent account ledger.
- A bank integration.
- A customer identity provider.
- A secure PIN store.
- A transaction authorization service.
- A persistent audit history.

The ID-like and PIN-like values are collected for demonstration only. They do not authenticate anyone.

## 🗂️ Repository Structure

| Path | Responsibility |
|---|---|
| `atm.js` | JavaScript prompt sequence |
| `atm.ts` | TypeScript prompt sequence and random-value demonstration |
| `package.json` | npm metadata, scripts, and dependencies |
| `package-lock.json` | Locked npm dependency resolution |
| `tsconfig.json` | TypeScript compiler settings |
| `.github/workflows/ci.yml` | JavaScript syntax and TypeScript validation |
| `.github/workflows/update-readme.yml` | Existing README timestamp automation |
| `docs/` | Technical documentation |
| `LICENSE` | MIT license text |

The Git tree also contains a tracked `atm` path and `node_modules/` directory. Their purpose and tracking history should be verified before changing them. This documentation update does not modify those paths.

## ⚙️ Runtime and Dependencies

### Node.js
Node.js executes the JavaScript entrypoint and resolves installed project dependencies. The CI workflow currently uses Node.js 20. The README recommends Node.js 18 or newer for local development, subject to dependency compatibility.

### Inquirer
Inquirer handles terminal interaction. The current source uses input, number, and list prompts. It also uses conditional callbacks to display different questions based on previous answers.

Inquirer is a prompt library. It does not implement financial authentication, authorization, account validation, or transaction security.

### TypeScript compiler
The repository contains TypeScript source and a compiler configuration. CI obtains TypeScript through an `npx` command and uses `--noEmit` so no JavaScript output is generated.

## 📦 Module System

The package manifest declares `"type": "module"`. Node.js therefore treats `.js` files in the package scope as ES modules.

The JavaScript entrypoint uses:

```js
import inquirer from "inquirer";
```

Both entrypoints use top-level `await` when waiting for the prompt result. Modern Node.js supports this in ES modules.

## 🟨 JavaScript Entry Point

The `atm.js` file defines a prompt array and awaits `inquirer.prompt(...)`.

The active implementation collects the answers. An earlier random-balance calculation is commented out, so it does not execute. The JavaScript entrypoint currently ends after the prompt result is collected.

It should be described as an input-collection example, not a completed balance calculation.

## 🔷 TypeScript Entry Point

The `atm.ts` file declares an answer type, awaits the prompt result, and then checks whether the user ID and PIN-like value are truthy.

The active post-prompt code:
1. Generates a random integer.
2. Prints the generated value.
3. Reads the answer amount.
4. Compares the amount with the generated value.
5. Prints a demonstration remaining-value or insufficient-value message.

The random number is not loaded from an account, is not persistent, and has no relationship with a real user's funds.

The type declaration assumes a required `amount`, but the prompt sequence collects amount conditionally. The withdrawal prompt also uses a key with trailing whitespace. The answer type and actual runtime shape may therefore differ.

## 🧩 Prompt Definition Model

An Inquirer question is described by an object.

| Property | Purpose |
|---|---|
| `type` | Prompt style such as input, number, or list |
| `name` | Exact answer object property key |
| `message` | Prompt message displayed in the terminal |
| `choices` | Allowed options for a list prompt |
| `when` | Condition that determines whether the prompt is displayed |

The `name` property is particularly important. Spelling, capitalization, and whitespace are significant. The current source contains a trailing-space mismatch in the withdrawal amount key.

## 🔄 Answer Object and Data Flow

```text
Node.js starts selected entrypoint
              |
              v
       Import Inquirer
              |
              v
      Define prompt array
              |
              v
     Ask first question
              |
              v
      Collect user input
              |
              v
 Evaluate conditional questions
              |
              v
   Resolve prompt promise
              |
              v
     Return answer object
              |
       +------+------+
       |             |
       v             v
     atm.js        atm.ts
  ends after      type-shaped result
  collection      random comparison
```

The answer object contains values for questions that were displayed. A conditional field may be absent when its prompt was skipped.

The inspected source does not send these answers to a remote service or store them in a database.

## 🔀 Conditional Prompt Behaviour

The account category prompt is followed by a transaction-type prompt. The transaction selection controls the amount prompt.

- Fast cash displays the fixed list of preset values.
- Withdrawal displays a numeric prompt.

The `when` callback receives answers gathered so far. It decides whether a later question should appear.

Because a conditional prompt may not run, its property should not automatically be assumed to exist in every answer object.

## 🧮 Demonstration Calculation

The TypeScript source generates a random integer using:

```ts
const balance = Math.floor(Math.random() * 10000000);
```

It compares the requested amount to this generated value and prints a message.

This is only a demonstration:
- The value changes between executions.
- It is not retrieved from an account.
- It is not persisted.
- It is not authoritative.
- It is not protected.
- It is not a financial balance.

The JavaScript source has a similar earlier block only as comments, so that code is not active.

## ⚠️ Current Architectural Limitations

- Prompt definitions and post-prompt logic are coupled in the entrypoint files.
- JavaScript and TypeScript duplicate the flow and can drift.
- Prompt answer keys contain a known whitespace mismatch.
- The TypeScript answer type does not accurately represent conditional values.
- No dedicated validation layer is present.
- No reusable transaction domain model is present.
- No persistence boundary exists.
- No authentication or authorization boundary exists.
- No automated unit-test suite is configured.
- The npm test command remains a placeholder.

These are documented limitations. Fixing them would require source, package, or workflow changes.

## 🧱 Possible Future Separation

If AATM grows as an educational exercise, a more maintainable structure could separate:
- Prompt definitions and terminal interaction.
- Input normalization and validation.
- Pure demonstration calculations.
- Terminal output formatting.
- Automated tests for pure functions.

This could allow calculation logic to be tested without creating an interactive terminal session. It is a suggested future design, not the current structure.

## 🛡️ Safe Extension Boundaries

Safe educational extensions may include:
- Positive amount validation for mock input.
- Predictable mock values for deterministic examples.
- Pure functions for remaining-value calculations.
- A clearer simulated transaction summary.
- Better TypeScript modelling for conditional answers.
- Explicit cancellation handling.
- Unit tests for pure functions.

Do not connect the simulation to real financial accounts. A production financial system would require an independent security, authorization, persistence, audit, fraud-control, compliance, and operational architecture.
