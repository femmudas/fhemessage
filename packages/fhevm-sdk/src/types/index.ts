import type { FhevmInstance } from 'fhevmjs';
import type { Signer, Provider } from 'ethers';

export interface FHEConfig {
  provider: Provider;
  chainId: number;
  gatewayUrl?: string;
}

export interface EncryptedInput {
  handles: string[];
  inputProof: string;
}

export interface DecryptionOptions {
  contractAddress: string;
  signer: Signer;
  userAddress: string;
}

export type EncryptionType = 'euint8' | 'euint16' | 'euint32' | 'euint64' | 'euint128' | 'euint256' | 'ebool' | 'eaddress';

export interface MessageData {
  id: bigint;
  from: string;
  to: string;
  subject: string;
  body: string;
  timestamp: Date;
  isRead: boolean;
  isDecrypted: boolean;
}
