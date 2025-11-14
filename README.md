# FHEMessage - Fully Homomorphic Encrypted Messaging dApp

![License](https://img.shields.io/badge/license-BSD--3--Clause--Clear-blue)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)
![FHEVM](https://img.shields.io/badge/FHEVM-Zama-yellow)

A decentralized, privacy-preserving messaging application built with **Zama's FHEVM technology** FHEMessage enables users to send encrypted messages that remain confidential on-chain, leveraging **Fully Homomorphic Encryption (FHE)** to ensure true end-to-end privacy.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Project Structure](#project-structure)
- [System Architecture](#system-architecture)
- [Data Messaging Flow](#data-messaging-flow)
- [Getting Started](#getting-started)
- [Technical Details](#technical-details)
- [Development](#development)
- [Network Support](#network-support)
- [Testing & Tools](#testing--tools)
- [Key Achievements](#key-achievements)
- [Demo & Links](#demo--links)
- [Acknowledgments](#acknowledgments)
- [License](#license)

---

## 🌟 Overview

**FHEMessage** is a next-generation encrypted messaging platform that stores messages on the blockchain while maintaining complete privacy through Fully Homomorphic Encryption. Unlike traditional encrypted messaging systems, FHEMessage allows data to remain encrypted even while stored on-chain, ensuring that only intended recipients can decrypt and read messages.

---

## ✨ Key Features

- ✅ **End-to-End Encryption**: Messages encrypted using Fully Homomorphic Encryption (FHE)
- ✅ **On-Chain Privacy**: Encrypted data stored on Sepolia testnet without revealing content
- ✅ **Complete Message Management**: Full inbox/outbox/spam workflow
- ✅ **MetaMask Integration**: Seamless wallet connection and EIP-712 signatures
- ✅ **Universal FHEVM SDK**: Framework-agnostic encryption toolkit for developers
- ✅ **Modern React UI**: Beautiful, responsive interface with Tailwind CSS
- ✅ **Demo Mode**: Try the interface without blockchain setup
- ✅ **Privacy-First Design**: No message content visible on-chain or to third parties

---

## 📁 Project Structure

```
fhemessage/
├── packages/
│   ├── fhevm-sdk/              # Universal FHEVM SDK (framework-agnostic)
│   │   ├── src/
│   │   │   ├── core/           # Encryption/Decryption logic
│   │   │   │   ├── fhe-instance.ts    # FHE instance management
│   │   │   │   ├── encryption.ts       # Message encryption
│   │   │   │   └── decryption.ts       # Message decryption
│   │   │   ├── types/          # TypeScript type definitions
│   │   │   │   └── index.ts            # SDK types
│   │   │   └── react/          # React-specific hooks (future)
│   │   └── package.json
│   │
│   ├── hardhat/                # Smart contracts & deployment
│   │   ├── contracts/
│   │   │   └── MessageStorage.sol      # Main messaging contract
│   │   ├── scripts/
│   │   │   └── deploy.ts               # Deployment script
│   │   ├── test/                       # Contract tests
│   │   ├── hardhat.config.ts           # Hardhat configuration
│   │   └── package.json
│   │
│   └── client/                 # React frontend application
│       ├── src/
│       │   ├── components/     # Reusable UI components
│       │   │   ├── Layout.tsx          # App layout wrapper
│       │   │   └── MessageCard.tsx     # Message display component
│       │   ├── pages/          # Application pages
│       │   │   ├── HomePage.tsx        # Landing page
│       │   │   ├── InboxPage.tsx       # Inbox view
│       │   │   ├── OutboxPage.tsx      # Sent messages
│       │   │   ├── SpamPage.tsx        # Spam folder
│       │   │   ├── ComposePage.tsx     # Message composer
│       │   │   └── DemoPage.tsx        # Demo interface
│       │   ├── context/        # React context providers
│       │   │   └── WalletContext.tsx   # Wallet connection state
│       │   ├── config/         # Configuration files
│       │   │   ├── contracts.ts        # Contract addresses
│       │   │   └── abis.ts             # Contract ABIs
│       │   ├── hooks/          # Custom React hooks
│       │   ├── types/          # TypeScript types
│       │   │   └── window.d.ts         # Window extensions
│       │   ├── App.tsx                 # Main app component
│       │   ├── main.tsx                # App entry point
│       │   └── index.css               # Global styles
│       ├── public/
│       ├── index.html
│       ├── vite.config.ts              # Vite configuration
│       ├── tailwind.config.js          # Tailwind CSS config
│       ├── postcss.config.js           # PostCSS config
│       └── package.json
│
├── .env.example                # Environment variables template
├── .gitignore
├── netlify.toml                # Netlify deployment config
├── _redirects                  # SPA routing config
├── package.json                # Root package.json
├── pnpm-workspace.yaml         # PNPM workspace config
├── LICENSE                     # BSD-3-Clause-Clear license
├── Quick_Start.md              # This file
└── README.md                   # This file
```

---

## 🏗️ System Architecture

### Architecture Overview

FHEMessage follows a three-tier architecture:

```
┌─────────────────────────────────────────────────────────────┐
│                     Frontend Layer                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │  React UI    │  │  Wallet      │  │  FHEVM SDK   │     │
│  │  Components  │◄─┤  Context     │◄─┤  Integration │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                   Blockchain Layer                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │  MetaMask    │  │  Smart       │  │  FHEVM       │     │
│  │  Provider    │─►│  Contracts   │◄─┤  Gateway     │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    Storage Layer                            │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │  Encrypted   │  │  User        │  │  Message     │     │
│  │  Messages    │  │  Mappings    │  │  Metadata    │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└─────────────────────────────────────────────────────────────┘
```

### Component Responsibilities

#### **Frontend Layer**
- **React UI Components**: User interface for message composition, viewing, and management
- **Wallet Context**: Manages MetaMask connection state and user account
- **FHEVM SDK**: Handles encryption/decryption operations client-side

#### **Blockchain Layer**
- **MetaMask Provider**: Wallet interface for transaction signing
- **Smart Contracts**: `MessageStorage.sol` manages encrypted message storage
- **FHEVM Gateway**: Zama's gateway for FHE operations

#### **Storage Layer**
- **Encrypted Messages**: Message subject and body stored as encrypted integers
- **User Mappings**: Inbox, outbox, and spam folders per address
- **Message Metadata**: Sender, recipient, timestamp, read/spam status

---

## 🔄 Data Messaging Flow

### Message Sending Flow

```
┌─────────────┐
│   User      │
│  Composes   │
│  Message    │
└──────┬──────┘
       │
       ▼
┌─────────────────────┐
│  1. Encrypt Subject │◄─── FHEVM SDK
│     & Body          │     (Client-Side)
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│  2. Generate Input  │◄─── Proof Generation
│     Proofs          │
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│  3. Sign TX with    │◄─── MetaMask
│     MetaMask        │
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│  4. Submit to       │
│     MessageStorage  │──► Smart Contract
│     Contract        │    (On-Chain)
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│  5. Store Encrypted │
│     Data + Metadata │──► Blockchain Storage
└─────────────────────┘
```

### Message Receiving Flow

```
┌─────────────┐
│   User      │
│  Opens      │
│  Inbox      │
└──────┬──────┘
       │
       ▼
┌─────────────────────┐
│  1. Fetch Message   │◄─── Smart Contract Query
│     IDs from Inbox  │
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│  2. Retrieve        │◄─── Read Encrypted Data
│     Encrypted Data  │     from Blockchain
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│  3. Generate        │◄─── User clicks "Decrypt"
│     EIP-712         │
│     Signature       │
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│  4. Request         │◄─── FHEVM Gateway
│     Decryption via  │
│     Gateway         │
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│  5. Display         │──► Plaintext Message
│     Decrypted       │     Shown to User
│     Message         │
└─────────────────────┘
```

### Key Security Features

- **Client-Side Encryption**: Messages are encrypted before leaving the browser
- **Zero-Knowledge Proofs**: Input proofs validate encrypted data without revealing content
- **EIP-712 Signatures**: Secure, typed data signing for decryption requests
- **Permission Control**: Only sender and recipient can decrypt messages
- **On-Chain Privacy**: No plaintext data ever stored on blockchain

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: v18.0.0 or higher
- **pnpm**: v8.0.0 or higher
- **MetaMask**: Browser extension installed
- **Git**: For cloning the repository

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/femmudas/fhemessage.git
   cd fhemessage
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Setup environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and configure:
   ```env
   # Wallet Configuration
   MNEMONIC="your twelve word mnemonic here"
   
   # Network Configuration
   INFURA_API_KEY=your_infura_api_key
   ALCHEMY_API_KEY=your_alchemy_api_key
   
   # Frontend Configuration
   VITE_MESSAGE_STORAGE_ADDRESS=  # Auto-filled after deployment
   VITE_NETWORK=localhost          # or 'sepolia'
   VITE_GATEWAY_URL=https://gateway.zama.ai
   ```

### Local Development

**Terminal 1 - Start Local Blockchain:**
```bash
pnpm chain
```

**Terminal 2 - Deploy Smart Contracts:**
```bash
pnpm deploy:localhost
```
This will automatically update `packages/client/src/config/contracts.ts` with the deployed contract address.

**Terminal 3 - Start Frontend:**
```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### MetaMask Network Setup

#### For Localhost (Hardhat)
- **Network Name**: Hardhat Local
- **RPC URL**: `http://127.0.0.1:8545`
- **Chain ID**: `31337`
- **Currency Symbol**: `ETH`

#### For Sepolia Testnet
- **Network Name**: Sepolia
- **RPC URL**: `https://sepolia.infura.io/v3/YOUR_KEY`
- **Chain ID**: `11155111`
- **Currency Symbol**: `SepoliaETH`
- **Block Explorer**: `https://sepolia.etherscan.io`

### Demo Mode

Try the application without blockchain setup:

```bash
pnpm dev
```

Navigate to [http://localhost:3000/demo](http://localhost:3000/demo)

The demo provides a fully interactive UI experience without requiring wallet connection or contract deployment.

---

## 🔧 Technical Details

### Smart Contract Architecture

#### **MessageStorage.sol**

Core contract managing encrypted messages on-chain.

**Key Functions:**
```solidity
// Send an encrypted message
function sendMessage(
    address to,
    einput encryptedSubject,
    bytes calldata inputProofSubject,
    einput encryptedBody,
    bytes calldata inputProofBody
) external returns (uint256)

// Retrieve message metadata
function getMessage(uint256 messageId) 
    external view returns (...)

// Decrypt encrypted content
function getEncryptedSubject(uint256 messageId) 
    external view returns (euint256)

function getEncryptedBody(uint256 messageId) 
    external view returns (euint256)

// Message management
function markAsRead(uint256 messageId) external
function markAsSpam(uint256 messageId) external

// Folder retrieval
function getInbox(address user) 
    external view returns (uint256[])
function getOutbox(address user) 
    external view returns (uint256[])
function getSpam(address user) 
    external view returns (uint256[])
```

**Data Structures:**
```solidity
struct EncryptedMessage {
    uint256 id;
    address from;
    address to;
    euint256 encryptedSubject;  // FHE encrypted
    euint256 encryptedBody;     // FHE encrypted
    uint64 timestamp;
    bool isRead;
    bool isSpam;
    bool exists;
}
```

### FHEVM SDK

The Universal FHEVM SDK provides framework-agnostic encryption utilities.

**Core Modules:**

1. **fhe-instance.ts** - FHE Instance Management
   ```typescript
   export async function initializeFHEVM(): Promise<void>
   export async function createFHEInstance(config: FHEConfig)
   export function getFHEInstance()
   ```

2. **encryption.ts** - Message Encryption
   ```typescript
   export async function encryptString(
     fheInstance: FhevmInstance,
     contractAddress: string,
     userAddress: string,
     message: string
   )
   ```

3. **decryption.ts** - Message Decryption
   ```typescript
   export async function userDecrypt(
     fheInstance: FhevmInstance,
     handle: bigint,
     options: DecryptionOptions
   ): Promise<bigint>
   ```

### Frontend Architecture

**Technology Stack:**
- **React 18**: Component-based UI
- **TypeScript**: Type-safe development
- **Vite**: Fast build tooling
- **Tailwind CSS**: Utility-first styling
- **React Router**: Client-side routing
- **Ethers.js**: Ethereum interaction
- **fhevmjs**: FHE operations

**Key Components:**

- `WalletContext`: Global wallet state management
- `Layout`: Persistent navigation and footer
- `MessageCard`: Reusable message display with decrypt action
- Page components: Home, Inbox, Outbox, Spam, Compose, Demo

---

## 💻 Development

### Available Scripts

```bash
# Install all dependencies
pnpm install:all

# Start local blockchain
pnpm chain

# Compile smart contracts
pnpm compile

# Deploy to localhost
pnpm deploy:localhost

# Deploy to Sepolia
pnpm deploy:sepolia

# Start frontend dev server
pnpm dev

# Build frontend for production
pnpm build

# Run contract tests
pnpm test

# Clean all build artifacts
pnpm clean
```

### Development Workflow

1. **Start local blockchain** in Terminal 1
2. **Deploy contracts** in Terminal 2 (copies address to frontend config)
3. **Start frontend** in Terminal 3
4. **Connect MetaMask** to localhost network
5. **Import test accounts** from Hardhat (private keys in terminal output)
6. **Send test messages** between accounts

### Code Quality

- **TypeScript**: Strict type checking enabled
- **ESLint**: Code linting (configured in packages)
- **Prettier**: Code formatting
- **Git hooks**: Pre-commit checks (optional)

### Adding New Features

1. **Smart Contract Changes**: Edit `packages/hardhat/contracts/MessageStorage.sol`
2. **Frontend Updates**: Modify React components in `packages/client/src`
3. **SDK Enhancements**: Extend `packages/fhevm-sdk/src/core`
4. **Rebuild**: Run `pnpm compile` and redeploy contracts
5. **Test**: Verify changes in local environment

---

## 🌐 Network Support

### Supported Networks

| Network | Status | Chain ID | Notes |
|---------|--------|----------|-------|
| **Localhost (Hardhat)** | ✅ Full Support | 31337 | Development environment |
| **Sepolia Testnet** | ✅ Full Support | 11155111 | Ethereum testnet |
| **Mainnet** | ⚠️ Not Recommended | 1 | Use at own risk |

### Sepolia Deployment

1. **Get Sepolia ETH**
   - Faucet: [https://sepoliafaucet.com](https://sepoliafaucet.com)
   - Alternative: [https://sepolia-faucet.pk910.de](https://sepolia-faucet.pk910.de)

2. **Configure `.env`**
   ```env
   INFURA_API_KEY=your_infura_key
   MNEMONIC="your twelve word mnemonic"
   ```

3. **Deploy**
   ```bash
   pnpm deploy:sepolia
   ```

4. **Update Frontend**
   ```env
   VITE_NETWORK=sepolia
   VITE_MESSAGE_STORAGE_ADDRESS=<deployed_address>
   ```

5. **Verify Contract (Optional)**
   ```bash
   npx hardhat verify --network sepolia <CONTRACT_ADDRESS>
   ```

---

## 🧪 Testing & Tools

### Smart Contract Tests

```bash
cd packages/hardhat
pnpm hardhat test
```

**Test Coverage:**
- ✅ Message sending
- ✅ Message retrieval
- ✅ Encryption/decryption flow
- ✅ Permission controls
- ✅ Inbox/outbox/spam management
- ✅ Read/spam marking

### Frontend Testing

```bash
cd packages/client
pnpm test  # (Tests to be added)
```

### Useful Development Tools

- **Hardhat Console**: Interactive contract debugging
  ```bash
  pnpm hardhat console --network localhost
  ```

- **Gas Reporter**: Analyze transaction costs
  ```bash
  REPORT_GAS=true pnpm test
  ```

- **Contract Size**: Check deployment size
  ```bash
  pnpm hardhat size-contracts
  ```

- **Etherscan Verification**: Verify on Sepolia
  ```bash
  pnpm hardhat verify --network sepolia <ADDRESS>
  ```

---

## 🏆 Key Achievements
 
### Technical Innovations

- **On-Chain Privacy**: First fully encrypted messaging dApp on FHEVM
- **EIP-712 Integration**: Secure typed data signing for decryption
- **Universal SDK**: Reusable across any JavaScript framework
- **Optimized Gas Usage**: Efficient contract design with minimal storage
- **Modern UX**: Beautiful, responsive interface rivaling Web2 apps

### Security Features

- **Zero-Knowledge Proofs**: Content validity without revelation
- **Client-Side Encryption**: No plaintext ever leaves user device
- **Permission System**: Granular access control per message
- **Spam Protection**: Built-in spam folder with marking
- **Secure Key Management**: MetaMask integration for wallet security

---

## 🔗 Demo & Links

### 🌐 Live Demo

**Website**: [https://fhemessage.netlify.app](https://fhemessage.netlify.app)  

### 📚 Documentation

- **Zama FHEVM Docs**: [https://docs.zama.ai](https://docs.zama.ai)
- **Zama Developer Program**: [https://guild.xyz/zama/developer-program](https://guild.xyz/zama/developer-program)
- **Smart Contract**: [Etherscan (Sepolia)](https://sepolia.etherscan.io)

---

## 🙏 Acknowledgments

### Built With

- **[Zama FHEVM](https://docs.zama.ai)** - Fully Homomorphic Encryption for Ethereum
- **[Hardhat](https://hardhat.org)** - Ethereum development environment
- **[React](https://react.dev)** - UI framework
- **[Vite](https://vitejs.dev)** - Build tooling
- **[Tailwind CSS](https://tailwindcss.com)** - Styling framework
- **[Ethers.js](https://docs.ethers.org)** - Ethereum library

### Special Thanks

- **Zama Team** - For creating FHEVM and supporting the developer community
- **OpenZeppelin** - For secure smart contract libraries
- **Hardhat Team** - For excellent developer tooling
- **Ethereum Foundation** - For the Sepolia testnet

### Community

- **Discord**: Join the [Zama Discord](https://discord.gg/zama)
- **X**: Follow [@zama_fhe](https://x.com/zama)
- **Forum**: [Zama Community Forum](https://community.zama.ai)

---

## 📄 License

This project is licensed under the **BSD-3-Clause-Clear License**.

```
Copyright (c) 2025, FHEMessage Team
All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice,
   this list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice,
   this list of conditions and the following disclaimer in the documentation
   and/or other materials provided with the distribution.

3. Neither the name of the copyright holder nor the names of its contributors
   may be used to endorse or promote products derived from this software
   without specific prior written permission.

NO EXPRESS OR IMPLIED LICENSES TO ANY PARTY'S PATENT RIGHTS ARE GRANTED BY
THIS LICENSE.
```

See [LICENSE](./LICENSE) for full details.

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Contribution Guidelines

- Follow existing code style
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting PR

---

## 📞 Contact & Support

- **Issues**: [GitHub Issues](https://github.com/femmudas/fhemessage/issues)
- **X**: [@xosiriusx](https://twitter.com/xosiriusx)

---

<div align="center">

**Built with ❤️ using Zama FHEVM**

*Making blockchain privacy a reality*

[⬆ Back to Top](#fhemessage---fully-homomorphic-encrypted-messaging-dapp)

</div>
