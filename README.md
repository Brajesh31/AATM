# AATM, Interactive ATM Flow Simulation

AATM is a command-line programming exercise that models a simplified ATM interaction using Inquirer prompts. It asks for a user identifier and PIN-like value, lets the user select an account category, and then presents a withdrawal or fast-cash path. The repository contains parallel JavaScript and TypeScript implementations.

This repository is useful for learning about:
- Interactive terminal prompts and conditional questions.
- JavaScript ES modules and top-level `await`.
- TypeScript type annotations for prompt answers.
- Branching application flow and basic numeric comparisons.
- The difference between a user-interface simulation and a real financial transaction system.

> [!CAUTION]
> **This is not a banking application.** There is no bank connection, customer authentication, account ledger, persistent balance, transaction authorization, or secure PIN handling. Never enter a real banking ID, PIN, password, or financial information. Use fictional values only.

## Contents

| Path | Purpose |
|---|---|
| `atm.js` | JavaScript implementation using Inquirer |
| `atm.ts` | TypeScript implementation with a typed answer shape |
| `package.json` | npm metadata and Inquirer dependency |
| `package-lock.json` | Locked npm dependency graph |
| `tsconfig.json` | TypeScript compiler configuration |
| `docs/ARCHITECTURE.md` | Code organization and execution flow |
| `docs/TRANSACTION-FLOW.md` | Prompt branches and simulated transaction behavior |
| `docs/DEVELOPMENT.md` | Local setup and development workflow |
| `docs/TESTING.md` | Manual validation plan and test gaps |
| `docs/TROUBLESHOOTING.md` | Common setup and runtime problems |

## Requirements

- Node.js 18 or newer is recommended.
- npm compatible with the installed Node.js version.
- A terminal that supports interactive input.
- Internet access during initial dependency installation.

Check the installed versions:

```bash
node --version
npm --version
```

## Installation

Clone the repository and enter its directory:

```bash
git clone https://github.com/Brajesh31/AATM.git
cd AATM
npm ci
```

Use `npm ci` for reproducible installation from the committed lockfile. If the lockfile is intentionally changed, review the package changes and commit the updated lockfile with the manifest.

## Run the JavaScript implementation

```bash
node atm.js
```

The JavaScript entrypoint uses ES module syntax and top-level `await`, consistent with the package's `"type": "module"` setting.

## Run the TypeScript implementation

The TypeScript source is present, but TypeScript is not currently declared as a project development dependency. The CI workflow uses a temporary TypeScript CLI package for a no-output type check. For a local check:

```bash
npx --yes --package typescript tsc --noEmit
```

This command relies on the compiler configuration in `tsconfig.json`. A dedicated TypeScript dependency and explicit scripts would make the development environment more reproducible. Do not assume that the TypeScript file can be executed directly by Node.js without a TypeScript runtime or compilation step.

## How the program behaves

1. The prompt asks for a user ID.
2. It asks for a numeric PIN-like value.
3. It asks the user to select a current or savings account category.
4. It asks the user to choose a transaction path.
5. For fast cash, the prompt presents a fixed list of amounts.
6. For withdrawal, it asks for a manually entered amount.
7. The TypeScript version contains a demonstration calculation using a randomly generated balance.

The JavaScript and TypeScript versions are not identical. In particular, the TypeScript file includes a random balance calculation, while the JavaScript version currently ends after collecting prompt answers. The random value is not retrieved from a real account and must not be treated as a balance.

## Validation

Run the repository CI checks locally:

```bash
node --check atm.js
npx --yes --package typescript tsc --noEmit
```

Then manually exercise both entrypoints. Test every conditional prompt branch, valid and invalid numeric values, and Ctrl+C cancellation. A successful syntax check does not prove the prompt flow is correct.

## Current limitations and known technical debt

- No real identity or PIN verification exists.
- No real account balance is read or updated.
- The TypeScript balance is randomly generated for demonstration.
- The JavaScript and TypeScript implementations have behavioral differences.
- The JavaScript flow collects answers but does not perform a transaction calculation.
- Prompt answer keys include inconsistent spelling and whitespace in the current source.
- There is no automated unit-test suite.
- The npm test script is a placeholder that intentionally exits with an error.
- The package metadata still has a generic project name and an ISC license value, while this repository's root license file is MIT. Review package metadata separately if it is used for publishing.

These limitations are documented rather than silently hidden. Fixing them would require source changes and is outside a documentation-only update.

## Documentation map

- [Architecture](docs/ARCHITECTURE.md)
- [Transaction flow](docs/TRANSACTION-FLOW.md)
- [Development guide](docs/DEVELOPMENT.md)
- [Testing strategy](docs/TESTING.md)
- [Troubleshooting](docs/TROUBLESHOOTING.md)
- [Security policy](SECURITY.md)
- [Contribution guide](CONTRIBUTING.md)

## Contribution

Improvements should preserve the educational scope, use fictional data, and include tests or reproducible manual validation. Read [CONTRIBUTING.md](CONTRIBUTING.md) before opening a pull request.

Last updated: 2026-11-14 09:42 UTC
