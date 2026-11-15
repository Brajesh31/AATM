# 📚 AATM Technical Documentation

Welcome to the technical documentation for AATM. These guides describe the current command-line ATM simulation, its prompt-driven execution flow, development environment, validation process, and common troubleshooting procedures.

AATM is a small educational terminal program. It is not connected to a bank, does not authenticate real customers, and does not execute financial transactions. Use fictional values only.

## 📑 Documentation Index

| Document | Purpose | Recommended reader |
|---|---|---|
| [🏗️ Architecture](ARCHITECTURE.md) | Program boundary, repository structure, dependencies, runtime, and data flow | Developers |
| [🧑‍💻 Development](DEVELOPMENT.md) | Requirements, installation, execution, prompt modification, and local workflow | New contributors |
| [🧪 Testing](TESTING.md) | Existing checks, manual test scenarios, known gaps, and future strategy | Contributors and reviewers |
| [🔀 Transaction Flow](TRANSACTION-FLOW.md) | Prompt sequence, conditional branches, answer object, and implementation differences | Anyone changing prompt logic |
| [🧯 Troubleshooting](TROUBLESHOOTING.md) | Installation, module, terminal, prompt, TypeScript, and CI issues | All users |

## 🧭 Where Should I Start?

### New to the repository?
Start with [Development](DEVELOPMENT.md). It explains the environment, installation, JavaScript execution, TypeScript validation, and local development process.

### Changing a prompt or transaction path?
Read [Transaction Flow](TRANSACTION-FLOW.md) first. Inquirer uses the exact prompt `name` as a property key in its returned answer object. The current source has a known whitespace mismatch in the withdrawal amount field.

### Refactoring the program?
Read [Architecture](ARCHITECTURE.md). It explains why AATM is a local, single-process CLI, how the entrypoints differ, and where prompt collection ends.

### Validating a code change?
Read [Testing](TESTING.md). The repository currently has a JavaScript syntax check and a TypeScript no-emit check, but no working automated unit-test suite.

### Experiencing a problem?
Read [Troubleshooting](TROUBLESHOOTING.md). Include the exact command, environment, and sanitized error output when reporting a reproducible issue.

## 🛡️ Safety Boundary

AATM is an educational simulation. It does not connect to a bank, verify credentials, read a real balance, authorize withdrawals, persist transactions, or securely store PINs. Never enter real banking IDs, PINs, account numbers, passwords, or financial information.

## 🧱 Current Technical Facts

- `atm.js` collects the Inquirer prompt answers and then ends.
- `atm.ts` includes a demonstration calculation using a randomly generated integer.
- The generated integer is not an account balance.
- The withdrawal amount prompt has a trailing-space answer key in the current source.
- The package's `test` script is a placeholder that exits with an error.
- CI validates JavaScript syntax and TypeScript types, not interactive terminal behaviour.
- The project does not define a first-party server, database, bank integration, or transaction ledger.

These facts affect how the project should be extended and tested. Documentation should not imply that the simulation has capabilities it does not implement.

## 🔄 Documentation Maintenance

When source code changes:
1. Update the guide that explains the affected behaviour.
2. Verify prompt names and answer keys against the source.
3. Update examples and commands.
4. Keep JavaScript and TypeScript differences explicit.
5. Record newly discovered limitations.
6. Add tests where a real test suite exists or is introduced.
7. Do not report tests as passing unless they were executed.

Source files, package configuration, and workflow definitions remain the authoritative references for exact implementation details.
