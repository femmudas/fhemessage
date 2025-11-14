import { Mail, MailOpen, Trash2, ShieldAlert, Eye } from 'lucide-react';
import { format } from 'date-fns';
import clsx from 'clsx';

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

export default function MessageCard({
  message,
  onDecrypt,
  onMarkAsRead,
  onMarkAsSpam,
  onDelete,
  type,
}: MessageCardProps) {
  const shortenAddress = (addr: string) => `${addr.slice(0, 6)}...${addr.slice(-4)}`;

  return (
    <div className={clsx(
      'card transition-all hover:shadow-xl cursor-pointer',
      !message.isRead && type === 'inbox' && 'border-l-4 border-blue-500'
    )}>
      <div className="flex items-start justify-between" onClick={() => !message.isDecrypted && onDecrypt(message.id)}>
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            {message.isRead ? (
              <MailOpen className="w-5 h-5 text-slate-400" />
            ) : (
              <Mail className="w-5 h-5 text-blue-500" />
            )}
            <div>
              <p className="text-sm text-slate-400">
                {type === 'inbox' ? 'From' : 'To'}: <span className="text-white font-medium">
                  {shortenAddress(type === 'inbox' ? message.from : message.to)}
                </span>
              </p>
              <p className="text-xs text-slate-500">{format(message.timestamp, 'PPpp')}</p>
            </div>
          </div>

          {message.isDecrypted ? (
            <div>
              <h3 className="font-semibold text-white mb-2">{message.subject}</h3>
              <p className="text-slate-300">{message.body}</p>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Eye className="w-4 h-4 text-slate-500" />
              <p className="text-slate-500 italic">Click to decrypt message</p>
            </div>
          )}
        </div>

        <div className="flex items-center space-x-2 ml-4">
          {type === 'inbox' && !message.isRead && onMarkAsRead && (
            <button onClick={(e) => { e.stopPropagation(); onMarkAsRead(message.id); }} className="p-2 hover:bg-slate-700 rounded-lg" title="Mark as read">
              <MailOpen className="w-4 h-4 text-slate-400" />
            </button>
          )}
          {type === 'inbox' && onMarkAsSpam && (
            <button onClick={(e) => { e.stopPropagation(); onMarkAsSpam(message.id); }} className="p-2 hover:bg-slate-700 rounded-lg" title="Mark as spam">
              <ShieldAlert className="w-4 h-4 text-yellow-400" />
            </button>
          )}
          <button onClick={(e) => { e.stopPropagation(); onDelete(message.id); }} className="p-2 hover:bg-slate-700 rounded-lg" title="Delete">
            <Trash2 className="w-4 h-4 text-red-400" />
          </button>
        </div>
      </div>
    </div>
  );
}