# Troubleshooting

## `Cannot find package 'inquirer'`

Run `npm ci` from the repository root. Confirm that installation completed and that the terminal is in the AATM project directory.

## `Cannot use import statement outside a module`

Check that the package manifest still declares `"type": "module"` and that the file is executed with a supported Node.js version. Do not run the ES module file through a CommonJS-only loader.

## Terminal prompts do not render correctly

Use a real interactive terminal rather than a non-interactive output panel. Some IDE task runners and CI environments do not provide a TTY for interactive prompts. CI should validate syntax and types, not attempt to answer the prompts.

## TypeScript compiler is missing

The repository does not currently install TypeScript as a normal project dependency. Use:

```bash
npx --yes --package typescript tsc --noEmit
```

For repeatable local development, add TypeScript to the project's development dependencies in a separate package maintenance change.

## Prompt value appears missing

Check the `name` property of the Inquirer question. The answer object uses that exact key. Leading/trailing spaces and spelling differences create different property names. The current implementations have a known mismatch around the withdrawal amount key.

## JavaScript and TypeScript produce different results

This is a known current limitation. The JavaScript version stops after prompt collection, while the TypeScript version includes a random-balance demonstration. Do not assume one is a compiled copy of the other.

## CI fails

Inspect the failing step in the GitHub Actions run. A successful JavaScript syntax check does not imply the TypeScript check passed, and neither check verifies interactive behavior. Include the exact error and Node.js version when reporting a failure.
