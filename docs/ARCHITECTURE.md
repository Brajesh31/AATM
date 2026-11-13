# AATM Architecture and Code Walkthrough

## 1. System boundary

AATM is a local, single-process command-line exercise. It has no HTTP server, database, external financial service, user directory, or transaction ledger. The only external runtime library used for the interactive experience is Inquirer.

The most important architectural distinction is that the program collects input and demonstrates branching logic. It does not authenticate a customer or execute a financial transaction.

## 2. Repository structure

| File | Responsibility |
|---|---|
| `atm.js` | JavaScript prompt sequence |
| `atm.ts` | TypeScript prompt sequence and demonstration balance calculation |
| `package.json` | Project metadata and dependency declarations |
| `package-lock.json` | Exact npm dependency resolution |
| `tsconfig.json` | TypeScript compiler options |
| `.github/workflows/ci.yml` | Automated syntax and type validation |

The `atm` path in the repository is an existing tracked file. Its purpose and generation process should be confirmed before it is treated as a maintained executable artifact.

## 3. Runtime dependencies

### Inquirer

Both implementations import Inquirer and use its prompt API to display input, number, and list questions. Prompt definitions include:
- A question type.
- A stable answer name.
- A message shown to the user.
- Choices for list questions.
- Conditional `when` functions for questions that should appear only after a previous answer.

Inquirer gathers the values into an answer object. The application then reads fields from that object.

### Node.js module behavior

The package declares `"type": "module"`, so `atm.js` is interpreted as an ES module. It uses `import` rather than CommonJS `require`. Top-level `await` is supported by modern Node.js in ES modules.

## 4. JavaScript flow

The JavaScript entrypoint defines the prompt array and awaits the result. The prompt sequence asks for an identifier, a PIN-like number, account category, transaction type, and an amount based on the selected transaction.

The source currently has no active transaction calculation after the prompt call. A commented section contains an earlier random-balance idea, but comments are not executable behavior. Therefore the JavaScript version should be described as an input-collection demonstration.

## 5. TypeScript flow

The TypeScript entrypoint declares an `anstype` shape for the expected answers and awaits the prompt response. It then generates a random number and compares the entered amount to that number.

This is a demonstration of a conditional calculation, not an account-balance check. Randomness makes the displayed amount unpredictable and does not represent money held by a user.

The type shape and prompt answer names need to remain aligned. If the prompt definitions change, update the type and verify every possible branch. Optional fields should be represented explicitly when a prompt is conditional.

## 6. Data flow

```text
Terminal input
    |
    v
Inquirer prompt definitions
    |
    v
Answer object
    |
    +--> Account selection controls transaction prompt
    |
    +--> Transaction selection controls amount prompt
    |
    v
JavaScript: prompt collection ends
TypeScript: demo random-balance comparison
```

No information is sent to a remote service or persisted to a database.

## 7. Architectural constraints

- Prompt collection and business logic are currently coupled in the entrypoint.
- There is no reusable account or transaction domain model.
- There is no validation layer beyond the prompt types and choices.
- There is no persistence boundary.
- There is no authentication boundary.
- There is no logging or audit history.
- The two language implementations can drift because they duplicate the flow.

For a larger educational exercise, separate prompt construction, input validation, and pure calculation functions. Such a refactor is a source-code change and should be delivered independently from documentation work.

## 8. Safe extension boundaries

A safe learning-oriented extension could add pure functions that validate a positive withdrawal amount or calculate a remaining mock balance from explicitly supplied test data. Keep such logic clearly labelled as simulated. Do not add real account credentials, real PINs, or financial service integration without a formal security, privacy, and compliance design.
