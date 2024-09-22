import Navbar from "@/components/Navbar";
import ThemeProvider from "@/components/providers/theme";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import client from "@/lib/graphqlClient";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createConfig, http, WagmiProvider } from "wagmi";
import { baseSepolia, optimismSepolia, sepolia } from "viem/chains";
import { coinbaseWallet, walletConnect } from "wagmi/connectors";
import Web3AuthConnectorInstance from "@/lib/web3Auth";
import { SUPPORTED_CHAINS } from "@/constants/helper";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  const config = createConfig({
    chains: [baseSepolia, sepolia, optimismSepolia],
    transports: {
      [baseSepolia.id]: http(),
      [sepolia.id]: http(),
      [optimismSepolia.id]: http(),
    },
    connectors: [
      walletConnect({
        projectId: "3314f39613059cb687432d249f1658d2",
        showQrModal: true,
      }),
      coinbaseWallet({ appName: "wagmi" }),
      Web3AuthConnectorInstance(SUPPORTED_CHAINS),
    ],
  });

  return (
    <ApolloProvider client={client}>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            <Component {...pageProps} />
          </ThemeProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </ApolloProvider>
  );
}
