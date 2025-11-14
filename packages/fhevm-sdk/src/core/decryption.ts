import type { FhevmInstance } from 'fhevmjs';
import type { DecryptionOptions } from '../types';

export async function userDecrypt(
  fheInstance: FhevmInstance,
  handle: bigint,
  options: DecryptionOptions
): Promise<bigint> {
  const { contractAddress, signer, userAddress } = options;

  const chainId = await signer.provider!.getNetwork().then(n => Number(n.chainId));

  const domain = {
    name: 'Authorization',
    version: '1',
    chainId,
    verifyingContract: contractAddress,
  };

  const types = {
    Reencrypt: [{ name: 'publicKey', type: 'bytes' }],
  };

  const value = {
    publicKey: `0x${handle.toString(16).padStart(64, '0')}`,
  };

  const signature = await signer.signTypedData(domain, types, value);

  const decrypted = await fheInstance.reencrypt(
    handle,
    userAddress,
    contractAddress,
    signature
  );

  return BigInt(decrypted);
}
