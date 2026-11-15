# 🧰 Maintainer Guide

This document defines a practical maintenance routine for AATM. It supplements the contributor, security, support, and development guides.

## 📚 Table of Contents

- [Maintainer Responsibilities](#-maintainer-responsibilities)
- [Repository Boundaries](#-repository-boundaries)
- [Issue Triage](#-issue-triage)
- [Change Review](#-change-review)
- [Release Preparation](#-release-preparation)
- [Workflow Maintenance](#-workflow-maintenance)
- [Dependency Maintenance](#-dependency-maintenance)
- [Security Response](#-security-response)
- [Repository Hygiene](#-repository-hygiene)
- [Routine Checklist](#-routine-checklist)

## 🎯 Maintainer Responsibilities

Maintainers are responsible for keeping the repository understandable, safe to contribute to, and honest about what the program can do.

Core responsibilities:
- Review changes for correctness and scope.
- Preserve the project's educational focus.
- Prevent accidental claims that the project performs real banking operations.
- Keep setup instructions aligned with the package manifest.
- Review dependency and workflow changes.
- Protect private security reports.
- Keep documentation and issue templates accurate.
- Avoid merging changes that include credentials or personal financial data.

## 🧱 Repository Boundaries

AATM is currently a local Node.js CLI project. Its core boundary is intentionally small:
- `atm.js` is the JavaScript entrypoint.
- `atm.ts` is the TypeScript entrypoint.
- Inquirer provides interactive terminal prompts.
- npm manages dependencies.
- GitHub Actions runs repository validation and README timestamp automation.

Do not describe a backend, database, bank integration, production account ledger, or secure authentication system unless one is actually implemented and reviewed.

## 🔎 Issue Triage

For every new issue:
1. Confirm that it applies to the current repository.
2. Search for duplicates.
3. Identify whether it is a bug, enhancement, documentation issue, or security concern.
4. Request a minimal reproduction using fictional input only.
5. Check whether the issue changes JavaScript, TypeScript, or both.
6. Add an appropriate label and milestone when the repository uses them.
7. Close duplicates with a link to the canonical issue.

Never ask a reporter to post real account numbers, PINs, card information, passwords, or personal financial data.

## ✅ Change Review

Review changes for:
- Correct Inquirer prompt types and answer names.
- Consistent conditional prompt behaviour.
- Safe handling of cancellation and invalid values.
- Correct TypeScript declarations.
- JavaScript and TypeScript parity where parity is intended.
- Clear output and useful error messages.
- No secrets or private data.
- Updated documentation and examples.
- Passing CI checks and relevant manual validation.

A green syntax check is not proof that an interactive flow works.

## 🚀 Release Preparation

Before publishing or tagging a release:
- Inspect the full diff.
- Confirm the package name, version, and licence metadata.
- Run `npm ci`.
- Run the documented JavaScript and TypeScript checks.
- Manually execute both entrypoints with fictional values.
- Verify cancellation, invalid input, and conditional branches.
- Review open security reports and known limitations.
- Update `CHANGELOG.md`.
- Confirm the release notes do not overstate functionality.
- Tag the exact reviewed commit.

No release should be described as production banking software.

## ⚙️ Workflow Maintenance

The repository contains:
- A CI workflow for dependency installation, JavaScript syntax validation, and TypeScript compilation.
- A README timestamp workflow that writes to the default branch after pushes and on an hourly schedule.

Review workflow permissions whenever a workflow changes. Use read-only permissions by default. Write permissions should be limited to the exact workflow that requires them.

The timestamp workflow can create frequent repository noise and may retrigger itself after a README commit. Consider replacing it with a manual or release-triggered update. Do not assume workflow changes are harmless simply because the workflow edits documentation.

## 📦 Dependency Maintenance

- Keep `package-lock.json` synchronized with `package.json`.
- Use `npm ci` to validate clean installs.
- Review major dependency upgrades separately.
- Inspect advisories and changelogs before upgrading.
- Avoid adding packages for trivial operations.
- Never commit `node_modules/`; commit the manifest and lockfile instead.

## 🔐 Security Response

Follow [SECURITY.md](SECURITY.md) for private vulnerability reports. If a credential or sensitive value is committed:
1. Treat it as compromised.
2. Revoke or rotate it at the relevant provider.
3. Remove it from active code.
4. Review relevant history and deployments.
5. Notify affected parties when appropriate.
6. Record the remediation without repeating the secret.

Do not wait for a public issue to respond to a possible credential exposure.

## 🧹 Repository Hygiene

Keep the root directory focused. Avoid committing:
- Installed dependency folders.
- IDE caches and local workspace state.
- Build outputs and temporary files.
- Personal notes or machine-specific configuration.
- Real user data or screenshots containing secrets.

A root `.gitignore` helps prevent future additions but does not remove files already tracked by Git.

## 📋 Routine Checklist

- [ ] Review open issues and pull requests.
- [ ] Check recent Actions runs.
- [ ] Verify package and lockfile consistency.
- [ ] Check dependency advisories.
- [ ] Confirm setup instructions still work.
- [ ] Review documentation links.
- [ ] Check that examples use fictional values.
- [ ] Confirm no secret is present in new diffs.
- [ ] Update changelog for meaningful changes.
