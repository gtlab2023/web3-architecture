
import { CONTRACT_ABI,CONTRACT_ADDRESS} from '@utils/contract'
import { useAccount, useReadContract, useWriteContract, useBlock, useEstimateGas } from 'wagmi'
import { parseEther, formatEther } from 'viem'
import { useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'
// 合约配置
const contractConfig = {
  address: CONTRACT_ADDRESS as `0x${string}`,
  abi: CONTRACT_ABI
}
export default function ContractInteraction() {
  const { address, isConnected } = useAccount()
  const [depositAmount, setDepositAmount] = useState('')
  const [withdrawAmount, setWithdrawAmount] = useState('')
  // Gas估算
  const { data: depositGas, error: depositGasError } = useEstimateGas({
    account: address,
    to: contractConfig.address,
    functionName: 'deposit',
    value: depositAmount ? parseEther(depositAmount) : undefined,
    query: {
      enabled: !!depositAmount && isConnected,
      retry: 2
    }
  })
  const { data: withdrawGas, error: withdrawGasError } = useEstimateGas({
    account: address,
    to: contractConfig.address,
    functionName: 'withdraw',
    args: withdrawAmount ? [parseEther(withdrawAmount)] : undefined,
    query: {
      enabled: !!withdrawAmount && isConnected,
      retry: 2
    }
  })
  // 自动刷新
  const { data: blockData } = useBlock({watch:true})

  // 合约读取
  const { data: annualRate } = useReadContract({
    ...contractConfig,
    functionName: 'ANNUAL_INTEREST_RATE',
    query: { staleTime: Infinity }
  })
  const { data: totalBalance ,refetch:refetchTotalBalance} = useReadContract({
    ...contractConfig,
    functionName: 'getTotalBalance',
    args: [address!],
    query: { enabled: isConnected }
  })
  const { data: contractBalance, refetch:refetchContractBalance} = useReadContract({
    ...contractConfig,
    functionName: 'getContractBalance',
  })
  // 交易处理
  const { writeContractAsync, isPending } = useWriteContract()
  const handleTransaction = async (txConfig: any) => {
    try {
      await toast.promise(
        writeContractAsync({
          ...txConfig,
          gas: depositGas || withdrawGas || 500000n // 设置安全gas上限
        }),
        {
          loading: '交易处理中...',
          success: '交易成功！',
          error: (err) => `交易失败: ${err.shortMessage}`
        }
      )
      await refetchTotalBalance()
      await refetchContractBalance()
      if(txConfig.functionName === 'deposit'){
        setDepositAmount('')
      }else{
        setWithdrawAmount('')
      }
    } catch (error) {
      console.error('Transaction error:', error)
    }
  }
  useEffect(() => {
    if (depositGasError) {
      toast.error(`存款gas估算失败: ${depositGasError.message}`)
    }
    if (withdrawGasError) {
      toast.error(`提款gas估算失败: ${withdrawGasError.message}`)
    }
  }, [depositGasError, withdrawGasError])
  useEffect(() => {
    if (blockData?.number) {
      refetchContractBalance();
      refetchTotalBalance();
    }
  }, [blockData?.number])
  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-50 min-h-screen">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-blue-600">DeFi Bank</h1>
      </header>
      <div className="space-y-6">
        {/* 合约信息卡片 */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">📊 合约信息</h2>
          <div className="grid grid-cols-2 gap-4 text-gray-700">
            <div className="space-y-2">
              <p className="flex items-center">
                <span className="bg-blue-100 p-2 rounded-lg mr-2">📈</span>
                年利率: {annualRate ? `${(annualRate / 100n)}%` : '--'}
              </p>
              <p className="flex items-center">
                <span className="bg-green-100 p-2 rounded-lg mr-2">💰</span>
                合约余额: {contractBalance ? formatEther(contractBalance) : '0'} ETH
              </p>
            </div>
            {isConnected && (
              <div className="border-l pl-4">
                <p className="text-lg font-medium text-purple-600">
                  我的余额: {totalBalance ? formatEther(totalBalance) : '0'} ETH
                </p>
              </div>
            )}
          </div>
        </div>
        {isConnected && (
          <div className="space-y-6">
            {/* 存款表单 */}
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
                  onClick={() => handleTransaction({
                    ...contractConfig,
                    functionName: 'deposit',
                    value: parseEther(depositAmount)
                  })}
                  disabled={!depositAmount || isPending}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isPending ? '处理中...' : '立即存入'}
                </button>
              </div>
            </div>
            {/* 提款表单 */}
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
                    onClick={() => handleTransaction({
                      ...contractConfig,
                      functionName: 'withdraw',
                      args: [parseEther(withdrawAmount)]
                    })}
                    disabled={!withdrawAmount || isPending}
                    className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {isPending ? '处理中...' : '普通提款'}
                  </button>
                </div>
                <button
                  onClick={() => handleTransaction({
                    ...contractConfig,
                    functionName: 'withdrawAll'
                  })}
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
  )
}