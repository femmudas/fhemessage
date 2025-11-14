import type { FhevmInstance } from 'fhevmjs';

export async function createEncryptedInput(
  fheInstance: FhevmInstance,
  contractAddress: string,
  userAddress: string
) {
  return fheInstance.createEncryptedInput(contractAddress, userAddress);
}

export async function encryptString(
  fheInstance: FhevmInstance,
  contractAddress: string,
  userAddress: string,
  message: string
) {
  const input = await createEncryptedInput(fheInstance, contractAddress, userAddress);
  
  const encoder = new TextEncoder();
  const bytes = encoder.encode(message);
  const value = bytesToBigInt(bytes);
  
  input.addUint256(value);
  return input.encrypt();
}

export function bytesToBigInt(bytes: Uint8Array): bigint {
  let result = 0n;
  for (let i = 0; i < bytes.length && i < 32; i++) {
    result = (result << 8n) | BigInt(bytes[i]);
  }
  return result;
}

export function bigIntToBytes(value: bigint): Uint8Array {
  const hex = value.toString(16).padStart(64, '0');
  const bytes = new Uint8Array(32);
  for (let i = 0; i < 32; i++) {
    bytes[i] = parseInt(hex.substr(i * 2, 2), 16);
  }
  return bytes;
}

export function decodeEncryptedString(decryptedValue: bigint): string {
  const bytes = bigIntToBytes(decryptedValue);
  const decoder = new TextDecoder();
  return decoder.decode(bytes).replace(/\0/g, '');
}
