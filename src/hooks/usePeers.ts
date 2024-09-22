import { MYOFTABI } from "@/constants/MyOFTABI";
import getViemClient from "@/lib/viem-client";
import getReverseEndpoint from "@/utils/getReverseEndpoint";
import { useWriteContract } from "wagmi";

export const usePeers = () => {
    const { data: hash, writeContractAsync, isError, error } = useWriteContract();

    const setPeers = async (
        address: `0x${string}`,
        chainId: number,
    ) => {
        const hash = await writeContractAsync({
            address: address,
            abi: MYOFTABI,
            functionName: "setPeer",
            args: [getReverseEndpoint(chainId), address],
        })

        return hash
    };

    return {
        setPeers,
        isError,
        error,
        hash
    };
};
