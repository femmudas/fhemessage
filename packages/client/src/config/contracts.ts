// Auto-generated - will be updated after deployment
export const CONTRACTS = {
  MessageStorage: import.meta.env.VITE_MESSAGE_STORAGE_ADDRESS || '',
} as const;

export const NETWORK = {
  name: import.meta.env.VITE_NETWORK || 'localhost',
  chainId: import.meta.env.VITE_NETWORK === 'sepolia' ? 11155111 : 31337,
} as const;

export const GATEWAY_URL = import.meta.env.VITE_GATEWAY_URL || 'https://gateway.zama.ai';