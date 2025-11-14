interface Window {
  ethereum?: {
    isMetaMask?: boolean;
    request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
    send: (method: string, params?: unknown[]) => Promise<unknown>;
    on: (event: 'accountsChanged' | 'chainChanged', handler: (...args: any[]) => void) => void;
    removeListener: (event: 'accountsChanged' | 'chainChanged', handler: (...args: any[]) => void) => void;
    removeAllListeners: (event: string) => void;
  };
}

/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_MESSAGE_STORAGE_ADDRESS?: string;
  readonly VITE_NETWORK?: string;
  readonly VITE_GATEWAY_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

