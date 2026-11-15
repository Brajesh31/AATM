# 📚 AATM Technical Documentation

Welcome to the technical documentation for AATM. These guides describe the current command-line simulation, its prompt-driven execution flow, local development process, validation, and troubleshooting.

AATM is intentionally a small educational program. It is not a banking system and does not authenticate real users or perform financial transactions.

## 📑 Documentation Index

| Document | Purpose | Recommended reader |
|---|---|---|
| [Architecture](ARCHITECTURE.md) | System boundary, files, runtime, and code structure | Developers |
| [Development](DEVELOPMENT.md) | Requirements, installation, execution, and contribution workflow | New contributors |
| [Testing](TESTING.md) | Existing checks, manual test scenarios, and known test gaps | Contributors and reviewers |
| [Transaction Flow](TRANSACTION-FLOW.md) | Exact user journey, conditional branches, and answer properties | Anyone changing prompts |
| [Troubleshooting](TROUBLESHOOTING.md) | Common installation, runtime, prompt, and CI problems | All users |

## 🧭 How to Use This Documentation

### New to the repository?
Start with [Development](DEVELOPMENT.md). It covers the environment and the commands needed to run the JavaScript entrypoint and check the TypeScript source.

### Changing prompt behaviour?
Read [Transaction Flow](TRANSACTION-FLOW.md) before modifying the Inquirer prompt array. The prompt `name` properties determine the keys in the returned answer object, and the current source contains a known whitespace mismatch in the withdrawal amount field.

### Refactoring the application?
Read [Architecture](ARCHITECTURE.md). It explains the current process boundary and the differences between the JavaScript and TypeScript entrypoints.

### Validating a change?
Read [Testing](TESTING.md). The current repository has syntax and type checks, but no automated unit-test suite. Manual interactive validation remains important.

### Experiencing a problem?
Read [Troubleshooting](TROUBLESHOOTING.md) and include the relevant runtime and terminal details when reporting a reproducible issue.

## 🛡️ Safety Boundary

Use fictional values only. AATM does not connect to a bank, verify credentials, maintain a real balance, or authorize financial transactions. Do not enter personal or real banking data into the terminal.

## 🔄 Documentation Maintenance

Documentation should describe the implementation that actually exists. When code changes:
1. Update the relevant guide in the same contribution.
2. Verify prompt names and answer keys against source.
3. Update examples and command instructions.
4. Keep JavaScript and TypeScript differences explicit.
5. Record newly discovered limitations.
6. Do not describe proposed features as already implemented.

The source files and workflows remain the authoritative references for exact runtime behaviour.
