import { WagmiProvider, createConfig, http } from "wagmi";
import { mainnet,sepolia,localhost } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";

const config = createConfig(
  getDefaultConfig({
    // Your dApps chains
    chains: [mainnet,sepolia,localhost],
    transports: {
      // RPC URL for each chain
      [mainnet.id]: http(
        mainnet.rpcUrls.default.http[0]
      ),
      [sepolia.id]: http(
        sepolia.rpcUrls.default.http[0]
      ),
      [localhost.id]: http("http://127.0.0.1:7545"),
    },

    // Required API Keys
    walletConnectProjectId: process.env.PUBLIC_WALLETCONNECT_PROJECT_ID as string ,

    // Required App Info
    appName: "Your App Name",

    // Optional App Info
    appDescription: "Your App Description",
    appUrl: "https://family.co", // your app's url
    appIcon: "https://family.co/logo.png", // your app's icon, no bigger than 1024x1024px (max. 1MB)
  }),
);

const queryClient = new QueryClient();

export const Web3Provider = ({ children }) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider>{children}</ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
