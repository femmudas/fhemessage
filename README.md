# FHEMessage - Fully Homomorphic Encrypted Messaging dApp

![License](https://img.shields.io/badge/license-BSD--3--Clause--Clear-blue)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)
![FHEVM](https://img.shields.io/badge/FHEVM-Zama-purple)

A decentralized, privacy-preserving messaging application built with Zama's FHEVM technology for the October 2025 Developer Program.

## 🌟 Features

- ✅ **End-to-End Encryption**: Messages encrypted using Fully Homomorphic Encryption (FHE)
- ✅ **On-Chain Privacy**: Encrypted data stored on Sepolia testnet
- ✅ **Full Inbox/Outbox/Spam Management**: Complete messaging workflow
- ✅ **MetaMask Integration**: Seamless wallet connection
- ✅ **Universal FHEVM SDK**: Framework-agnostic encryption toolkit
- ✅ **Modern React UI**: Beautiful, responsive interface

## 🚀 Quick Start

### Prerequisites
- Node.js v18+
- pnpm v8+
- MetaMask browser extension

### Installation

```bash
# Install dependencies
pnpm install

# Setup environment
cp .env.example .env
```

### Local Development

**Terminal 1 - Start Blockchain:**
```bash
pnpm chain
```

**Terminal 2 - Deploy Contracts:**
```bash
pnpm deploy:localhost
```

**Terminal 3 - Start Frontend:**
```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000)

### Demo Interface

Try the demo interface without blockchain setup:
```
pnpm dev
# Navigate to http://localhost:3000/demo
```

### MetaMask Setup (Localhost)
- Network: Hardhat Local
- RPC URL: http://127.0.0.1:8545
- Chain ID: 31337
- Currency: ETH

## 📦 Project Structure

```
fhemessage/
├── packages/
│   ├── fhevm-sdk/          # Universal FHEVM SDK
│   │   ├── src/
│   │   │   ├── core/       # Encryption/Decryption logic
│   │   │   ├── types/      # TypeScript types
│   │   │   └── react/      # React hooks
│   │   └── package.json
│   ├── hardhat/            # Smart contracts
│   │   ├── contracts/
│   │   │   └── MessageStorage.sol
│   │   ├── scripts/
│   │   └── package.json
│   └── client/             # React frontend
│       ├── src/
│       │   ├── components/ # UI components
│       │   ├── pages/      # Page views
│       │   ├── hooks/      # Custom hooks
│       │   └── context/    # React context
│       └── package.json
├── package.json
└── README.md
```

## 🎯 Zama Developer Program Compliance

Built for **Zama Developer Program October 2025 Bounty Track**:
- ✅ Universal FHEVM SDK (framework-agnostic)
- ✅ Wagmi-like API structure
- ✅ Complete encryption/decryption flows
- ✅ Modular and reusable components
- ✅ Comprehensive documentation
- ✅ Quick setup (<10 lines)

## 🌐 Deployment

### Netlify

The project is configured for easy deployment on Netlify. See [DEPLOYMENT.md](./DEPLOYMENT.md) for details.

**Quick Deploy:**
1. Push to GitHub
2. Connect repository to Netlify
3. Netlify will auto-detect settings from `netlify.toml`

**Demo Page:** Available at `/demo` route (works without blockchain connection)

## 📚 Documentation

- [Zama FHEVM Docs](https://docs.zama.ai)
- [Developer Program](https://guild.xyz/zama/developer-program)
- [Deployment Guide](./DEPLOYMENT.md)

## 📄 License

BSD-3-Clause-Clear License

## 🤝 Contributing

Contributions welcome! See CONTRIBUTING.md

---

**Built with ❤️ using Zama FHEVM**
