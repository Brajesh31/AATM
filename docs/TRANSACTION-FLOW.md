# 🔀 AATM Transaction Flow and Prompt Behaviour

This document describes the prompt sequence and conditional branches in the current AATM source. It is a reference for developers who need to understand how Inquirer displays questions, how answer values are named, and what each entrypoint does after prompt collection.

The word **transaction** means an ATM-style simulation only. No real withdrawal, deposit, balance lookup, authorization, or banking request occurs.

> [!CAUTION]
> Use fictional values only. AATM is not connected to a bank and does not protect or verify real credentials.

## 📚 Table of Contents

- [🎯 Purpose](#-purpose)
- [🧭 Flow Overview](#-flow-overview)
- [📝 Prompt Sequence](#-prompt-sequence)
- [1️⃣ User Identifier](#1️⃣-user-identifier)
- [2️⃣ PIN-Like Input](#2️⃣-pin-like-input)
- [3️⃣ Account Category](#3️⃣-account-category)
- [4️⃣ Transaction Type](#4️⃣-transaction-type)
- [5️⃣ Fast-Cash Amount](#5️⃣-fast-cash-amount)
- [6️⃣ Withdrawal Amount](#6️⃣-withdrawal-amount)
- [🧾 Answer Object](#-answer-object)
- [🟨 JavaScript Behaviour](#-javascript-behaviour)
- [🔷 TypeScript Behaviour](#-typescript-behaviour)
- [⚠️ Known Answer-Key Mismatch](#️-known-answer-key-mismatch)
- [🛑 Cancellation and Edge Cases](#-cancellation-and-edge-cases)
- [🧪 Manual Test Matrix](#-manual-test-matrix)
- [💡 Safe Extension Ideas](#-safe-extension-ideas)

## 🎯 Purpose

This guide makes the prompt flow explicit so that changes can be reviewed against the actual implementation. It is especially important because the JavaScript and TypeScript files define similar prompts but do not have identical post-prompt behaviour.

## 🧭 Flow Overview

```text
START
  |
  v
Enter fictional user ID
  |
  v
Enter fictional PIN-like value
  |
  v
Select account category
  |
  v
Select transaction type
  |
  +-----------------------------+
  |                             |
  v                             v
FAST CASH                    WITHDRAWAL
  |                             |
  v                             v
Choose preset amount        Enter numeric amount
  |                             |
  +--------------+--------------+
                 |
                 v
          Prompt collection
                 |
          +------+------+
          |             |
          v             v
        atm.js        atm.ts
    collection ends   random-value
                      demonstration
```

## 📝 Prompt Sequence

| Order | Purpose | Prompt style | Conditional display |
|---:|---|---|---|
| 1 | User ID-like value | Input | Always |
| 2 | PIN-like numeric value | Number | Always |
| 3 | Account category | List | Always |
| 4 | Transaction type | List | Conditional on account answer |
| 5A | Fast-cash amount | List | When transaction is fast cash |
| 5B | Withdrawal amount | Number | When transaction is withdrawal |

Current list values:
- Account categories: `current`, `saving`.
- Transaction types: `withdraw`, `fast cash`.
- Fast-cash amount values: `1444`, `2000`, `4000000`, `10000`.

These are prompt options defined in source code, not bank-approved options or transaction limits.

## 1️⃣ User Identifier

The first prompt collects an input value under the key `userId`.

It is not checked against a user directory and does not authenticate the visitor. It is only a sample value to make the CLI resemble an ATM journey.

Use an obviously fictional value such as `demo-user`. Do not enter a real bank login or personal account reference.

## 2️⃣ PIN-Like Input

The second prompt collects a numeric value under `userpin`.

The value is not:
- Verified against a secure credential store.
- Hashed or encrypted by the application.
- Used to unlock a real account.
- Protected as a secret.
- Suitable for storing a real PIN.

It is a prompt exercise only. Use a fictional numeric example.

## 3️⃣ Account Category

The account prompt presents two choices:
- `current`
- `saving`

The selected answer is stored under `accounttype`. It does not represent a real account and does not change access to money.

## 4️⃣ Transaction Type

The transaction prompt presents:
- `withdraw`
- `fast cash`

The current source uses the answer key `transcationtype`. Its spelling is intentionally documented as it appears in the code. Renaming it is a source-code change and should be applied consistently across both implementations and the documentation.

The prompt has a `when` callback that checks whether an account answer is present. The callback controls whether the question is displayed.

## 5️⃣ Fast-Cash Amount

When `transcationtype` is `fast cash`, Inquirer displays a fixed list:

| Choice | Value |
|---:|---:|
| 1 | 1444 |
| 2 | 2000 |
| 3 | 4000000 |
| 4 | 10000 |

The prompt uses the answer key `amount`. The value selected by the visitor is added to the answer object under that key.

The values are hard-coded educational examples. They do not represent actual currency policy, cash machine denominations, bank limits, or recommended withdrawals.

## 6️⃣ Withdrawal Amount

When `transcationtype` is `withdraw`, Inquirer displays a numeric prompt so the visitor can enter a manual amount.

The current source sets the prompt name to `amount ` with a trailing space. This is different from the fast-cash answer key `amount`.

Because answer property names are exact, the returned object may contain a property named `"amount "` rather than `amount`. This matters when the TypeScript implementation later reads `answer.amount`.

This is a known source-code issue. It is documented rather than silently changed as part of documentation work.

## 🧾 Answer Object

Inquirer returns an object with keys based on the exact `name` values of prompts that were actually displayed.

A conceptual fast-cash result might look like:

```js
{
  userId: "demo-user",
  userpin: 1234,
  accounttype: "current",
  transcationtype: "fast cash",
  amount: 2000
}
```

A conceptual withdrawal result in the current source may use the trailing-space key:

```js
{
  userId: "demo-user",
  userpin: 1234,
  accounttype: "saving",
  transcationtype: "withdraw",
  "amount ": 1000
}
```

These examples illustrate key names; they are not captured output from an executed test. They use fictional values only.

Conditional prompts also mean that not every answer property is necessarily present in every run. A TypeScript type should represent that conditional shape accurately.

## 🟨 JavaScript Behaviour

The JavaScript entrypoint awaits the Inquirer prompt call and stores the returned value. The active file currently ends after prompt collection.

A previous random-number comparison exists only as commented-out code. Commented code does not execute. Therefore the JavaScript implementation currently does not:
- Generate and print an active random value.
- Calculate a remaining demonstration value.
- Print an insufficient-balance message.

It is an interactive prompt-collection demonstration.

## 🔷 TypeScript Behaviour

The TypeScript entrypoint declares an answer type and then checks whether the ID and PIN-like input are truthy.

It then:
1. Generates a random integer.
2. Prints the random value.
3. Reads `answer.amount`.
4. Compares the amount with the generated value.
5. Prints a remaining-value message or an insufficient-value message.

The generated number is not retrieved from an account. It is not persistent, authoritative, or associated with a user. It must not be described as a real balance.

The TypeScript type currently declares the amount as required, while the prompt sequence collects amount conditionally. The trailing-space withdrawal key also makes the declared shape unreliable for that branch.

## ⚠️ Known Answer-Key Mismatch

The fast-cash prompt uses `name: "amount"` and the withdrawal prompt uses `name: "amount "`.

These are different JavaScript properties:

```js
answers.amount
answers["amount "]
```

A read of `answer.amount` may not retrieve a manually entered withdrawal amount.

If the source is updated later:
- Align the answer key in both `atm.js` and `atm.ts`.
- Update the TypeScript result shape.
- Check whether the amount field is optional or branch-specific.
- Add a regression test for both transaction paths.
- Update this document and the README.

## 🛑 Cancellation and Edge Cases

The current source does not provide a comprehensive cancellation or input-validation layer. Useful cases to inspect include:
- Empty user identifier.
- Zero PIN-like input.
- Zero amount.
- Negative amount.
- Decimal amount.
- Extremely large amount.
- Non-numeric terminal input.
- Ctrl+C at each prompt.
- A conditional prompt being skipped.
- A result object with no amount property.

A number prompt should not be described as enforcing business rules or financial authorization.

## 🧪 Manual Test Matrix

| Test ID | Scenario | Expected observation |
|---|---|---|
| FLOW-01 | Choose current | Account value is collected |
| FLOW-02 | Choose saving | Account value is collected |
| FLOW-03 | Choose withdrawal | Manual amount prompt appears |
| FLOW-04 | Choose fast cash | Preset list appears |
| FLOW-05 | Choose each preset | Selected amount is collected |
| FLOW-06 | Inspect withdrawal answer | Trailing-space key is identified |
| FLOW-07 | Run JavaScript | Prompt collection ends |
| FLOW-08 | Type-check TypeScript | Configured compiler command completes |
| FLOW-09 | Cancel at a prompt | Exit behaviour is observed |

All tests must use fictional values.

## 💡 Safe Extension Ideas

As a learning exercise, future source changes could:
- Align answer names.
- Model branch-specific answer types accurately.
- Add positive-number validation.
- Extract pure mock calculation functions.
- Add test cases for those pure functions.
- Handle cancellation explicitly.
- Provide deterministic demo data instead of a random number.

These ideas do not turn the project into a real banking application. Real financial operations require an entirely different architecture, security boundary, authorization model, persistence, audit controls, and compliance process.
