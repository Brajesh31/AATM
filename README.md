# AATM

A small interactive ATM-flow exercise implemented in JavaScript and TypeScript with Inquirer prompts. It demonstrates a terminal sequence for entering a user ID and PIN, selecting an account type, and choosing a withdrawal or fast-cash amount.

> **Important:** This is an educational simulation, not a banking application. It does not authenticate against a bank, maintain a real account ledger, or connect to payment infrastructure. Never enter a real banking PIN or credentials.

## Requirements

- Node.js 18+
- npm

## Setup

```bash
npm ci
```

## Run

The repository contains both `atm.js` and `atm.ts`. The JavaScript file uses native ES modules:

```bash
node atm.js
```

The TypeScript entrypoint requires a TypeScript execution tool or compilation. TypeScript is not currently declared in the package's development dependencies, so configure that toolchain before relying on `atm.ts`.

## Current behavior and limitations

- Prompts for a user ID, PIN, account type, and transaction choice.
- Offers a fixed list of fast-cash amounts.
- The TypeScript version contains a random in-memory balance demonstration.
- There is no persistent account data, secure PIN verification, transaction history, balance integrity, or real withdrawal operation.
- The JavaScript and TypeScript implementations are not fully consistent.
- The package currently has no meaningful automated test script.

## Development

See [development notes](docs/DEVELOPMENT.md), [architecture](docs/ARCHITECTURE.md), and [security guidance](SECURITY.md). Keep this project clearly labelled as a simulation unless a secure backend and proper financial controls are designed and implemented.
