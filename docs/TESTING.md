# 🧪 AATM Testing and Validation Guide

This guide explains what is currently validated in the repository, how to run those checks, how to manually test the interactive CLI, and what additional test coverage would be useful as the project evolves.

AATM is an educational terminal simulation. Test only with fictional identifiers and numeric values. Do not use real banking credentials, account information, or personal financial data.

> [!IMPORTANT]
> The current project does not have a working automated unit-test suite. The npm `test` script is a placeholder that intentionally exits with an error. The existing CI workflow checks JavaScript syntax and TypeScript compilation without emitting files. Those checks do not simulate a person using the prompts.

## 📚 Table of Contents

- [🎯 Testing Objectives](#-testing-objectives)
- [📋 Current Validation Inventory](#-current-validation-inventory)
- [🖥️ Prepare the Environment](#️-prepare-the-environment)
- [🟨 JavaScript Syntax Validation](#-javascript-syntax-validation)
- [🔷 TypeScript Type Validation](#-typescript-type-validation)
- [🧭 Manual Interactive Test Plan](#-manual-interactive-test-plan)
- [🔀 Conditional Branch Coverage](#-conditional-branch-coverage)
- [🔢 Input and Boundary Scenarios](#-input-and-boundary-scenarios)
- [🛑 Cancellation and Terminal Behaviour](#-cancellation-and-terminal-behaviour)
- [⚖️ JavaScript and TypeScript Comparison](#️-javascript-and-typescript-comparison)
- [⚠️ Known Test Gaps](#️-known-test-gaps)
- [⚙️ Continuous Integration](#️-continuous-integration)
- [🧾 Recording Results](#-recording-results)
- [🧪 Future Automated Test Strategy](#-future-automated-test-strategy)
- [✅ Release Validation Checklist](#-release-validation-checklist)

## 🎯 Testing Objectives

Testing should answer separate questions:

1. Can Node.js parse the JavaScript entrypoint?
2. Does the TypeScript source pass the configured compiler check?
3. Do the prompts appear in the intended order?
4. Does each account and transaction choice lead to the right conditional prompt?
5. Does Inquirer return the answer keys expected by later code?
6. What happens when users enter unusual values or cancel?
7. Are the JavaScript/TypeScript implementation differences understood?
8. Does the documentation describe actual, rather than assumed, behaviour?

Do not treat one successful check as evidence for all of these questions. Syntax validation, type checking, and manual interactive testing cover different risks.

## 📋 Current Validation Inventory

| Validation layer | Current status | What it can establish |
|---|---|---|
| JavaScript syntax | Present in CI | `atm.js` parses |
| TypeScript type check | Present in CI | Source passes the configured no-emit check |
| Manual prompt testing | Must be performed locally | Interactive sequence and terminal behaviour |
| Unit tests | Not implemented | No automated pure-function assertions |
| Prompt integration tests | Not implemented | No automated prompt-answer integration suite |
| End-to-end tests | Not implemented | No automated terminal journey suite |
| Coverage report | Not configured | No measured coverage percentage |

The current npm `test` script is a placeholder. Its failure does not mean an existing automated test case failed. It means no usable test command has been configured yet.

## 🖥️ Prepare the Environment

Install from the repository root:

```bash
npm ci
```

Record the runtime versions:

```bash
node --version
npm --version
```

Run interactive tests in a real terminal with keyboard input support. IDE output panes and CI runners may not provide a TTY.

## 🟨 JavaScript Syntax Validation

Run:

```bash
node --check atm.js
```

This asks Node.js to parse the file. It does not execute the prompt flow and cannot verify which questions appear or what values are returned.

When it fails, capture the complete diagnostic, the indicated line, and the Node.js version. Fix the underlying syntax problem rather than suppressing the error.

## 🔷 TypeScript Type Validation

Run:

```bash
npx --yes --package typescript tsc --noEmit
```

This obtains the compiler using npx and checks the project according to `tsconfig.json`. The `--noEmit` flag prevents generated JavaScript output.

This command does not execute `atm.ts`. It also does not verify that the interactive values returned by Inquirer match every assumption made by the program.

The project does not currently declare TypeScript as a direct dev dependency. That is a reproducibility limitation, not a reason to invent a different local command.

## 🧭 Manual Interactive Test Plan

Use fictional values and exercise both entrypoints where supported.

### Setup scenarios

| ID | Scenario | Expected observation |
|---|---|---|
| SET-01 | Run `npm ci` | Dependencies install from lockfile |
| SET-02 | Run `node atm.js` | Inquirer starts in an interactive terminal |
| SET-03 | Run `node --check atm.js` | JavaScript syntax check completes |
| SET-04 | Run TypeScript no-emit check | Compiler completes without diagnostics |

### Initial prompt scenarios

| ID | Scenario | What to observe |
|---|---|---|
| PROMPT-01 | Enter a fictional user ID | Value is collected under the configured key |
| PROMPT-02 | Enter a fictional numeric PIN-like value | Numeric answer is collected |
| PROMPT-03 | Select current account | Account selection is returned |
| PROMPT-04 | Select savings account | Account selection is returned |

### Transaction branch scenarios

| ID | Scenario | What to observe |
|---|---|---|
| FLOW-01 | Select withdrawal | Manual numeric amount prompt appears |
| FLOW-02 | Select fast cash | Preset amount list appears |
| FLOW-03 | Select first fast-cash option | Expected value is collected |
| FLOW-04 | Select each remaining option | Every configured choice is reachable |
| FLOW-05 | Inspect withdrawal answer | Exact answer property name is checked |
| FLOW-06 | Inspect TypeScript result | Random demonstration comparison is distinguished from real balance logic |

## 🔀 Conditional Branch Coverage

The current prompt sequence has two major branches.

### Withdrawal branch

1. Start the application in a terminal.
2. Enter a fictional user identifier.
3. Enter a fictional PIN-like number.
4. Choose current or savings.
5. Choose withdrawal.
6. Enter a positive numeric value.
7. Inspect the returned answer key and subsequent program behaviour.

The current source uses a trailing space in the manual withdrawal amount prompt name. That means the returned key is different from `amount`. Test this explicitly because it is a known source issue.

### Fast-cash branch

1. Complete the initial prompts with fictional values.
2. Choose an account category.
3. Choose fast cash.
4. Confirm the list of preset amounts appears.
5. Select one value.
6. Inspect the returned `amount` property.

The choices are hard-coded in the current source. If they change, update this guide and the transaction-flow document.

## 🔢 Input and Boundary Scenarios

These cases are useful for discovering current behaviour. They are not claims that the program currently enforces the expected business rule.

| Scenario | Example | Review question |
|---|---:|---|
| Positive amount | `1000` | Does the prompt collect the value? |
| Zero amount | `0` | Is zero accepted? Is there any explicit validation? |
| Negative amount | `-10` | Is a negative number accepted? |
| Very large value | `999999999` | Is there a configured upper bound? |
| Decimal value | `12.50` | How does the number prompt represent it? |
| Non-numeric input | `abc` | How does Inquirer handle the invalid response? |
| Missing conditional value | Skipped branch | Is the answer property absent? |
| False-like PIN value | `0` | How does the truthiness condition behave? |

Do not describe a number prompt as financial validation. Real authorization and transaction limits do not exist in this project.

## 🛑 Cancellation and Terminal Behaviour

Manually test cancellation at different prompt positions:

- [ ] Ctrl+C at the first question.
- [ ] Ctrl+C at the PIN-like question.
- [ ] Ctrl+C at account selection.
- [ ] Ctrl+C at transaction selection.
- [ ] Ctrl+C at the amount question.

Observe whether the program exits cleanly and whether the terminal is left in a usable state. The current source does not define a comprehensive cancellation-specific recovery flow.

Also test from:
- A normal terminal.
- A supported terminal emulator in an IDE.
- A non-interactive environment to confirm that interactive prompts are not expected to work there.

CI should validate syntax and types rather than attempting to answer the prompts.

## ⚖️ JavaScript and TypeScript Comparison

The implementations differ in their post-prompt behaviour.

| Behaviour | JavaScript | TypeScript |
|---|---|---|
| Collect user-like ID | Yes | Yes |
| Collect PIN-like number | Yes | Yes |
| Account selection | Yes | Yes |
| Transaction selection | Yes | Yes |
| Fast-cash list | Yes | Yes |
| Manual withdrawal prompt | Yes | Yes |
| Active random-value comparison | No, earlier code is commented | Yes |
| Prints generated random value | No | Yes |
| Prints a demonstration remaining value | No | Yes |

These differences are current implementation facts, not an expectation that both programs always produce the same output.

## ⚠️ Known Test Gaps

1. No automated unit-test framework is configured.
2. No automated tests cover the Inquirer prompt sequence.
3. No test command is configured in package scripts.
4. The existing `npm test` placeholder exits with an error.
5. The withdrawal amount key contains trailing whitespace.
6. The TypeScript answer shape does not fully model conditional prompt values.
7. JavaScript and TypeScript differ after prompt collection.
8. No coverage report is configured.
9. No performance or security audit workflow is defined.

A source change that addresses any of these issues should add targeted validation where practical.

## ⚙️ Continuous Integration

The current CI workflow:
1. Checks out the repository.
2. Sets up Node.js 20.
3. Runs `npm ci`.
4. Runs `node --check atm.js`.
5. Runs `npx --yes --package typescript tsc --noEmit`.

It does not execute interactive prompts, and it does not run a working unit-test suite. A green CI result therefore confirms the configured checks only.

## 🧾 Recording Results

Record test results with enough information for another person to reproduce them.

| Field | What to record |
|---|---|
| Commit | Commit SHA or branch |
| Environment | OS and version |
| Runtime | Node.js version |
| Package manager | npm version |
| Command | Exact command executed |
| Scenario | Prompt branch or validation |
| Expected result | What should happen |
| Observed result | What actually happened |
| Outcome | Passed, failed, blocked, or not run |
| Evidence | Sanitized output |

Example report:

```text
Commit:
OS:
Node.js:
npm:
Command:
Scenario:
Steps:
Expected:
Observed:
Outcome:
Evidence:
```

Never include real credentials, account information, PINs, or personal data.

## 🧪 Future Automated Test Strategy

A reasonable future testing path is:

1. Extract amount validation into pure functions.
2. Add explicit tests for positive, zero, negative, and boundary values.
3. Extract the mock balance comparison into a pure function with explicit input.
4. Test sufficient and insufficient mock-value cases.
5. Improve TypeScript types for conditional prompt answers.
6. Consider controlled prompt tests using a supported input stream.
7. Replace the placeholder npm test script with a real test runner.
8. Add the test command to CI.

This is a proposed strategy. No test framework is being added as part of this documentation update.

## ✅ Release Validation Checklist

- [ ] JavaScript syntax check was run.
- [ ] TypeScript no-emit check was run.
- [ ] Withdrawal branch was exercised.
- [ ] Fast-cash branch was exercised.
- [ ] Every preset amount was checked.
- [ ] Cancellation behaviour was inspected.
- [ ] Answer keys were checked for whitespace and spelling.
- [ ] JavaScript/TypeScript differences are understood.
- [ ] Only fictional values were used.
- [ ] Results accurately state what was tested.
- [ ] Known limitations are not misrepresented.
