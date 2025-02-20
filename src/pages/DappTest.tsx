import { useAccount } from "wagmi";
import {useEffect} from "react";
import ContractInteraction from '@components/ContractInteraction'
const DappTest = () => {
  const {address,isConnecting,isDisconnected} = useAccount();
  useEffect(() => {
    console.log('address',address)
  },[address])
  if(isConnecting){
    return <div>Connecting...</div>
  }
  if(isDisconnected){
    return <div>Disconnected</div>
  }

  return <ContractInteraction />;
}

export default DappTest;