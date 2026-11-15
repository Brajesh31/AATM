# 🗺️ AATM Project Roadmap

This roadmap separates current behaviour from possible future work. Items listed here are proposals, not implemented features or delivery commitments.

## 📚 Table of Contents

- [Current Baseline](#-current-baseline)
- [Priority 1: Correctness](#-priority-1-correctness)
- [Priority 2: Interactive Experience](#-priority-2-interactive-experience)
- [Priority 3: Testing](#-priority-3-testing)
- [Priority 4: Maintainability](#-priority-4-maintainability)
- [Future Learning Extensions](#-future-learning-extensions)
- [How to Propose Work](#-how-to-propose-work)

## 📍 Current Baseline

AATM currently contains separate JavaScript and TypeScript CLI entrypoints using Inquirer. The project collects fictional identity-like values, a PIN-like numeric value, account category, transaction type, and conditional amount input.

It is not connected to a bank, does not persist accounts, and does not perform real transactions.

## 🥇 Priority 1: Correctness

- [ ] Normalize inconsistent prompt answer keys, including the manual withdrawal key with trailing whitespace.
- [ ] Use consistent naming for prompt properties and transaction types.
- [ ] Validate positive numeric amounts.
- [ ] Handle cancellation and unexpected answers cleanly.
- [ ] Keep JavaScript and TypeScript behaviour aligned.
- [ ] Remove misleading output that could be interpreted as a real account balance.

## 🥈 Priority 2: Interactive Experience

- [ ] Add a clear welcome and exit message.
- [ ] Add a confirmation step for the simulated transaction.
- [ ] Improve validation messages.
- [ ] Make it obvious which values are examples.
- [ ] Provide a repeat-session option without suggesting real account persistence.

## 🥉 Priority 3: Testing

- [ ] Replace the placeholder npm test script with a real test suite.
- [ ] Extract pure amount-validation logic for deterministic testing.
- [ ] Cover prompt branching and answer-key consistency.
- [ ] Add tests for invalid, zero, negative, and non-numeric values.
- [ ] Add automated checks for both entrypoints.
- [ ] Keep external or interactive prompts out of unit tests where possible.

## 🧰 Priority 4: Maintainability

- [ ] Stop tracking installed dependencies and retain the lockfile.
- [ ] Review the README timestamp automation to reduce unnecessary commits.
- [ ] Add a root ignore file.
- [ ] Align package name, description, author, and licence metadata.
- [ ] Add a documented Node.js support range.
- [ ] Keep documentation links and repository templates synchronized.

## 🌱 Future Learning Extensions

Potential educational exercises, not commitments:
- A mock account object held only in memory.
- A deposit branch that clearly remains simulated.
- A transaction history shown only during one process run.
- A menu loop for multiple simulated operations.
- A small testable transaction calculator.
- A comparison of JavaScript and TypeScript type safety.

Any future extension must remain fictional unless the project is deliberately redesigned with professional security, legal, compliance, and financial-system review.

## 💡 How to Propose Work

Open a feature request with:
- The problem being solved.
- Expected user-visible behaviour.
- Why the change fits the learning objective.
- Affected entrypoint(s).
- Validation plan.
- Security or privacy implications.

See [CONTRIBUTING.md](../CONTRIBUTING.md) before submitting code.
