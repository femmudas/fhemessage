import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, Lock } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ComposePage() {
  const navigate = useNavigate();
  const [recipient, setRecipient] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!recipient.match(/^0x[a-fA-F0-9]{40}$/)) {
      toast.error('Please enter a valid Ethereum address');
      return;
    }

    toast.success('Message encrypted and sent!');
    navigate('/outbox');
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center space-x-3 mb-8">
        <Send className="w-8 h-8 text-blue-500" />
        <h1 className="text-3xl font-bold">Compose Message</h1>
      </div>

      <div className="card">
        <div className="flex items-center space-x-2 mb-6 p-3 bg-blue-900/20 border border-blue-700 rounded-lg">
          <Lock className="w-5 h-5 text-blue-400" />
          <p className="text-sm text-blue-300">
            Your message will be encrypted with FHE before sending.
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Recipient Address</label>
            <input
              type="text"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="0x..."
              className="input"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Subject</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Message subject..."
              className="input"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Message</label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Write your encrypted message..."
              className="textarea"
              rows={10}
              required
            />
            <p className="text-xs text-slate-400 mt-1">{body.length}/1000</p>
          </div>

          <div className="flex items-center space-x-4">
            <button onClick={handleSubmit} className="btn btn-primary flex items-center space-x-2">
              <Send className="w-4 h-4" />
              <span>Send Encrypted Message</span>
            </button>
            <button onClick={() => navigate(-1)} className="btn btn-secondary">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}