# 🔐 Security Policy

AATM is a small educational command-line simulation. It is not a banking product, does not connect to a financial institution, and must not be used to enter or process real customer credentials or financial data.

This policy explains the security boundary of the current program, how to report a vulnerability privately, and how contributors should handle data and dependencies.

> [!CAUTION]
> **Never enter real banking credentials, PINs, account numbers, card details, passwords, or financial information.** Use fictional values only. AATM does not provide authentication, transaction authorization, secure storage, or financial account protection.

## 📚 Table of Contents

- [Security Scope](#-security-scope)
- [Supported Version](#-supported-version)
- [Reporting a Vulnerability](#-reporting-a-vulnerability)
- [Information to Include](#-information-to-include)
- [Safe Research and Testing](#-safe-research-and-testing)
- [Current Application Security Boundary](#-current-application-security-boundary)
- [Credentials and Sensitive Data](#-credentials-and-sensitive-data)
- [Prompt Input and Validation](#-prompt-input-and-validation)
- [Dependencies and Supply Chain](#-dependencies-and-supply-chain)
- [GitHub Actions and Repository Permissions](#-github-actions-and-repository-permissions)
- [Incident Response](#-incident-response)
- [Maintainer Security Checklist](#-maintainer-security-checklist)
- [Scope Limitations](#-scope-limitations)

## 🎯 Security Scope

This policy applies to security concerns in:
- `atm.js` and `atm.ts`.
- Inquirer prompt handling and answer processing.
- npm dependencies and lockfile.
- TypeScript configuration.
- GitHub Actions workflows.
- Repository documentation and examples.
- Any future local storage, external service, or API integration introduced to the project.

AATM currently runs as a local CLI process. It does not include a backend, database, bank connection, network API, account directory, or transaction ledger in the inspected source.

Third-party services and the user's local machine have separate security boundaries and policies.

## 📦 Supported Version

Security reports are considered against the current implementation on the default branch, `main`.

The project does not publish a long-term support matrix or a guaranteed security patch schedule. Include the affected commit, file, dependency version, and reproduction steps where known.

## 🚨 Reporting a Vulnerability

Do not publish exploitable vulnerability details in a public issue, pull request, or discussion before coordinated investigation.

Preferred route:
1. Open the repository's **Security** tab.
2. Use GitHub's private vulnerability reporting or private security advisory option if enabled.
3. Describe the issue and its impact.
4. Include safe reproduction steps and sanitized evidence.
5. Avoid attaching real credentials or personal financial information.

Private reporting route:

<https://github.com/Brajesh31/AATM/security/advisories/new>

If private reporting is unavailable, contact the repository owner through the contact method listed on the owner's GitHub profile. Do not send passwords, API tokens, or sensitive exploit material through an unverified channel.

For ordinary programming defects, use a public bug report. A vulnerability should not be disclosed as an ordinary public issue.

## 🧾 Information to Include

A useful report may include:
- A concise title and issue category.
- The affected file or dependency.
- The affected commit or version.
- Node.js and npm versions.
- Operating system.
- The command used to run the program.
- A safe reproduction sequence.
- Expected and actual behaviour.
- The security impact.
- Sanitized logs or screenshots.
- A possible mitigation, if known.

Do not include real banking data, user records, account credentials, private terminal history, or tokens.

## 🧪 Safe Research and Testing

Only test local copies and systems that you own or are authorized to assess.

Do not:
- Attempt to access real bank accounts using the simulation.
- Enter another person's credentials.
- Use real customer information in examples or test output.
- Send data to financial services without authorization.
- Run destructive tests against third-party systems.
- Publish secrets in a proof of concept.
- Use real PINs or passwords in screenshots.

Use synthetic IDs, fictional numeric values, and local test environments. Stop testing if a test could affect someone else's account or data.

## 🧱 Current Application Security Boundary

The current program:
- Collects a user ID-like value.
- Collects a PIN-like numeric value.
- Presents account category choices.
- Presents withdrawal or fast-cash paths.
- Collects or selects a numeric amount.
- In the TypeScript implementation, generates a random in-memory number and performs a demonstration comparison.

It does **not**:
- Verify an ID against a trusted identity provider.
- Verify a PIN against a secure credential store.
- Hash or encrypt user credentials.
- Connect to a bank.
- Retrieve an authoritative account balance.
- Reserve or debit funds.
- Persist transaction records.
- Maintain an audit trail.
- Prevent fraud or enforce real transaction limits.
- Provide authorization or financial compliance controls.

The random number in `atm.ts` is not confidential account data and is not a security control.

## 🔑 Credentials and Sensitive Data

Never add:
- Real user IDs or PINs.
- Bank account numbers.
- Credit or debit card data.
- Passwords or access tokens.
- Customer records.
- Personal financial data.
- Private test data.
- Sensitive terminal output.

Use fictional values in examples. A sample value should not look like a real personal account identifier if it could be confused with one.

If a secret is accidentally committed:
1. Revoke or rotate it at the service that issued it.
2. Check whether it was used.
3. Remove it from active files.
4. Review repository and CI access.
5. Assess whether any external notification is required.
6. Record the incident without copying the secret into another report.

Removing the secret from the latest version does not make an exposed credential safe.

## 🔢 Prompt Input and Validation

Inquirer prompts help collect input, but a prompt type is not a complete security or business-validation system.

For example, a numeric prompt does not by itself enforce:
- A positive amount.
- A maximum withdrawal amount.
- A permitted currency.
- A valid account state.
- A real available balance.
- User authorization.
- Transaction limits.

The current implementation should be treated as a demonstration of prompt branching. If validation logic is added in future source changes, it should be isolated, tested, and documented. Do not describe local input checks as bank-grade security.

## 📦 Dependencies and Supply Chain

The application uses Inquirer and its dependency tree. Dependency updates should be reviewed rather than applied blindly.

A responsible update process:
1. Inspect the package advisory or reason for an update.
2. Confirm the affected package and version.
3. Review compatibility notes.
4. Update dependencies with npm.
5. Review the lockfile diff.
6. Run the existing syntax and type checks.
7. Manually exercise the interactive prompts.
8. Document any behaviour or runtime change.

Do not add a package without a clear need. Avoid committing new files from installed dependencies as part of an ordinary contribution.

## ⚙️ GitHub Actions and Repository Permissions

The current CI workflow requires repository read access to check out code and run local validation. Keep workflow permissions limited to the task.

Review third-party GitHub Actions before introducing them. Use trusted actions and pin versions responsibly. Do not expose secrets in logs.

The README automation workflow currently has write access to repository contents because it commits a timestamp update. That workflow is operational automation, not an application security feature.

## 🚑 Incident Response

If sensitive information is committed or exposed:
1. Identify the data type and affected commit.
2. Revoke or rotate credentials where relevant.
3. Restrict access to affected services.
4. Review available logs.
5. Determine whether the information was accessed.
6. Remove the active exposure.
7. Assess who may be affected.
8. Follow applicable notification obligations where required.
9. Document the corrective action without reproducing the secret.

Do not assume every incident has the same legal requirements. Seek appropriate professional guidance if real personal or financial data is involved.

## ✅ Maintainer Security Checklist

- [ ] The README clearly states that AATM is not a banking product.
- [ ] Examples use fictional values only.
- [ ] No real IDs, PINs, or financial information are committed.
- [ ] Public issue templates warn against including credentials.
- [ ] Private vulnerability reporting is reachable.
- [ ] Dependency updates are reviewed.
- [ ] GitHub Actions permissions are limited.
- [ ] CI logs do not expose secrets.
- [ ] Any future external integration receives a security review.
- [ ] Documentation describes actual behaviour rather than implying real financial controls.

## 🚧 Scope Limitations

This policy does not certify the application as secure, authorize testing of real financial services, provide banking advice, or guarantee a response time.

If AATM is ever expanded beyond a learning simulation, that would require a new architecture and professional security review before any real account or financial data is introduced. The current code must not be used for real financial operations.
