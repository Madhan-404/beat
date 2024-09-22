import { MYOFTABI } from "@/constants/MyOFTABI";
import { useState, useEffect } from "react";
import {
  createPublicClient,
  http,
  parseAbi,
  formatEther,
  parseEther,
} from "viem";
import { mainnet, goerli, sepolia, baseSepolia } from "viem/chains";

declare global {
  interface Window {
    ethereum?: any;
  }
}

const getViemClient = (chainId: number) => {
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
    transport: http(),
  });
};

export function useTokenPrice(
  tokenAddress: string,
  amount: string = "1",
  chainId: string,
) {
  const [price, setPrice] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const chainIdParsed = chainId.toString().split("_")[0];

  useEffect(() => {
    async function calculatePrice() {
      if (typeof window.ethereum === "undefined") {
        setError("No Ethereum wallet detected");
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const client = getViemClient(+chainIdParsed);
        const amountInWei = parseEther(amount);

        const priceInWei = await client.readContract({
          address: tokenAddress as `0x{string}`,
          abi: MYOFTABI,
          functionName: "calculateCurvedMintReturn" as any,
          args: [amountInWei] as any,
          account: "0x9BA21Cf2Cb89d130862a0D5FaB0B99B027a265F1",
        });

        const tokenReturn = parseFloat(formatEther(priceInWei as any));

        const ethPrice = await fetch("/api/hello")
          .then((res) => res.json())
          .then((data) => data.ethereum.usd);

        const tokenPrice = (1 / tokenReturn) * ethPrice;

        console.log("Calculated token price:", tokenPrice);
        setPrice(tokenPrice.toFixed(2)); // Set the price with 2 decimal places
      } catch (err) {
        console.error("Error calculating token price:", err);
        setError("Failed to calculate token price");
      } finally {
        setLoading(false);
      }
    }

    if (amount) {
      calculatePrice();
    }
  }, [amount, chainId, tokenAddress]);

  return { price, loading, error };
}
