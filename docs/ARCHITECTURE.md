# Architecture

The project is a small Node.js CLI with two parallel entrypoints:

- `atm.js`: JavaScript ES module using Inquirer.
- `atm.ts`: TypeScript implementation of a similar prompt sequence.
- `package.json`: declares Inquirer and Node type declarations.
- `tsconfig.json`: TypeScript compiler configuration.

There is no backend, database, bank integration, or persistent transaction store. The current design is a single-process prompt flow and should be treated as a learning exercise.
