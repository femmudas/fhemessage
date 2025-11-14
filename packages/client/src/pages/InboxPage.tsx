import { useState } from 'react';
import { Inbox, RefreshCw } from 'lucide-react';
import MessageCard from '../components/MessageCard';

// Mock data - replace with real data from hooks
const mockMessages = [
  {
    id: 1,
    from: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
    to: '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199',
    subject: 'Welcome to FHEMessage!',
    body: 'This is your first encrypted message.',
    timestamp: new Date('2025-10-26T10:30:00'),
    isRead: false,
    isDecrypted: false,
  },
];

export default function InboxPage() {
  const [messages, setMessages] = useState(mockMessages);

  const handleDecrypt = (id: number) => {
    setMessages(messages.map(msg => msg.id === id ? { ...msg, isDecrypted: true } : msg));
  };

  const handleMarkAsRead = (id: number) => {
    setMessages(messages.map(msg => msg.id === id ? { ...msg, isRead: true } : msg));
  };

  const handleMarkAsSpam = (id: number) => {
    setMessages(messages.filter(msg => msg.id !== id));
  };

  const handleDelete = (id: number) => {
    setMessages(messages.filter(msg => msg.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-3">
          <Inbox className="w-8 h-8 text-blue-500" />
          <h1 className="text-3xl font-bold">Inbox</h1>
          <span className="px-3 py-1 bg-blue-600 rounded-full text-sm">{messages.length}</span>
        </div>
        <button className="btn btn-secondary flex items-center space-x-2">
          <RefreshCw className="w-4 h-4" />
          <span>Refresh</span>
        </button>
      </div>

      {messages.length === 0 ? (
        <div className="card text-center py-12">
          <Inbox className="w-16 h-16 text-slate-600 mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">No messages yet</h2>
          <p className="text-slate-400">Your inbox is empty.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map(message => (
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
      )}
    </div>
  );
}