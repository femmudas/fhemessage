export const MESSAGE_STORAGE_ABI = [
  'function sendMessage(address to, bytes encryptedSubject, bytes inputProofSubject, bytes encryptedBody, bytes inputProofBody) returns (uint256)',
  'function getMessage(uint256 messageId) view returns (uint256 id, address from, address to, uint64 timestamp, bool isRead, bool isSpam)',
  'function getEncryptedSubject(uint256 messageId) view returns (uint256)',
  'function getEncryptedBody(uint256 messageId) view returns (uint256)',
  'function markAsRead(uint256 messageId)',
  'function markAsSpam(uint256 messageId)',
  'function getInbox(address user) view returns (uint256[])',
  'function getOutbox(address user) view returns (uint256[])',
  'function getSpam(address user) view returns (uint256[])',
  'event MessageSent(uint256 indexed messageId, address indexed from, address indexed to, uint64 timestamp)',
] as const;