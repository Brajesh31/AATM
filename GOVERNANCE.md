# 🏛️ Project Governance

This document explains how decisions and contributions are handled in AATM. It is designed to make expectations visible and predictable for contributors.

## 📚 Table of Contents

- [Project Purpose](#-project-purpose)
- [Current Maintainer Model](#-current-maintainer-model)
- [Decision Principles](#-decision-principles)
- [Contribution Lifecycle](#-contribution-lifecycle)
- [Review and Approval](#-review-and-approval)
- [Disagreements](#-disagreements)
- [Security Decisions](#-security-decisions)
- [Changes to Governance](#-changes-to-governance)

## 🎯 Project Purpose

AATM is an educational command-line simulation demonstrating prompt-driven interaction and basic transaction-style branching. It is not a financial service.

Governance exists to keep project decisions aligned with that purpose while allowing the repository to improve.

## 👥 Current Maintainer Model

The repository is maintained by its owner, with contributions accepted through the normal GitHub workflow. This document does not establish a formal foundation, committee, election process, or guaranteed review team.

Maintainer responsibilities include triage, review, release decisions, security handling, and repository administration.

## 🧭 Decision Principles

Project decisions should prioritize:
1. Correctness and clarity.
2. Safety and honest product boundaries.
3. Simplicity suitable for an educational CLI.
4. Accessibility to learners.
5. Maintainability over unnecessary dependencies.
6. Evidence from reproducible behaviour.
7. Documentation that matches implementation.

## 🔄 Contribution Lifecycle

A typical change moves through:
1. Problem description in an issue or discussion.
2. Scope agreement where the change is substantial.
3. Implementation in a focused branch.
4. Validation using CI and relevant manual checks.
5. Review of code, documentation, and security impact.
6. Merge by an authorized maintainer.
7. Changelog update for meaningful changes.

Small documentation corrections may use a shorter process when the scope is clear.

## ✅ Review and Approval

A review should consider behaviour, maintainability, tests, documentation, and security. Passing CI is necessary where applicable but does not automatically mean a change should be merged.

The maintainer may request revisions, defer work, or close proposals that are out of scope, unsafe, unsupported, or insufficiently explained.

## 💬 Disagreements

Discuss technical issues respectfully and focus on evidence. Where possible, compare alternatives using complexity, user impact, compatibility, and maintenance cost.

The Code of Conduct applies to all project-managed collaboration spaces.

## 🔐 Security Decisions

Security reports must follow [SECURITY.md](SECURITY.md), not public issue disclosure. Maintainers may restrict discussion or delay publication while remediation is underway.

## 📝 Changes to Governance

Governance may evolve as the project gains contributors. Changes should be documented, communicated, and reviewed for consistency with the Code of Conduct and contribution policy.
