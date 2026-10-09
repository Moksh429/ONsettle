# ON SETTLE

### On-Chain Compliance for Solana Token Transfers

**ON SETTLE** is a Solana hackathon project that uses **Token-2022 Transfer Hooks** to enforce compliance rules directly during token transfers, rather than relying on frontend validation.

## 🚨 Problem

Frontend compliance checks can be bypassed, while attestations may expire or be revoked after initial verification.

## 💡 Solution

ON SETTLE validates recipient eligibility at settlement, ensuring transfers follow on-chain rules.

**Key Features**
- On-chain transfer validation
- Attestation expiration checks
- Revocation support
- Frontend-independent enforcement
- Permissioned transfers for tokenized real-world assets (RWAs)

## ⚙️ How It Works

1. A user initiates a token transfer.
2. Token-2022 invokes the transfer hook.
3. ON SETTLE validates the recipient's attestation.
4. The transfer succeeds only if the required checks pass.

## 🛠️ Tech Stack

- Solana
- SPL Token-2022
- Transfer Hooks
- Rust / Anchor (depending on implementation)

## 🚀 Getting Started

```bash
git clone <YOUR_REPOSITORY_URL>
cd on-settle
anchor build
anchor test
```

Use the commands appropriate to your project setup.

## 🧪 Expected Behavior

| Condition | Result |
|---|---|
| Valid attestation | Allow transfer |
| Missing attestation | Reject transfer |
| Expired or revoked | Reject transfer |
| Invalid attestation data | Reject transfer |

## 🗺️ Roadmap

- [ ] Implement transfer hook
- [ ] Add attestation validation and revocation
- [ ] Test compliance enforcement
- [ ] Deploy to Solana Devnet
- [ ] Publish program ID and demo

## 📄 Disclaimer

ON SETTLE is an experimental compliance-enforcement project. Production use requires security audits, reliable attestation issuance, and appropriate legal review.

**ON SETTLE — Rules enforced when the transfer happens.**
