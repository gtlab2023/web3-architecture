import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Home, Grid, Wallet } from 'lucide-react';
import { ConnectKitButton } from "connectkit";
const Header: React.FC = () => {
  const [isConnected, setIsConnected] = useState(false);

  const handleConnectWallet = () => {
    // 这里添加连接钱包的逻辑
    setIsConnected(true);
  };

  return (
    <header className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* 左侧 Logo */}
          <div className="text-2xl font-bold">
            DAppLogo
          </div>

          {/* 中间导航菜单 */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="flex items-center hover:text-gray-200 transition duration-150 ease-in-out">
              <Home className="w-5 h-5 mr-2" />
              Home
            </Link>
            <Link to="/dapp" className="flex items-center hover:text-gray-200 transition duration-150 ease-in-out">
              <Grid className="w-5 h-5 mr-2" />
              DApp
            </Link>
          </nav>

          {/* 右侧钱包连接按钮 */}
          <ConnectKitButton></ConnectKitButton>
          {/* <button
            onClick={handleConnectWallet}
            className={`flex items-center px-4 py-2 rounded-full transition duration-150 ease-in-out ${
              isConnected
                ? 'bg-green-500 hover:bg-green-600'
                : 'bg-blue-500 hover:bg-blue-600'
            }`}
          >
            <Wallet className="w-5 h-5 mr-2" />
            {isConnected ? 'Connected' : 'Connect Wallet'}
          </button> */}
        </div>
      </div>
    </header>
  );
};

export default Header;
