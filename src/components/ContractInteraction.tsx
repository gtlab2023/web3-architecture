import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { hooks } from '@/connections/metaMask';
import { BigNumber } from '@ethersproject/bignumber';
import { BankSol, BankSol__factory } from '@/types/ethers-contracts';
import { CONTRACT_ADDRESS } from "@utils/contract";
import { toast } from 'react-hot-toast';

export default function ContractInteraction() {
  const { useProvider, useAccounts, useIsActive } = hooks;
  const isActive = useIsActive();
  const accounts = useAccounts();
  const account = accounts?.[0];
  const provider = useProvider();
  const { parseEther, formatEther } = ethers.utils;
  const [contract, setContract] = useState<BankSol | null>(null);
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [annualRate, setAnnualRate] = useState<BigNumber>(BigNumber.from(0));
  const [totalBalance, setTotalBalance] = useState(BigInt(0));
  const [contractBalance, setContractBalance] = useState(BigInt(0));

  const useReadContract = (args: { functionName: string, [key: string]: any }) => {
    return (async (config: { functionName: string, [key: string]: any }) => {
      if (!contract) return;
      const { functionName, ...params } = config;
      const data = await contract?.[functionName](params);
      console.log(123,functionName,data)
      return data;
    }).bind({}, args);
  };

  const fetchRate = useReadContract({ functionName: "ANNUAL_INTEREST_RATE" });
  const fetchTotalBalance = useReadContract({ functionName: "getTotalBalance" });
  const fetchContractBalance = useReadContract({ functionName: "getContractBalance" });

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

  useEffect(() => {
    if (contract) {
      fetchRate().then((data) => setAnnualRate(data));
      fetchTotalBalance().then((data) => setTotalBalance(data));
      fetchContractBalance().then((data) => setContractBalance(data));
    }
  }, [contract]);

  const writeContractAsync = async (config: { functionName: string, args?: any, value?: any }) => {
    if (!contract) return;
    const tx = await contract?.[config.functionName](...config.args, { value: config.value });
    await tx.wait();
  };

  const handleTransaction = async (txConfig: any) => {
    try {
      await toast.promise(
        writeContractAsync({
          ...txConfig,
          value: txConfig.value ? txConfig.value : undefined,
        }),
        {
          loading: "交易处理中...",
          success: "交易成功！",
          error: (err) => `交易失败: ${err.shortMessage}`,
        }
      );
      await fetchTotalBalance();
      await fetchContractBalance();
      if (txConfig.functionName === "deposit") {
        setDepositAmount("");
      } else {
        setWithdrawAmount("");
      }
    } catch (error) {
      console.error("Transaction error:", error);
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
                年利率: {annualRate ? `${annualRate.toNumber() / 100}%` : "--"}
              </p>
              <p className="flex items-center">
                <span className="bg-green-100 p-2 rounded-lg mr-2">💰</span>
                合约余额: {contractBalance ? formatEther(contractBalance) : "0"} ETH
              </p>
            </div>
            {isActive && (
              <div className="border-l pl-4">
                <p className="text-lg font-medium text-purple-600">
                  我的余额: {totalBalance ? formatEther(totalBalance) : "0"} ETH
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
                  onChange={(e) => setDepositAmount(e.target.value)}
                  placeholder="输入ETH数量"
                  className="flex-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
                <button
                  onClick={() =>
                    handleTransaction({
                      functionName: "deposit",
                      value: parseEther(depositAmount),
                    })
                  }
                  disabled={!depositAmount}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {"立即存入"}
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
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    placeholder="输入ETH数量"
                    className="flex-1 p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                  />
                  <button
                    onClick={() =>
                      handleTransaction({
                        functionName: "withdraw",
                        args: [parseEther(withdrawAmount)],
                      })
                    }
                    disabled={!withdrawAmount}
                    className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {"普通提款"}
                  </button>
                </div>
                <button
                  onClick={() =>
                    handleTransaction({
                      functionName: "withdrawAll",
                    })
                  }
                  className="w-full py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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