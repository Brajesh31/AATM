# Testing Strategy

## 1. Current test coverage

There is no dedicated automated unit-test suite in the repository. The package's `npm test` command is a placeholder that exits with an error. The CI workflow performs syntax and TypeScript compiler checks; it does not prove that every interactive path behaves correctly.

## 2. Automated checks

Run:

```bash
node --check atm.js
npx --yes --package typescript tsc --noEmit
```

The JavaScript check validates parsing. The TypeScript check validates the configured TypeScript project without writing compiled output. Neither check tests the human interaction flow.

## 3. Manual prompt matrix

| Test | Action | What to verify |
|---|---|---|
| Start | Run `node atm.js` | Prompt UI opens without module errors |
| Identifier | Enter a fictional ID | Value is accepted as text |
| PIN-like value | Enter a fictional numeric value | Numeric prompt accepts the value |
| Account current | Select current | Transaction selection appears |
| Account savings | Select savings | Transaction selection appears |
| Fast cash | Select fast cash | Preset choices appear |
| Withdrawal | Select withdrawal | Manual amount prompt appears |
| Cancellation | Press Ctrl+C at each prompt | Exit behavior is understandable and does not leave a hung process |
| Invalid numeric input | Try non-numeric or out-of-range values where possible | Validation gaps are recorded |
| TypeScript run | Run through a configured TypeScript runner | The typed flow compiles and executes as expected |

## 4. JavaScript and TypeScript parity

Run both entrypoints with the same fictional prompt choices. Compare:
- Which questions appear.
- The answer keys used for each prompt.
- Whether a calculation is executed.
- The output after the final prompt.

At present, the JavaScript and TypeScript implementations are not behaviorally equivalent. Record that difference in any issue or pull request that changes one implementation.

## 5. Future unit-test targets

If calculation logic is extracted into pure functions, add tests for:
- Positive amount acceptance.
- Zero and negative amount rejection.
- Non-finite numeric values.
- Amounts exceeding a configured demonstration limit.
- Remaining-balance calculation.
- Missing or undefined conditional answers.

Do not use real financial values or credentials in test fixtures.
