# 🚀 FHEMessage Quick Start Guide

Get FHEMessage up and running in **5 minutes**!

---

## ⚡ Prerequisites Check

Before starting, ensure you have:

- ✅ **Node.js** v18+ installed → [Download](https://nodejs.org/)
- ✅ **pnpm** v8+ installed → Run: `npm install -g pnpm`
- ✅ **MetaMask** browser extension → [Install](https://metamask.io/)
- ✅ **Git** installed → [Download](https://git-scm.com/)

**Quick Version Check:**
```bash
node --version  # Should show v18.0.0 or higher
pnpm --version  # Should show 8.0.0 or higher
```

---

## 🎯 Option 1: Try the Demo (No Setup Required)

**Fastest way to explore FHEMessage!**

1. **Visit the live demo:**
   ```
   https://fhemessage.netlify.app/demo
   ```

2. **Explore the interface:**
   - ✉️ View sample encrypted messages
   - 🔒 Click to simulate decryption
   - 📝 Try the compose interface
   - 📂 Browse inbox/outbox/spam folders

**No wallet, no blockchain, no installation needed!**

---

## 💻 Option 2: Local Development Setup

### Step 1: Clone & Install (2 minutes)

```bash
# Clone the repository
git clone https://github.com/femmudas/fhemessage.git
cd fhemessage

# Install all dependencies
pnpm install
```

### Step 2: Configure Environment (1 minute)

```bash
# Copy environment template
cp .env.example .env

# Edit .env file (optional for localhost)
# The defaults work fine for local development!
```

**Default `.env` for localhost:**
```env
MNEMONIC="test test test test test test test test test test test junk"
VITE_NETWORK=localhost
VITE_GATEWAY_URL=https://gateway.zama.ai
```

### Step 3: Start Everything (2 minutes)

Open **3 terminals** in the project root:

**Terminal 1 - Start Blockchain:**
```bash
pnpm chain
```
✅ Wait for: "Started HTTP and WebSocket JSON-RPC server"

**Terminal 2 - Deploy Contracts:**
```bash
pnpm deploy:localhost
```
✅ Wait for: "✅ MessageStorage deployed to: 0x..."

**Terminal 3 - Start Frontend:**
```bash
pnpm dev
```
✅ Wait for: "Local: http://localhost:3000"

### Step 4: Connect MetaMask (30 seconds)

1. **Open MetaMask**
2. **Add Hardhat Network:**
   - Network Name: `Hardhat Local`
   - RPC URL: `http://127.0.0.1:8545`
   - Chain ID: `31337`
   - Currency: `ETH`

3. **Import Test Account:**
   - Look in Terminal 1 for "Account #0" private key
   - In MetaMask: Account menu → Import Account → Paste private key

### Step 5: Send Your First Message! (1 minute)

1. **Open app:** http://localhost:3000
2. **Connect wallet** (top right)
3. **Click "Compose"**
4. **Fill in:**
   - Recipient: Use Account #1 address from Terminal 1
   - Subject: "My First Encrypted Message"
   - Message: "Hello FHE World! 🔒"
5. **Click "Send Encrypted Message"**
6. **Confirm in MetaMask**

✅ **Done!** Your message is now encrypted on-chain!

---

## 🎓 Next Steps

### View Your Encrypted Message

1. **Switch MetaMask to Account #1** (recipient)
2. **Refresh the page** → Connect wallet
3. **Go to Inbox** → See your message
4. **Click the message** → Click "Decrypt"
5. **Sign with MetaMask** → View plaintext!

### Test More Features

- 📨 **Send multiple messages** between accounts
- 🗑️ **Delete messages** you don't want
- ✅ **Mark as read** to organize inbox
- 🚫 **Mark as spam** to test spam folder
- 📤 **Check Outbox** for sent messages

---

## 🔧 Troubleshooting

### "MetaMask Tx Signature" Error
**Solution:** Reset your MetaMask account
1. MetaMask → Settings → Advanced
2. Click "Clear activity tab data"
3. Try transaction again

### "Cannot connect to localhost:8545"
**Solution:** Restart the blockchain
```bash
# In Terminal 1, press Ctrl+C
# Then restart:
pnpm chain
```

### "Contract not deployed"
**Solution:** Redeploy contracts
```bash
# In Terminal 2:
pnpm deploy:localhost
```

### Port 3000 already in use
**Solution:** Use a different port
```bash
PORT=3001 pnpm dev
```

### Changes not appearing
**Solution:** Hard refresh browser
- **Windows/Linux:** `Ctrl + Shift + R`
- **Mac:** `Cmd + Shift + R`

---

## 📝 Quick Reference

### Essential Commands

```bash
# Install dependencies
pnpm install

# Start local blockchain
pnpm chain

# Deploy contracts (localhost)
pnpm deploy:localhost

# Start frontend
pnpm dev

# Run tests
pnpm test

# Build for production
pnpm build

# Clean everything
pnpm clean
```

### Test Accounts (from Terminal 1)

When you run `pnpm chain`, you'll see 20 test accounts with 10,000 ETH each:

```
Account #0: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
Private Key: 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80

Account #1: 0x70997970C51812dc3A010C7d01b50e0d17dc79C8
Private Key: 0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d

... (18 more accounts)
```

Use these to test multi-user messaging!

---

## 🌐 Deploy to Sepolia (Optional)

Want to deploy to a real testnet? It's easy!

### 1. Get Sepolia ETH
- Faucet 1: https://sepoliafaucet.com
- Faucet 2: https://sepolia-faucet.pk910.de

### 2. Update .env
```env
MNEMONIC="your twelve word seed phrase"
INFURA_API_KEY=your_infura_key_here
VITE_NETWORK=sepolia
```

### 3. Deploy
```bash
pnpm deploy:sepolia
```

### 4. Update Frontend Config
The deployment script automatically updates the contract address!

---

## 📚 Learn More

- **Full Documentation:** [README.md](./README.md)
- **Zama FHEVM Docs:** https://docs.zama.ai
- **Smart Contracts:** `packages/hardhat/contracts/`
- **Frontend Code:** `packages/client/src/`

---

## 💡 Pro Tips

### Speed Up Development

1. **Use multiple browser profiles** for different accounts
2. **Keep Terminal 1 running** between sessions (blockchain state persists)
3. **Bookmark localhost:3000** for quick access
4. **Use browser DevTools** to inspect transactions

### Understanding FHE

- **Encrypted messages** look like random numbers on-chain
- **Only sender & recipient** can decrypt
- **No one else** (not even miners!) can read your messages
- **EIP-712 signatures** prove you're allowed to decrypt

### Customize Your Experience

- **Change theme:** Edit `packages/client/src/index.css`
- **Modify UI:** Edit components in `packages/client/src/components/`
- **Add features:** Extend `MessageStorage.sol` contract

---

## ❓ Still Need Help?

- 🐛 **Bug Reports:** [GitHub Issues](https://github.com/femmudas/fhemessage/issues)
- 💬 **Questions:** [GitHub Discussions](https://github.com/femmudas/fhemessage/discussions)
- ✖️ **X:** [@xosiriusx](https://twitter.com/xosiriusx)

---

## 🎉 Success Checklist

Before moving on, make sure you can:

- [ ] See the blockchain running in Terminal 1
- [ ] Deploy contracts successfully in Terminal 2
- [ ] Access the UI at localhost:3000
- [ ] Connect MetaMask to Hardhat network
- [ ] Send an encrypted message
- [ ] Receive and decrypt a message
- [ ] View inbox, outbox, and spam folders

**All checked?** Congratulations! 🎊 You're now running a fully encrypted messaging dApp!

---

<div align="center">

**Ready to build something amazing?**

[📖 Read Full Docs](./README.md) | [💻 View Source](https://github.com/femmudas/fhemessage)

</div>
