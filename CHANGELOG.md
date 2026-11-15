# 📜 Changelog

All notable changes to AATM are documented here. This changelog records verified changes only. Proposed work belongs in the roadmap or GitHub issues, not under completed releases.

## 📚 Table of Contents

- [About this changelog](#-about-this-changelog)
- [Versioning policy](#-versioning-policy)
- [Unreleased](#-unreleased)
- [How to maintain this file](#-how-to-maintain-this-file)

## 🧭 About this changelog

AATM is an educational command-line ATM-flow simulation built with Node.js, Inquirer, JavaScript, and TypeScript. It is not a banking product and does not connect to financial institutions.

This file complements commit history. It should explain meaningful user-facing behaviour, important fixes, security changes, and contributor-facing maintenance work.

## 🔖 Versioning policy

The package currently identifies itself as `project02` version `1.0.0`. A formal release and semantic-versioning process has not been established. Do not infer that a Git commit is a published release.

When versioned releases are introduced:
- Use a documented versioning scheme.
- Explain breaking changes.
- Tag the exact commit represented by each release.
- Include installation and migration notes where required.
- Keep the package manifest and release notes consistent.

## 🚧 Unreleased

### Added
- Comprehensive project README with navigation, setup, usage, architecture, and simulation boundaries.
- Technical guides for architecture, development, testing, transaction flow, and troubleshooting.
- Repository policies for contributing, security, community conduct, and support.
- Root changelog and additional maintainer guidance.
- Repository hygiene guidance and Git ignore rules.

### Clarified
- JavaScript and TypeScript entrypoints are separate implementations and should be tested independently.
- The current program is a prompt-driven simulation, not a real ATM or financial service.
- The existing npm test command is a placeholder, not an automated test suite.
- Current CI performs syntax and TypeScript checks; it does not prove interactive correctness.

### Maintenance
- Documentation identifies the committed dependency directory as repository hygiene debt. It is not removed by this documentation change.
- Documentation identifies the hourly README timestamp workflow as noisy automation that should be reviewed separately.

## 🛠️ How to maintain this file

For each meaningful change, record:
- The date or release label when known.
- What changed.
- Why the change matters.
- Any action required from users or maintainers.
- Whether a change affects compatibility, security, or configuration.

Do not claim tests passed unless they were actually run. Do not list planned items as completed.
