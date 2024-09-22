import { MYOFTABI } from "@/constants/MyOFTABI";
import { useEffect, useState } from "react";
import { createPublicClient, http } from "viem";
import { sepolia, baseSepolia } from "viem/chains";

declare global {
  interface Window {
    ethereum?: any;
  }
}

export const getViemClient = (chainId: number) => {
  let chain;
  switch (chainId) {
    case 84532:
      chain = baseSepolia;
      break;
    case 11155111:
      chain = sepolia;
      break;
    default:
      throw new Error(`Unsupported chain ID: ${chainId}`);
  }

  return createPublicClient({
    chain,
    transport: http(
      "https://base-sepolia.g.alchemy.com/v2/fBWWVmE9-nfSRozFRH9tHmWGVTI-l_Hm"
    ),
  });
};

type MintArgs = {
  buyer: string;
  amount: bigint;
  timestamp: bigint;
};

type BurnArgs = {
  seller: string;
  amount: bigint;
  timestamp: bigint;
};

type TokensHistory =
  | {
      name: "Mint";
      args: MintArgs;
    }
  | {
      name: "Burn";
      args: BurnArgs;
    };

export function useTokenHistory(tokenAddress: string, chainId: number) {
  const [eventArgs, setEventArgs] = useState<TokensHistory[]>([]);

  useEffect(() => {
    async function fetchEvents() {
      if (typeof window.ethereum === "undefined") {
        return;
      }
      try {
        const client = getViemClient(84532);

        const events = await client.getContractEvents({
          abi: MYOFTABI,
          address: tokenAddress as `0x${string}`,
          fromBlock: BigInt(0),
          toBlock: "latest",
        });
        console.log("e", events);
        const argsArray: TokensHistory[] = events
          .map((event): TokensHistory | undefined => {
            if (event.eventName === "Mint") {
              return {
                name: "Mint",
                args: event.args as MintArgs,
              };
            } else if (event.eventName === "Burn") {
              return {
                name: "Burn",
                args: event.args as BurnArgs,
              };
            }
            return undefined;
          })
          .filter((event): event is TokensHistory => event !== undefined);

        setEventArgs(argsArray);
        console.log("Event Args:", argsArray);
      } catch (err) {
        console.error("Error fetching events:", err);
      }
    }

    fetchEvents();
  }, [chainId, tokenAddress]);

  return eventArgs;
}
