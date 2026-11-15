# 🏗️ AATM Architecture and Code Walkthrough

This document explains the current architecture of AATM. It describes the actual program boundary, the responsibilities of the main files, the use of Inquirer, and the differences between the JavaScript and TypeScript implementations.

AATM is a local command-line learning exercise. It is not a service-oriented application, does not expose an HTTP API, and does not connect to a bank or database.

## 📚 Table of Contents

- [System Boundary](#-system-boundary)
- [Repository Structure](#-repository-structure)
- [Runtime and Dependencies](#-runtime-and-dependencies)
- [Module System](#-module-system)
- [JavaScript Entry Point](#-javascript-entry-point)
- [TypeScript Entry Point](#-typescript-entry-point)
- [Prompt Definition Model](#-prompt-definition-model)
- [Answer Object and Data Flow](#-answer-object-and-data-flow)
- [Conditional Prompt Behaviour](#-conditional-prompt-behaviour)
- [Demonstration Calculation](#-demonstration-calculation)
- [Current Architectural Limitations](#-current-architectural-limitations)
- [Possible Future Separation of Concerns](#-possible-future-separation-of-concerns)
- [Safe Extension Boundaries](#-safe-extension-boundaries)

## 🎯 System Boundary

AATM is a single-process CLI program run locally with Node.js. The primary runtime interaction is with the terminal. Inquirer displays questions, gathers answers, and returns an object that the entrypoint can inspect.

The repository does not define:
- A web server or HTTP API.
- A customer database or user directory.
- A bank integration.
- An account ledger.
- Persistent transaction records.
- A secure credential store.
- A real authorization service.
- A server-side transaction engine.

The program is an educational simulation. An ID-like input and a PIN-like number are prompt values only. They do not authenticate a user.

## 🗂️ Repository Structure

| Path | Responsibility |
|---|---|
| `atm.js` | JavaScript prompt sequence |
| `atm.ts` | TypeScript prompt sequence and random-value demonstration |
| `package.json` | npm metadata, scripts, and dependencies |
| `package-lock.json` | Locked dependency tree |
| `tsconfig.json` | TypeScript compiler settings |
| `.github/workflows/ci.yml` | JavaScript syntax and TypeScript validation |
| `.github/workflows/update-readme.yml` | Existing timestamp update automation |
| `docs/` | Technical documentation |
| `LICENSE` | MIT License |

The repository also contains a tracked `atm` path and a large `node_modules/` tree. Their purpose and tracking history should be reviewed before changing them. This documentation does not modify those paths.

## ⚙️ Runtime and Dependencies

### Node.js

Node.js executes the JavaScript entrypoint and provides access to the installed package dependencies. The current CI workflow uses Node.js 20. Node.js 18 or newer is the recommended local baseline, subject to dependency compatibility.

### Inquirer

Inquirer is used to prompt for:
- Text-like user identifiers.
- Numeric PIN-like input.
- Account category selection.
- Transaction type selection.
- A preset or manually entered amount.

Inquirer is a terminal UI library. It does not implement bank authentication, account authorization, or financial validation.

### TypeScript compiler

The project includes TypeScript source and a compiler configuration. The current CI workflow invokes TypeScript through `npx` rather than a directly declared project compiler dependency. The compiler is run with `--noEmit`, so the workflow validates types without generating JavaScript files.

## 📦 Module System

The package declares:

```json
{
  "type": "module"
}
```

This causes Node.js to interpret `.js` files in the package scope as ES modules. The JavaScript implementation uses:

```js
import inquirer from "inquirer";
```

Both entrypoints use top-level `await` with Inquirer's prompt API. Use a modern Node.js runtime that supports top-level await in ES modules.

## 🟨 JavaScript Entry Point

The JavaScript implementation in `atm.js` defines the prompt sequence and awaits the result of `inquirer.prompt(...)`.

The active code collects the input values. The earlier random-balance calculation is commented out. Commented code does not execute, so the JavaScript program currently finishes after prompt collection.

The JavaScript file should therefore be described as an interactive input-flow demonstration, not as a completed withdrawal calculation.

## 🔷 TypeScript Entry Point

The TypeScript implementation in `atm.ts` defines an answer type and applies it to the result of the prompt call.

After prompt collection, it checks whether the identifier and PIN-like value are truthy. It then generates a random integer, prints it, reads the amount property, and compares the requested amount with the generated value.

This calculation demonstrates conditional logic. The random integer is not loaded from an account, is not persistent, and is not a real balance.

The declared answer shape currently assumes a required numeric amount, although the prompt sequence asks for either a fast-cash amount or a manual withdrawal amount conditionally. The manual withdrawal prompt also uses a name with trailing whitespace. These details can cause the declared type and runtime object shape to differ.

## 🧩 Prompt Definition Model

Each question is an object in the array passed to Inquirer.

Common properties include:

| Property | Meaning |
|---|---|
| `type` | Kind of prompt, such as input, number, or list |
| `name` | Exact property name in the returned answers object |
| `message` | Text shown to the visitor |
| `choices` | Options available for a list prompt |
| `when` | Optional condition deciding whether a question is displayed |

The most important detail for later code is `name`. It determines the answer object's key exactly. A trailing space or spelling difference creates a different key. The current source has a known mismatch around the withdrawal amount key.

## 🔄 Answer Object and Data Flow

The general execution flow is:

```text
Node.js starts the selected entrypoint
            |
            v
Import Inquirer
            |
            v
Build prompt-definition array
            |
            v
Display first prompt
            |
            v
Collect answer
            |
            v
Evaluate conditional prompt callbacks
            |
            v
Display applicable next question
            |
            v
Resolve the prompt promise
            |
            v
Return answer object
            |
            +----------------------+
            |                      |
            v                      v
        atm.js                 atm.ts
  no active calculation    type-shaped answer
  after prompt result      random demo comparison
```

No answer is sent to a remote service or written to a database by the inspected source.

## 🔀 Conditional Prompt Behaviour

The account category prompt is followed by a transaction type prompt. The transaction type controls which amount prompt appears.

- When the transaction is fast cash, the fixed list of amounts is displayed.
- When the transaction is withdrawal, a number prompt is displayed.

The `when` callback receives the answers collected so far. It decides whether the conditional question should be shown.

A conditional answer may be absent from the result if its prompt was not displayed. Types should represent this conditional nature rather than assume every field is always present.

## 🧮 Demonstration Calculation

The TypeScript implementation uses a random value:

```ts
const balance = Math.floor(Math.random() * 10000000);
```

It then compares the entered amount with this value and prints a remaining amount or insufficient-balance message.

This is only a programming demonstration:
- The number changes between executions.
- It is not loaded from an account.
- It is not stored.
- It is not protected.
- It is not authoritative.
- It does not represent an actual financial balance.

The JavaScript implementation's earlier calculation is commented out and is not active behaviour.

## ⚠️ Current Architectural Limitations

1. Prompt definitions and post-prompt logic are coupled inside the entrypoint files.
2. JavaScript and TypeScript duplicate the prompt sequence and can drift.
3. Prompt answer keys contain a known whitespace inconsistency.
4. The TypeScript answer shape does not fully express conditional values.
5. There is no isolated validation layer.
6. There is no reusable transaction domain model.
7. There is no persistence layer.
8. There is no authentication or authorization boundary.
9. There is no automated unit-test suite.
10. The current package test script is a placeholder.

These limitations are documented. Fixing them would require source or package changes and is outside documentation-only work.

## 🧱 Possible Future Separation of Concerns

If the project grows as a learning exercise, a more maintainable design could separate:

- **Prompt layer:** Defines the questions and their conditional display.
- **Input normalization:** Converts and normalizes user-entered values.
- **Validation layer:** Checks educational business rules such as positive amounts.
- **Calculation layer:** Implements pure functions that receive mock values and return results.
- **Output layer:** Formats success, error, and summary messages.

Pure calculation functions can be tested without launching Inquirer prompts. The interactive layer can then focus on collecting input and displaying output.

This is a future design option, not the current source structure.

## 🛡️ Safe Extension Boundaries

Safe educational extensions may include:
- Validating that a mock amount is positive.
- Demonstrating preset amount selection.
- Returning a calculation result from explicit mock data.
- Adding pure function tests.
- Modelling a mock transaction state.
- Explaining why real authentication and persistence require server-side systems.

Do not connect the simulation to real accounts or collect real credentials. A production financial system would require a separately designed security, authorization, persistence, audit, fraud-control, compliance, and operational architecture.
