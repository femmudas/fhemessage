import React, { useState } from 'react';
import { Lock, Unlock, Inbox, Send, ShieldAlert, Plus, Mail, MailOpen, Trash2, Eye, RefreshCw, GitBranch, Shield, Zap } from 'lucide-react';

const mockMessages = [
  {
    id: 1,
    from: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
    to: '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199',
    subject: 'Welcome to FHEMessage!',
    body: 'This is your first encrypted message. All messages are secured with Fully Homomorphic Encryption.',
    timestamp: new Date('2025-11-14T10:30:00'),
    isRead: false,
    isDecrypted: false,
  },
  {
    id: 2,
    from: '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199',
    to: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
    subject: 'Smart Contract Deployed',
    body: 'The MessageStorage contract has been successfully deployed to Sepolia testnet at address 0x5FbDB...',
    timestamp: new Date('2025-11-14T09:15:00'),
    isRead: true,
    isDecrypted: false,
  },
];

interface Message {
  id: number;
  from: string;
  to: string;
  subject: string;
  body: string;
  timestamp: Date;
  isRead: boolean;
  isDecrypted: boolean;
}

interface MessageCardProps {
  message: Message;
  onDecrypt: (id: number) => void;
  onMarkAsRead?: (id: number) => void;
  onMarkAsSpam?: (id: number) => void;
  onDelete: (id: number) => void;
  type: 'inbox' | 'outbox' | 'spam';
}

const MessageCard = ({ message, onDecrypt, onMarkAsRead, onMarkAsSpam, onDelete, type }: MessageCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDecrypting, setIsDecrypting] = useState(false);

  const handleDecrypt = () => {
    setIsDecrypting(true);
    setTimeout(() => {
      onDecrypt(message.id);
      setIsDecrypting(false);
      setIsExpanded(true);
    }, 1500);
  };

  const handleToggle = () => {
    if (!message.isDecrypted) {
      handleDecrypt();
    } else {
      setIsExpanded(!isExpanded);
    }
  };

  const shortenAddress = (addr: string) => `${addr.slice(0, 6)}...${addr.slice(-4)}`;

  return (
    <div className={`bg-slate-800 rounded-xl p-6 shadow-lg border transition-all duration-200 hover:shadow-xl ${
      !message.isRead && type === 'inbox' ? 'border-l-4 border-blue-500' : 'border-slate-700'
    }`}>
      <div className="flex items-start justify-between">
        <div className="flex-1 cursor-pointer" onClick={handleToggle}>
          <div className="flex items-center space-x-3 mb-2">
            {message.isRead ? (
              <MailOpen className="w-5 h-5 text-slate-400" />
            ) : (
              <Mail className="w-5 h-5 text-blue-500" />
            )}
            <div>
              <p className="text-sm text-slate-400">
                {type === 'inbox' ? 'From' : 'To'}: {' '}
                <span className="text-white font-medium">
                  {shortenAddress(type === 'inbox' ? message.from : message.to)}
                </span>
              </p>
              <p className="text-xs text-slate-500">
                {message.timestamp.toLocaleString()}
              </p>
            </div>
          </div>

          {message.isDecrypted ? (
            <div>
              <h3 className="font-semibold text-white mb-2">{message.subject}</h3>
              {isExpanded && (
                <p className="text-slate-300 whitespace-pre-wrap">{message.body}</p>
              )}
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Eye className="w-4 h-4 text-slate-500" />
              <p className="text-slate-500 italic">🔒 Click to decrypt with FHE...</p>
            </div>
          )}
        </div>

        <div className="flex items-center space-x-2 ml-4">
          {type === 'inbox' && !message.isRead && onMarkAsRead && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onMarkAsRead(message.id);
              }}
              className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
              title="Mark as read"
            >
              <MailOpen className="w-4 h-4 text-slate-400" />
            </button>
          )}

          {type === 'inbox' && onMarkAsSpam && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onMarkAsSpam(message.id);
              }}
              className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
              title="Mark as spam"
            >
              <ShieldAlert className="w-4 h-4 text-yellow-400" />
            </button>
          )}

          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(message.id);
            }}
            className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
            title="Delete"
          >
            <Trash2 className="w-4 h-4 text-red-400" />
          </button>
        </div>
      </div>

      {isDecrypting && (
        <div className="mt-4 flex items-center justify-center space-x-2 text-sm text-blue-400">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-400"></div>
          <span>Decrypting with FHE encryption...</span>
        </div>
      )}
    </div>
  );
};

export default function FHEMessageDemo() {
  const [currentPage, setCurrentPage] = useState<'home' | 'inbox' | 'outbox' | 'spam' | 'compose'>('home');
  const [isConnected, setIsConnected] = useState(false);
  const [isEncryptionReady, setIsEncryptionReady] = useState(false);
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [recipient, setRecipient] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  const handleConnect = () => {
    setIsConnected(true);
    setTimeout(() => setIsEncryptionReady(true), 1000);
  };

  const handleDecrypt = (id: number) => {
    setMessages(messages.map(msg => 
      msg.id === id ? { ...msg, isDecrypted: true } : msg
    ));
  };

  const handleMarkAsRead = (id: number) => {
    setMessages(messages.map(msg => 
      msg.id === id ? { ...msg, isRead: true } : msg
    ));
  };

  const handleMarkAsSpam = (id: number) => {
    alert('✅ Message marked as spam!');
  };

  const handleDelete = (id: number) => {
    if (confirm('Delete this message?')) {
      setMessages(messages.filter(msg => msg.id !== id));
      alert('✅ Message deleted!');
    }
  };

  const handleSendMessage = () => {
    if (recipient && subject && body) {
      alert('🔐 Message encrypted with FHE and sent successfully!');
      setRecipient('');
      setSubject('');
      setBody('');
      setCurrentPage('outbox');
    } else {
      alert('⚠️ Please fill in all fields');
    }
  };

  const shortenAddress = (addr: string) => `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  const userAddress = '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb';

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col">
      {/* Header */}
      <header className="bg-slate-800 border-b border-slate-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button onClick={() => setCurrentPage('home')} className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
              <Lock className="w-8 h-8 text-blue-500" />
              <span className="text-2xl font-bold text-white">FHEMessage</span>
            </button>

            <div className="flex items-center space-x-4">
              {isConnected && (
                <div className="flex items-center space-x-2 text-sm">
                  {isEncryptionReady ? (
                    <span className="flex items-center text-green-400">
                      <Unlock className="w-4 h-4 mr-1" />
                      FHE Ready
                    </span>
                  ) : (
                    <span className="flex items-center text-yellow-400">
                      <Lock className="w-4 h-4 mr-1 animate-pulse" />
                      Initializing...
                    </span>
                  )}
                </div>
              )}

              {isConnected ? (
                <div className="flex items-center space-x-2">
                  <div className="px-4 py-2 bg-slate-700 rounded-lg text-sm font-mono">
                    {shortenAddress(userAddress)}
                  </div>
                  <button 
                    onClick={() => {setIsConnected(false); setIsEncryptionReady(false);}}
                    className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg font-medium transition-all"
                  >
                    Disconnect
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleConnect}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all shadow-lg shadow-blue-500/20"
                >
                  Connect Wallet
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      {isConnected && (
        <nav className="bg-slate-800 border-b border-slate-700">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between">
              <div className="flex space-x-1">
                <button
                  onClick={() => setCurrentPage('inbox')}
                  className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium transition-colors ${
                    currentPage === 'inbox'
                      ? 'text-blue-400 border-b-2 border-blue-400'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Inbox className="w-4 h-4" />
                  <span>Inbox</span>
                  <span className="px-2 py-0.5 bg-blue-600 rounded-full text-xs">{messages.length}</span>
                </button>
                <button
                  onClick={() => setCurrentPage('outbox')}
                  className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium transition-colors ${
                    currentPage === 'outbox'
                      ? 'text-blue-400 border-b-2 border-blue-400'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Send className="w-4 h-4" />
                  <span>Outbox</span>
                </button>
                <button
                  onClick={() => setCurrentPage('spam')}
                  className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium transition-colors ${
                    currentPage === 'spam'
                      ? 'text-blue-400 border-b-2 border-blue-400'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <ShieldAlert className="w-4 h-4" />
                  <span>Spam</span>
                </button>
              </div>

              <button
                onClick={() => setCurrentPage('compose')}
                className="my-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all flex items-center space-x-2 shadow-lg shadow-blue-500/20"
              >
                <Plus className="w-4 h-4" />
                <span>Compose</span>
              </button>
            </div>
          </div>
        </nav>
      )}

      {/* Main Content */}
      <main className="flex-1 bg-slate-900 overflow-y-auto">
        <div className="container mx-auto px-4 py-8">
          {currentPage === 'home' && (
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                  Fully Homomorphic Encrypted Messaging
                </h1>
                <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
                  Send messages that remain encrypted on-chain. Built with Zama's FHEVM technology
                  for true privacy-preserving communication.
                </p>

                {!isConnected ? (
                  <button
                    onClick={handleConnect}
                    className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-lg transition-all shadow-lg shadow-blue-500/30"
                  >
                    Get Started - Connect Wallet
                  </button>
                ) : (
                  <button
                    onClick={() => setCurrentPage('compose')}
                    className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-lg transition-all shadow-lg shadow-blue-500/30"
                  >
                    Compose Your First Message
                  </button>
                )}
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                <div className="bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-700 text-center hover:border-blue-500 transition-colors">
                  <Lock className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">End-to-End Encryption</h3>
                  <p className="text-slate-400">
                    Messages encrypted with FHE remain confidential on-chain
                  </p>
                </div>

                <div className="bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-700 text-center hover:border-blue-500 transition-colors">
                  <Shield className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">On-Chain Privacy</h3>
                  <p className="text-slate-400">
                    Store encrypted data on Ethereum without revealing content
                  </p>
                </div>

                <div className="bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-700 text-center hover:border-blue-500 transition-colors">
                  <Zap className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Fast & Secure</h3>
                  <p className="text-slate-400">
                    Powered by Zama's optimized FHE implementation
                  </p>
                </div>

                <div className="bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-700 text-center hover:border-blue-500 transition-colors">
                  <GitBranch className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Open Source</h3>
                  <p className="text-slate-400">
                    Universal FHEVM SDK for developers
                  </p>
                </div>
              </div>

              <div className="bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-700">
                <h2 className="text-3xl font-bold mb-6">How It Works</h2>
                <div className="space-y-4">
                  {[
                    { num: 1, title: 'Connect Your Wallet', desc: 'Connect MetaMask to Sepolia testnet or local Hardhat network' },
                    { num: 2, title: 'Compose Message', desc: "Write your message - it's automatically encrypted using FHE" },
                    { num: 3, title: 'Send Encrypted', desc: 'Message stored encrypted on-chain. Only you and recipient can decrypt' },
                    { num: 4, title: 'Secure Decryption', desc: 'Recipients decrypt with EIP-712 signatures for maximum security' }
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
          )}

          {currentPage === 'inbox' && (
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-3">
                  <Inbox className="w-8 h-8 text-blue-500" />
                  <h1 className="text-3xl font-bold">Inbox</h1>
                  <span className="px-3 py-1 bg-blue-600 rounded-full text-sm">
                    {messages.length}
                  </span>
                </div>
                
                <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg font-medium transition-all flex items-center space-x-2">
                  <RefreshCw className="w-4 h-4" />
                  <span>Refresh</span>
                </button>
              </div>

              <div className="space-y-4">
                {messages.map((message) => (
                  <MessageCard
                    key={message.id}
                    message={message}
                    onDecrypt={handleDecrypt}
                    onMarkAsRead={handleMarkAsRead}
                    onMarkAsSpam={handleMarkAsSpam}
                    onDelete={handleDelete}
                    type="inbox"
                  />
                ))}
              </div>
            </div>
          )}

          {currentPage === 'outbox' && (
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center space-x-3 mb-8">
                <Send className="w-8 h-8 text-blue-500" />
                <h1 className="text-3xl font-bold">Outbox</h1>
                <span className="px-3 py-1 bg-blue-600 rounded-full text-sm">0</span>
              </div>

              <div className="bg-slate-800 rounded-xl p-12 shadow-lg border border-slate-700 text-center">
                <Send className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                <h2 className="text-xl font-semibold mb-2">No sent messages</h2>
                <p className="text-slate-400 mb-4">
                  You haven't sent any encrypted messages yet.
                </p>
                <button onClick={() => setCurrentPage('compose')} className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all">
                  Compose First Message
                </button>
              </div>
            </div>
          )}

          {currentPage === 'spam' && (
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center space-x-3 mb-8">
                <ShieldAlert className="w-8 h-8 text-yellow-500" />
                <h1 className="text-3xl font-bold">Spam</h1>
                <span className="px-3 py-1 bg-yellow-600 rounded-full text-sm">0</span>
              </div>

              <div className="bg-slate-800 rounded-xl p-12 shadow-lg border border-slate-700 text-center">
                <ShieldAlert className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                <h2 className="text-xl font-semibold mb-2">No spam messages</h2>
                <p className="text-slate-400">
                  Messages marked as spam will appear here.
                </p>
              </div>
            </div>
          )}

          {currentPage === 'compose' && (
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center space-x-3 mb-8">
                <Send className="w-8 h-8 text-blue-500" />
                <h1 className="text-3xl font-bold">Compose Message</h1>
              </div>

              <div className="bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-700">
                <div className="flex items-center space-x-2 mb-6 p-3 bg-blue-900/20 border border-blue-700 rounded-lg">
                  <Lock className="w-5 h-5 text-blue-400" />
                  <p className="text-sm text-blue-300">
                    Your message will be encrypted with FHE before sending. Only the recipient can decrypt it.
                  </p>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Recipient Address
                    </label>
                    <input
                      type="text"
                      value={recipient}
                      onChange={(e) => setRecipient(e.target.value)}
                      placeholder="0x..."
                      className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <p className="text-xs text-slate-400 mt-1">
                      Enter the recipient's Ethereum address
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="Message subject..."
                      className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Message
                    </label>
                    <textarea
                      value={body}
                      onChange={(e) => setBody(e.target.value)}
                      placeholder="Write your encrypted message..."
                      className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                      rows={10}
                    />
                    <div className="flex justify-between items-center mt-1">
                      <p className="text-xs text-slate-400">
                        🔒 Message will be encrypted before sending
                      </p>
                      <p className="text-xs text-slate-400">
                        {body.length}/1000
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <button
                      onClick={handleSendMessage}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all flex items-center space-x-2 shadow-lg shadow-blue-500/20"
                    >
                      <Send className="w-4 h-4" />
                      <span>Send Encrypted Message</span>
                    </button>

                    <button
                      onClick={() => setCurrentPage('inbox')}
                      className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium transition-all"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-800 border-t border-slate-700 py-6">
        <div className="container mx-auto px-4 text-center text-slate-400 text-sm">
          <p>Built with ❤️ using Zama FHEVM • <a href="https://docs.zama.ai" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">Learn More</a></p>
          <p className="mt-2">© 2025 FHEMessage • BSD-3-Clause-Clear License</p>
        </div>
      </footer>
    </div>
  );
}

