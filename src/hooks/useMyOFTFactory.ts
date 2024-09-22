import { MyOFTFactoryABI } from "@/constants/OFTFactoryABI";
import { ChainId, EndpointV2Address, OFTFactoryAddress, getChainInfo } from "@/constants/helper";
import getViemClient from "@/lib/viem-client";
import { useWriteContract } from "wagmi";

export const useDeployMyOFT = () => {
  const { data: hash, writeContractAsync, isError, error } = useWriteContract();

  const deployMyOFT = async (
    name: string,
    symbol: string,
    delegate: `0x${string}`,
    salt: bigint,
    imageURI: string,
    chainId: number,
  ) => {
    const hash = await writeContractAsync({
      address: OFTFactoryAddress as `0x${string}`,
      abi: MyOFTFactoryABI,
      functionName: "deploy",
      args: [name, symbol, EndpointV2Address, delegate, BigInt(1), salt, imageURI],
    })
    const client = getViemClient(chainId);
    const data = await client.waitForTransactionReceipt(
      { hash: hash }
    )
    return data?.logs[0]?.address
  };

  return {
    deployMyOFT,
    isError,
    error,
    hash
  };
};
