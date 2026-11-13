# Development Guide

## 1. Development environment

Recommended baseline:
- Node.js 18 or newer.
- npm.
- A terminal with interactive input support.
- Git for version control.

Check versions:

```bash
node --version
npm --version
git --version
```

## 2. Clone and install

```bash
git clone https://github.com/Brajesh31/AATM.git
cd AATM
npm ci
```

If `npm ci` fails, compare `package.json` and `package-lock.json`. Do not delete the lockfile as a first troubleshooting step. Determine whether the manifest was changed without regenerating the lock.

## 3. Run JavaScript

```bash
node atm.js
```

The package uses ES module mode. Running the file from the repository root is recommended so Node resolves the project's installed dependencies.

## 4. TypeScript validation

The repository includes `atm.ts` and `tsconfig.json`, but does not currently declare the TypeScript compiler in `devDependencies`. The current CI obtains TypeScript through npx:

```bash
npx --yes --package typescript tsc --noEmit
```

For long-term maintainability, add TypeScript as an explicit development dependency and define documented scripts such as `typecheck`. That would change package metadata and should include a lockfile update.

## 5. Editing prompt definitions

When adding or changing a question:
1. Choose a stable answer key with no leading or trailing whitespace.
2. Decide whether the question is always shown or conditional.
3. Ensure the condition references a prior answer key that actually exists.
4. Define allowed choices where a finite list is appropriate.
5. Validate numeric values beyond simply asking Inquirer for a number.
6. Update the TypeScript answer shape for optional conditional fields.
7. Test every branch manually.

Do not store real credentials in source files, test fixtures, terminal recordings, or issue reports.

## 6. Recommended separation for future refactoring

A future maintainable design could separate:
- Prompt definitions.
- Input normalization and validation.
- Pure demonstration calculations.
- Terminal output formatting.

Keep calculations pure where possible so they can be tested without interactive terminal sessions. This is a suggested future structure, not a description of the current code.

## 7. Current package scripts

The package currently defines a placeholder `test` script that exits with an error. Do not interpret that as a working test suite. The CI workflow instead checks JavaScript syntax and TypeScript compilation without emitting files.

## 8. Before opening a pull request

- Run `node --check atm.js`.
- Run the TypeScript no-emit check.
- Exercise fast-cash and withdrawal branches.
- Check cancellation behavior.
- Confirm JavaScript and TypeScript behavior differences are documented.
- Ensure no real banking data or secrets are included.
