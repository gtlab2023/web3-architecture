import { useEffect, useState } from 'react';

import { hooks, metaMask } from '@connections/metaMask';
import { Card } from './Card';

const { useChainId, useAccounts, useIsActivating, useIsActive, useProvider, useENSNames } = hooks;

export default function MetaMaskCard() {
  const chainId = useChainId();
  const accounts = useAccounts();
  //获取链接状态
  const isActivating = useIsActivating();
  //获取是否钱包已激活
  const isActive = useIsActive();
  //代替我们操作钱包的所有权限 钱包签名之类的
  const provider = useProvider();
  //获取ENSNames 0x88888rtrfgt -> laoyuan.eth
  const ENSNames = useENSNames(provider);

  const [error, setError] = useState<Error | undefined>(undefined);

  // 尽早的链接钱包
  useEffect(() => {
    void metaMask.connectEagerly().catch(() => {
      console.debug('Failed to connect eagerly to metamask');
    });
  }, []);

  return (
    <Card
      connector={metaMask}
      activeChainId={chainId}
      isActivating={isActivating}
      isActive={isActive}
      error={error}
      setError={setError}
      accounts={accounts}
      provider={provider}
      ENSNames={ENSNames}
    />
  );
}
