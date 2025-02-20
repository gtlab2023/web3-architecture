// src/hooks/useWalletConnection.ts
import { useConnectModal } from 'connectkit';
import { useAccount, useDisconnect } from 'wagmi';

export const useWalletConnection = () => {
  const { address, isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();
  const { disconnect } = useDisconnect();

  const handleConnectWallet = () => {
    if (isConnected) {
      disconnect();
    } else {
      openConnectModal();
    }
  };

  return {
    address,
    isConnected,
    handleConnectWallet,
  };
};
