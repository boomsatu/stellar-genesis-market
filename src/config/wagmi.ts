import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { mainnet, polygon, optimism, arbitrum, sepolia } from 'wagmi/chains';

export const wagmiConfig = getDefaultConfig({
  appName: 'CyberNFT Marketplace',
  projectId: 'your-walletconnect-project-id',
  chains: [mainnet, polygon, optimism, arbitrum, sepolia],
  ssr: false,
});

export const chains = [mainnet, polygon, optimism, arbitrum, sepolia];