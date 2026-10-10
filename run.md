# ON SETTLE — Running Guide

This guide contains instructions on how to install, run, build, and interact with the **ON SETTLE** frontend application.

---

## 📋 Prerequisites

Before running the application, make sure you have the following installed:
- **Node.js**: v18.0.0 or higher (v20+ recommended)
- **npm**: v9.0.0 or higher (or `pnpm` / `yarn`)

Verify your installation:
```bash
node -v
npm -v
```

---

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/Moksh429/ONsettle.git
cd ONsettle
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```

The application will start locally at:
👉 **`http://localhost:5173/`**

Open this URL in your web browser to view the application.

---

## 🛠️ Build and Preview

### Build for Production
To typecheck TypeScript files and generate an optimized production bundle in `./dist`:
```bash
npm run build
```

### Preview Production Build
To preview the production bundle locally:
```bash
npm run preview
```

---

## 🧪 Interactive Features & Highlights

1. **Fullscreen Video Hero Section:**
   - Cinematic background video covering the viewport.
   - Header with custom geometric SVG logo, navigation links, and desktop CTAs.
   - Framer Motion slide-in mobile navigation sheet.
   - Inline Lucide icons (`Zap`, `LockKeyhole`, `Fingerprint`) styled with `Helvetica Now Display Bold` and `Inter`.

2. **SPL Token-2022 Transfer Hook Simulator:**
   - Located at `#simulation` (or click **"Test Transfer Hook"** / **"Start For Free"**).
   - Test all 5 on-chain compliance scenarios:
     - 🟢 **Valid Attestation:** Simulates successful CPI hook verification & transfer settlement.
     - 🟡 **Missing Attestation:** Simulates rejection due to missing recipient compliance PDA (`0x1771`).
     - 🔴 **Expired Attestation:** Simulates timestamp expiry rejection (`0x1772`).
     - ⛔ **Revoked Attestation:** Simulates compliance blacklist / revocation block (`0x1773`).
     - ⚠️ **Invalid Attestation Data:** Simulates signature or schema mismatch (`0x1774`).
   - 4-step live pipeline visualization: `Initiate` ➔ `Hook Call` ➔ `Verify PDA` ➔ `Settle`.
   - Streaming terminal log output mimicking `solana-test-validator`.

3. **Problem vs. Solution & Institutional Feature Grid:**
   - Compares bypassable frontend gating with tamper-resistant on-chain settlement.
   - Highlights 6 core institutional requirements: on-chain validation, expiry checks, instant revocation, zero frontend reliance, and RWA support.

4. **Lifecycle & Expected Behavior Matrix:**
   - Interactive specification matrix matching the Anchor smart contract program logic.

5. **Hackathon Roadmap & Anchor CLI Quickstart:**
   - Terminal snippet for Anchor contract testing and milestone tracking.

---

## 📦 Tech Stack

- **Framework:** React 18 + TypeScript + Vite
- **Styling:** Tailwind CSS + PostCSS + Autoprefixer
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Fonts:** Helvetica Now Display Bold & Inter

---

## 📄 Tagline
**ON SETTLE — Rules enforced when the transfer happens.**
