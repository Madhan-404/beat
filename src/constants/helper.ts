import { baseSepolia, optimismSepolia, sepolia } from "viem/chains";

export const OFTFactoryAddress = "0x59363B0f9896eF3C99b603B00f49B618949663eb";

export const EndpointV2Address = "0x6EDCE65403992e310A62460808c4b910D972f10f";

export type ChainId = "base-sepolia" | "optimism-sepolia" | "eth-sepolia";

export interface ChainInfo {
  name: string;
  lzEndpointId: number;
}

export const SUPPORTED_CHAINS = [baseSepolia, sepolia, optimismSepolia];

export const ChainData: Record<ChainId, ChainInfo> = {
  "base-sepolia": {
    name: "Base Sepolia",
    lzEndpointId: 40245,
  },
  "optimism-sepolia": {
    name: "Optimism Sepolia",
    lzEndpointId: 40232,
  },
  "eth-sepolia": {
    name: "Ethereum Sepolia",
    lzEndpointId: 40161,
  },
};

export const getChainInfo = (chainId: ChainId): ChainInfo => {
  return ChainData[chainId];
};

export const getLZEndpointId = (chainId: ChainId): number => {
  return ChainData[chainId].lzEndpointId;
};

export const getSupportedChains = (): ChainId[] => {
  return Object.keys(ChainData) as ChainId[];
};
