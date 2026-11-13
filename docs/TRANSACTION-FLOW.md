# Prompt and transaction flow

The CLI asks for a user ID and numeric PIN, then asks the user to select a current or savings account. It then presents a transaction choice and either a preset fast-cash amount or a manually entered withdrawal amount.

This is only a prompt demonstration. The code does not verify identity, query an authoritative balance, reserve funds, write a ledger entry, or communicate with a bank. A random balance must never be presented as a real available balance.

For a production financial system, transaction authorization, account ownership, idempotency, audit logging, fraud controls, rate limits, secure secret handling, and reconciliation must be implemented server-side under a qualified security and compliance review.
