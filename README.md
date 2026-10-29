# AATM

AATM is a TypeScript/Node.js command-line project built around interactive terminal prompts. The repository contains TypeScript source files, an Inquirer dependency, and Node.js type definitions.

## Requirements

- Node.js 18 or newer
- npm
- TypeScript tooling compatible with the project configuration

## Setup

```powershell
npm ci
```

The package currently exposes the source entrypoints directly and does not define a production build or test script. Run the intended TypeScript entrypoint with your configured TypeScript runner, or add a project-specific build script before distributing compiled output.

## Project files

- `atm.ts` contains the TypeScript implementation.
- `atm.js` contains the JavaScript entrypoint or generated counterpart.
- `tsconfig.json` contains the TypeScript compiler configuration.
- `package.json` defines the Inquirer dependency and development metadata.

## Development guidance

Keep interactive prompts resilient to cancellation and invalid input. Avoid printing credentials, private data, or full environment contents. If this project becomes a published CLI, add explicit `build`, `start`, and automated `test` scripts and document the command-line interface.

## Validation

Review the TypeScript configuration and run a type check before submitting changes. Because TypeScript is not currently listed in `devDependencies`, use a temporary CLI package or add TypeScript to the project toolchain:

```powershell
npx --package typescript tsc --noEmit
```

Manually exercise each prompt path, including cancellation and unexpected input.

Last updated: 2026-10-29 22:17 UTC
