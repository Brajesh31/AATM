# ❓ AATM Frequently Asked Questions

## 📚 Contents

- [Is AATM a real ATM application?](#is-aatm-a-real-atm-application)
- [Does it connect to a bank?](#does-it-connect-to-a-bank)
- [What values should I enter?](#what-values-should-i-enter)
- [Why are there JavaScript and TypeScript files?](#why-are-there-javascript-and-typescript-files)
- [How do I run it?](#how-do-i-run-it)
- [Why does the program ask for an amount?](#why-does-the-program-ask-for-an-amount)
- [Why do JavaScript and TypeScript behave differently?](#why-do-javascript-and-typescript-behave-differently)
- [Does npm test work?](#does-npm-test-work)
- [Are transactions saved?](#are-transactions-saved)
- [How can I contribute?](#how-can-i-contribute)

## Is AATM a real ATM application?

No. It is an educational terminal simulation that demonstrates prompts and conditional program flow.

## Does it connect to a bank?

No. There is no bank integration, authentication service, account database, or transaction processor.

## What values should I enter?

Use fictional sample values only. Never enter a real PIN, bank ID, card number, password, account number, or financial information.

## Why are there JavaScript and TypeScript files?

The repository has two entrypoints so learners can explore equivalent prompt workflows in JavaScript and TypeScript. They are launched separately.

## How do I run it?

Install dependencies with `npm ci`, then run `node atm.js`. See [Getting Started](DEVELOPMENT.md).

## Why does the program ask for an amount?

The amount prompt is part of the simulation's conditional transaction path. It does not request or execute a real withdrawal.

## Why do JavaScript and TypeScript behave differently?

The current implementations are not fully aligned. In particular, the TypeScript version contains a random demonstration balance calculation, while the JavaScript version currently ends after collecting answers. See [Transaction Flow](TRANSACTION-FLOW.md).

## Does npm test work?

The current package test script is a placeholder that exits with an error. The CI workflow performs syntax and TypeScript checks, not interactive end-to-end tests.

## Are transactions saved?

No persistent transaction history or account store is implemented.

## How can I contribute?

Read [CONTRIBUTING.md](../CONTRIBUTING.md), check existing issues, and submit focused changes with validation evidence.
