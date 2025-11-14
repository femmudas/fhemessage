import { createInstance, initFhevm } from 'fhevmjs';
import type { FHEConfig } from '../types';

let globalInstance: any = null;
let isInitialized = false;

export async function initializeFHEVM(): Promise<void> {
  if (!isInitialized) {
    await initFhevm();
    isInitialized = true;
  }
}

export async function createFHEInstance(config: FHEConfig) {
  await initializeFHEVM();
  
  if (globalInstance) return globalInstance;
  
  const instance = await createInstance({
    chainId: config.chainId,
    publicKey: '0x00',
    gatewayUrl: config.gatewayUrl || 'https://gateway.zama.ai',
  });
  
  globalInstance = instance;
  return instance;
}

export function getFHEInstance() {
  return globalInstance;
}

export function resetFHEInstance(): void {
  globalInstance = null;
}
