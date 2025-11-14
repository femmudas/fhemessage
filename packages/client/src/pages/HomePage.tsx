import { Link } from 'react-router-dom';
import { useWallet } from '../context/WalletContext';
import { Lock, Shield, Zap, GitBranch } from 'lucide-react';

export default function HomePage() {
  const { isConnected, connect, isConnecting } = useWallet();

  const features = [
    { icon: Lock, title: 'End-to-End Encryption', desc: 'Messages encrypted with FHE technology remain confidential on-chain' },
    { icon: Shield, title: 'On-Chain Privacy', desc: 'Store encrypted data directly on Ethereum without revealing content' },
    { icon: Zap, title: 'Fast & Secure', desc: 'Powered by Zama\'s optimized FHE implementation' },
    { icon: GitBranch, title: 'Open Source', desc: 'Built for Zama Developer Program with universal SDK' },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
          Fully Homomorphic Encrypted Messaging
        </h1>
        <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
          Send messages that remain encrypted on-chain. Built with Zama's FHEVM technology for true privacy-preserving communication.
        </p>

        {!isConnected ? (
          <button onClick={connect} disabled={isConnecting} className="btn btn-primary text-lg px-8 py-4">
            {isConnecting ? 'Connecting...' : 'Get Started - Connect Wallet'}
          </button>
        ) : (
          <Link to="/compose" className="btn btn-primary text-lg px-8 py-4 inline-block">
            Compose Your First Encrypted Message
          </Link>
        )}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {features.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="card text-center">
            <Icon className="w-12 h-12 text-blue-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-slate-400">{desc}</p>
          </div>
        ))}
      </div>

      <div className="card">
        <h2 className="text-3xl font-bold mb-6">How It Works</h2>
        <div className="space-y-4">
          {[
            { num: 1, title: 'Connect Your Wallet', desc: 'Connect MetaMask to Sepolia testnet or local Hardhat network' },
            { num: 2, title: 'Compose Message', desc: "Write your message - it's automatically encrypted using FHE before sending" },
            { num: 3, title: 'Send Encrypted', desc: 'Your message is stored encrypted on-chain. Only you and the recipient can decrypt it' },
            { num: 4, title: 'Secure Decryption', desc: 'Recipients decrypt messages using EIP-712 signatures for maximum security' }
          ].map(step => (
            <div key={step.num} className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                {step.num}
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">{step.title}</h3>
                <p className="text-slate-400">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}