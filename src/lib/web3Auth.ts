// Web3Auth Libraries
import { Web3AuthConnector } from "@web3auth/web3auth-wagmi-connector";
import { Web3Auth } from "@web3auth/modal";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import {
  CHAIN_NAMESPACES,
  WEB3AUTH_NETWORK,
  WALLET_ADAPTERS,
  IProvider,
} from "@web3auth/base";
import { Chain } from "wagmi/chains";
import { WalletServicesPlugin } from "@web3auth/wallet-services-plugin";
import { CreateConnectorFn } from "wagmi";

let web3AuthInstance: Web3Auth | null = null;
let web3AuthConnectorInstance: CreateConnectorFn<IProvider, {}, {}> | null =
  null;

export default function Web3AuthConnectorInstance(chains: Chain[]) {
  if (web3AuthConnectorInstance) {
    return web3AuthConnectorInstance;
  }
  const web3AuthInstance = getWeb3AuthInstance(chains);

  const walletServicesPlugin = new WalletServicesPlugin({
    walletInitOptions: {
      whiteLabel: {
        showWidgetButton: true,
      },
    },
  });
  web3AuthInstance.addPlugin(walletServicesPlugin);

  const modalConfig = {
    [WALLET_ADAPTERS.OPENLOGIN]: {
      label: "openlogin",
      loginMethods: {
        facebook: {
          // it will hide the facebook option from the Web3Auth modal.
          name: "facebook login",
          showOnModal: false,
        },
      },
      // setting it to false will hide all social login methods from modal.
      showOnModal: true,
    },
  };

  web3AuthConnectorInstance = Web3AuthConnector({
    web3AuthInstance,
    modalConfig,
  });

  return web3AuthConnectorInstance;
}

export const getWeb3AuthInstance = (chains: Chain[]): Web3Auth => {
  if (web3AuthInstance) {
    return web3AuthInstance;
  }

  const name = "beat";
  const chainConfig = {
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    chainId: "0x" + chains[0].id.toString(16),
    rpcTarget: chains[0].rpcUrls.default.http[0], // This is the public RPC we have added, please pass on your own endpoint while creating an app
    displayName: chains[0].name,
    tickerName: chains[0].nativeCurrency?.name,
    ticker: chains[0].nativeCurrency?.symbol,
    blockExplorerUrl: chains[0].blockExplorers?.default.url[0] as string,
  };

  const privateKeyProvider = new EthereumPrivateKeyProvider({
    config: { chainConfig },
  });

  // Create a new Web3Auth instance
  web3AuthInstance = new Web3Auth({
    clientId: process.env.NEXT_PUBLIC_WEB3_AUTH_CLIENTID!,
    chainConfig,
    privateKeyProvider,
    uiConfig: {
      appName: name,
      loginMethodsOrder: ["github", "google"],
      defaultLanguage: "en",
      modalZIndex: "2147483647",
      logoLight: "https://web3auth.io/images/web3authlog.png",
      logoDark: "https://web3auth.io/images/web3authlogodark.png",
      uxMode: "redirect",
      mode: "light",
    },
    web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_MAINNET,
    enableLogging: true,
  });

  return web3AuthInstance;
};
