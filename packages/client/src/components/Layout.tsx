import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useWallet } from '../context/WalletContext';
import { Inbox, Send, ShieldAlert, Plus, Lock } from 'lucide-react';
import clsx from 'clsx';

export default function Layout({ children }: { children: ReactNode }) {
  const { account, isConnected, isConnecting, connect, disconnect } = useWallet();
  const location = useLocation();

  const navItems = [
    { path: '/inbox', label: 'Inbox', icon: Inbox },
    { path: '/outbox', label: 'Outbox', icon: Send },
    { path: '/spam', label: 'Spam', icon: ShieldAlert },
  ];

  const shortenAddress = (address: string) => 
    `${address.slice(0, 6)}...${address.slice(-4)}`;

  return (
    <div className="min-h-screen flex flex-col bg-slate-900">
      <header className="bg-slate-800 border-b border-slate-700">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <Lock className="w-8 h-8 text-blue-500" />
              <span className="text-2xl font-bold text-white">FHEMessage</span>
            </Link>

            <div className="flex items-center space-x-4">
              {isConnected ? (
                <div className="flex items-center space-x-2">
                  <div className="px-4 py-2 bg-slate-700 rounded-lg text-sm">
                    {shortenAddress(account!)}
                  </div>
                  <button onClick={disconnect} className="btn btn-secondary text-sm">
                    Disconnect
                  </button>
                </div>
              ) : (
                <button
                  onClick={connect}
                  disabled={isConnecting}
                  className="btn btn-primary"
                >
                  {isConnecting ? 'Connecting...' : 'Connect Wallet'}
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {isConnected && (
        <nav className="bg-slate-800 border-b border-slate-700">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between">
              <div className="flex space-x-1">
                {navItems.map(({ path, label, icon: Icon }) => (
                  <Link
                    key={path}
                    to={path}
                    className={clsx(
                      'flex items-center space-x-2 px-4 py-3 text-sm font-medium transition-colors',
                      location.pathname === path
                        ? 'text-blue-400 border-b-2 border-blue-400'
                        : 'text-slate-400 hover:text-white'
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{label}</span>
                  </Link>
                ))}
              </div>

              <Link to="/compose" className="btn btn-primary my-2 flex items-center space-x-2">
                <Plus className="w-4 h-4" />
                <span>Compose</span>
              </Link>
            </div>
          </div>
        </nav>
      )}

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          {children}
        </div>
      </main>

      <footer className="bg-slate-800 border-t border-slate-700 py-6">
        <div className="container mx-auto px-4 text-center text-slate-400 text-sm">
          <p>Built with ❤️ using Zama FHEVM • <a href="https://docs.zama.ai" target="_blank" className="text-blue-400 hover:text-blue-300">Learn More</a></p>
          <p className="mt-2">© 2025 FHEMessage • BSD-3-Clause-Clear License</p>
        </div>
      </footer>
    </div>
  );
}
