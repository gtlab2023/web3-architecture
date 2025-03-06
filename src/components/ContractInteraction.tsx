import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { hooks } from '@/connections/metaMask';
import { BigNumber } from '@ethersproject/bignumber';
import { BankSol, BankSol__factory } from '@/types/ethers-contracts';
import { CONTRACT_ADDRESS } from '@utils/contract';

function ContractInteraction() {
  const { useProvider, useAccounts, useIsActive } = hooks;
  const isActive = useIsActive();
  const accounts = useAccounts();
  const account = accounts?.[0];
  const provider = useProvider();
  const { parseEther, formatEther } = ethers.utils;
  const [contract, setContract] = useState<BankSol | null>(null);
  const [depositAmount, setDepositAmount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [annualRate, setAnnualRate] = useState<BigNumber>(BigNumber.from(0));
  const [totalBalance, setTotalBalance] = useState(BigNumber.from(0));
  const [contractBalance, setContractBalance] = useState(BigNumber.from(0));

  const fetchRate = async () => {
    if (!contract) {
      return;
    }
    const data = await contract?.ANNUAL_INTEREST_RATE();
    setAnnualRate(data);
  };

  const fetchTotalBalance = async () => {
    if (!contract || !account) {
      return;
    }
    const data = await contract.getTotalBalance(account);
    setTotalBalance(data);
  };
  const fetchContractBalance = async () => {
    if (!contract) {
      return;
    }
    const data = await contract.getContractBalance();
    setContractBalance(data);
  };

  useEffect(() => {
    if (provider && account) {
      const signer = provider.getSigner();
      const contractInstance = BankSol__factory.connect(CONTRACT_ADDRESS, signer);
      setContract(contractInstance);

      contractInstance.on('Deposit', (user, amount) => {
        console.log(user, amount);
      });

      return () => {
        contractInstance.removeAllListeners();
      };
    }
  }, [provider, account]);

  const getReeadInfo = () => {
    fetchRate();
    fetchTotalBalance();
    fetchContractBalance();
  };
  useEffect(() => {
    if (contract) {
      getReeadInfo();
    }
  }, [contract]);

  const writeContractAsync = async (config: { functionName: string; value?: any }) => {
    if (!contract) return;
    let tx: ethers.ContractTransaction;
    switch (config.functionName) {
      case 'deposit':
        tx = await contract.deposit({ value: config.value, from: account });
        tx.wait();
        break;
      case 'withdraw':
        tx = await contract.withdraw(config.value, { from: account });
        tx.wait();
        break;
      case 'withdrawAll':
        await contract.withdrawAll();
        break;
    }
  };

  const handleTransaction = async (txConfig: any) => {
    try {
      await writeContractAsync({
        ...txConfig,
        value: txConfig.value ? txConfig.value : undefined,
      });

      await fetchTotalBalance();
      await fetchContractBalance();
      if (txConfig.functionName === 'deposit') {
        setDepositAmount('');
      } else {
        setWithdrawAmount('');
      }
    } catch (error) {
      console.error('Transaction error:', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-50 min-h-screen">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-blue-600">DeFi Bank</h1>
      </header>
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">📊 合约信息</h2>
          <div className="grid grid-cols-2 gap-4 text-gray-700">
            <div className="space-y-2">
              <p className="flex items-center">
                <span className="bg-blue-100 p-2 rounded-lg mr-2">📈</span>
                年利率: {annualRate ? `${annualRate.toNumber() / 100}%` : '--'}
              </p>
              <p className="flex items-center">
                <span className="bg-green-100 p-2 rounded-lg mr-2">💰</span>
                合约余额: {contractBalance ? formatEther(contractBalance) : '0'} ETH
              </p>
            </div>
            {isActive && (
              <div className="border-l pl-4">
                <p className="text-lg font-medium text-purple-600">
                  我的余额: {totalBalance ? formatEther(totalBalance) : '0'} ETH
                </p>
              </div>
            )}
          </div>
        </div>
        {isActive && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h2 className="text-xl font-semibold mb-4">💸 存款</h2>
              <div className="flex gap-4">
                <input
                  type="number"
                  value={depositAmount}
                  onChange={e => setDepositAmount(e.target.value)}
                  placeholder="输入ETH数量"
                  className="flex-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
                <button
                  onClick={() =>
                    handleTransaction({
                      functionName: 'deposit',
                      value: parseEther(depositAmount),
                    })
                  }
                  disabled={!depositAmount}
                  className="cursor-pointer px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {'立即存入'}
                </button>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h2 className="text-xl font-semibold mb-4">🤑 提款</h2>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <input
                    type="number"
                    value={withdrawAmount}
                    onChange={e => setWithdrawAmount(e.target.value)}
                    placeholder="输入ETH数量"
                    className="flex-1 p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                  />
                  <button
                    onClick={() =>
                      handleTransaction({
                        functionName: 'withdraw',
                        value: parseEther(withdrawAmount),
                      })
                    }
                    disabled={!withdrawAmount}
                    className="cursor-pointer px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {'普通提款'}
                  </button>
                </div>
                <button
                  onClick={() =>
                    handleTransaction({
                      functionName: 'withdrawAll',
                    })
                  }
                  className="cursor-pointer w-full py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  一键全提
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ContractInteraction;
