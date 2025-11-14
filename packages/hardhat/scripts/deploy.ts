import { ethers } from 'hardhat';
import fs from 'fs';
import path from 'path';

async function main() {
  console.log('🚀 Starting FHEMessage deployment...\n');

  const [deployer] = await ethers.getSigners();
  const network = await ethers.provider.getNetwork();

  console.log('📍 Network:', network.name);
  console.log('🔑 Deployer:', deployer.address);
  console.log('💰 Balance:', ethers.formatEther(await ethers.provider.getBalance(deployer.address)), 'ETH\n');

  console.log('📦 Deploying MessageStorage contract...');
  const MessageStorage = await ethers.getContractFactory('MessageStorage');
  const messageStorage = await MessageStorage.deploy();
  await messageStorage.waitForDeployment();
  
  const messageStorageAddress = await messageStorage.getAddress();
  console.log('✅ MessageStorage deployed to:', messageStorageAddress);

  const deploymentInfo = {
    network: network.name,
    chainId: Number(network.chainId),
    contracts: {
      MessageStorage: messageStorageAddress,
    },
    deployer: deployer.address,
    timestamp: new Date().toISOString(),
  };

  const deploymentsDir = path.join(__dirname, '../deployments');
  if (!fs.existsSync(deploymentsDir)) {
    fs.mkdirSync(deploymentsDir, { recursive: true });
  }

  const deploymentPath = path.join(deploymentsDir, `${network.name}-latest.json`);
  fs.writeFileSync(deploymentPath, JSON.stringify(deploymentInfo, null, 2));

  const frontendConfig = `export const CONTRACTS = {
  MessageStorage: '${messageStorageAddress}',
} as const;

export const NETWORK = {
  name: '${network.name}',
  chainId: ${network.chainId},
} as const;
`;

  const clientConfigDir = path.join(__dirname, '../../client/src/config');
  if (!fs.existsSync(clientConfigDir)) {
    fs.mkdirSync(clientConfigDir, { recursive: true });
  }

  fs.writeFileSync(path.join(clientConfigDir, 'contracts.ts'), frontendConfig);

  console.log('\n✅ Frontend config generated');
  console.log('\n🎉 Deployment completed successfully!');
  console.log('\n📋 Contract Address:', messageStorageAddress);
  console.log('\n💡 Update your .env with:');
  console.log(`   VITE_MESSAGE_STORAGE_ADDRESS=${messageStorageAddress}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('❌ Deployment failed:', error);
    process.exit(1);
  });
