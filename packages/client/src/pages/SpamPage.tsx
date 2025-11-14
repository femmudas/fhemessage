import { ShieldAlert } from 'lucide-react';

export default function SpamPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center space-x-3 mb-8">
        <ShieldAlert className="w-8 h-8 text-yellow-500" />
        <h1 className="text-3xl font-bold">Spam</h1>
        <span className="px-3 py-1 bg-yellow-600 rounded-full text-sm">0</span>
      </div>

      <div className="card text-center py-12">
        <ShieldAlert className="w-16 h-16 text-slate-600 mx-auto mb-4" />
        <h2 className="text-xl font-semibold mb-2">No spam messages</h2>
        <p className="text-slate-400">Messages marked as spam will appear here.</p>
      </div>
    </div>
  );
}