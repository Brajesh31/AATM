# Prompt Flow and Simulated Transaction Rules

## 1. Purpose

This document describes the currently visible prompt branches in `atm.js` and `atm.ts`. It is a code walkthrough, not a description of a real ATM protocol.

## 2. Input sequence

The application asks for:
1. `userId`: a text identifier.
2. `userpin`: a numeric PIN-like value.
3. `accounttype`: one of `current` or `saving`.
4. `transcationtype`: one of `withdraw` or `fast cash`.
5. An amount prompt whose visibility depends on the transaction type.

The account selection is used as a condition for showing the transaction question. It does not select a real account record.

## 3. Conditional amount selection

### Fast cash

The fast-cash question presents a fixed list of values: 1444, 2000, 4000000, and 10000. These are hard-coded prompt choices. They are not loaded from a bank, configured by a user, or validated against an account balance.

### Withdrawal

The withdrawal branch asks for a numeric amount. A robust implementation should validate that the amount is present, finite, positive, and within a configured demonstration limit. The current source does not provide a complete domain validation layer.

## 4. TypeScript demonstration calculation

After prompts complete, the TypeScript implementation checks whether the identifier and PIN-like input are truthy. It generates a random integer and compares the selected amount against that number. If the random value is greater than or equal to the requested amount, it prints a remaining amount. Otherwise it prints an insufficient-balance message.

This is deliberately not a financial balance calculation. The random value:
- Is not associated with the entered user ID.
- Is not read from an account.
- Is not protected against tampering.
- Is not persisted.
- Does not reserve or debit money.
- Does not create a transaction record.

The same program run can produce different values for the same inputs.

## 5. JavaScript and TypeScript differences

The JavaScript implementation currently gathers answers but does not execute the active balance calculation. The TypeScript implementation contains the random-number demonstration. A user should not expect the two entrypoints to produce the same output.

The prompt answer property for withdrawal also differs in whitespace between the implementations. This can cause the entered amount to be stored under a different key than the TypeScript answer type expects. Resolve the naming inconsistency in source code before relying on typed transaction values.

## 6. Example test scenarios

Use fictional identifiers and values only.

| Scenario | Expected prompt behavior |
|---|---|
| Choose current account | Transaction prompt appears |
| Choose savings account | Transaction prompt appears |
| Choose fast cash | Preset amount choices appear |
| Choose withdrawal | Numeric amount prompt appears |
| Cancel with Ctrl+C | Program exits or reports cancellation according to Inquirer behavior |
| Enter zero or negative amount | Current source does not provide a complete business validation guarantee |
| Enter a very large amount | Current source does not enforce a meaningful configured limit |

## 7. What a real transaction system would require

A production banking workflow would require server-side identity verification, multi-factor authentication, account authorization, authoritative balance reads, atomic debit operations, idempotency keys, transaction limits, fraud detection, immutable audit trails, reconciliation, encryption, operational monitoring, and regulatory review. None of those systems are part of this repository.
