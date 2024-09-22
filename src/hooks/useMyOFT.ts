import { ChainId, getChainInfo } from "@/constants/helper";
import { MYOFTABI } from "@/constants/MyOFTABI";
import { parseEther } from "viem";
import {
  useWaitForTransactionReceipt,
  useWatchContractEvent,
  useWriteContract,
} from "wagmi";

export const useMyOFT = (oftAddress: `0x${string}`, chainId: ChainId) => {
  const { lzEndpointId } = getChainInfo(chainId);

  return {
    address: oftAddress,
    abi: MYOFTABI,
  };
};

export const useMintMyOFT = (oftAddress: `0x${string}`, chainId: ChainId) => {
  const contract = useMyOFT(oftAddress, chainId);

  const { data: hash, writeContractAsync, isError, error } = useWriteContract();

  const { isLoading: isWaiting, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const mint = async (value: string) => {
    console.log("got this value", value, contract);

    return writeContractAsync({
      ...contract,
      functionName: "mint",
      value: parseEther(value),
    });
  };

  return {
    mint,
    isLoading: isWaiting,
    isSuccess,
    isError,
    error,
    hash,
  };
};

export const useBurnMyOFT = (oftAddress: `0x${string}`, chainId: ChainId) => {
  const contract = useMyOFT(oftAddress, chainId);
  const { data: hash, writeContract, isError, error } = useWriteContract();

  const { isLoading: isWaiting, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const burn = async (amount: string) => {
    writeContract({
      ...contract,
      functionName: "burn",
      args: [parseEther(amount)],
    });
  };

  return {
    burn,
    isLoading: isWaiting,
    isSuccess,
    isError,
    error,
    hash,
  };
};

export const useWatchMintEvents = (
  oftAddress: `0x${string}`,
  chainId: ChainId,
  onLogs: (logs: any) => void
) => {
  const contract = useMyOFT(oftAddress, chainId);

  return useWatchContractEvent({
    ...contract,
    eventName: "Mint",
    onLogs,
  });
};

export const useWatchBurnEvents = (
  oftAddress: `0x${string}`,
  chainId: ChainId,
  onLogs: (logs: any) => void
) => {
  const contract = useMyOFT(oftAddress, chainId);

  return useWatchContractEvent({
    ...contract,
    eventName: "Burn",
    onLogs,
  });
};
