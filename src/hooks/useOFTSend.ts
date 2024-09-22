// import { ChainId, getChainInfo } from "@/constants/helper";
// import { parseUnits, encodeAbiParameters, hexToBytes } from "viem";
// import {
//   useContractRead,
//   useReadContract,
//   useWaitForTransactionReceipt,
//   useWriteContract,
// } from "wagmi";
// import { EndpointId } from "@layerzerolabs/lz-definitions";
// import { Options, addressToBytes32 } from "@layerzerolabs/lz-v2-utilities";
// import { MYOFTABI } from "@/constants/MyOFTABI";
// import { readContract } from "viem/actions";
// import { getViemClient } from "./useTokenHistory";

// export const useOFT = (oftAddress: `0x${string}`, chainId: ChainId) => {
//   const { lzEndpointId } = getChainInfo(chainId);

//   return {
//     address: oftAddress,
//     abi: MYOFTABI,
//   };
// };

// export const useOFTSend = (oftAddress: `0x${string}`, chainId: ChainId) => {
//   const contract = useOFT(oftAddress, chainId);

//   const { data: decimals } = useReadContract({
//     ...contract,
//     functionName: "decimals",
//   });

//   const { data: hash, writeContractAsync, isError, error } = useWriteContract();

//   const { isLoading: isWaiting, isSuccess } = useWaitForTransactionReceipt({
//     hash,
//   });

//   const client = getViemClient(84532);

//   const sendTokens = async (to: string, toEid: EndpointId, amount: string) => {
//     if (!decimals) throw new Error("Decimals not fetched");

//     const amountLD = parseUnits(amount, decimals);
//     const options = Options.newOptions()
//       .addExecutorLzReceiveOption(65000, 0)
//       .toBytes();

//     console.log("options", options);

//     const sendParam = {
//       dstEid: toEid,
//       to: addressToBytes32(to),
//       amountLD,
//       minAmountLD: amountLD,
//       extraOptions: options,
//       composeMsg: new Uint8Array(0),
//       oftCmd: new Uint8Array(0),
//     };

//     // const feeQuote = await readContract(client, {
//     //   abi: MYOFTABI,
//     //   args: [sendParam, false],
//     //   functionName: "quoteSend",
//     // });

//     // if (!feeQuote) throw new Error("Fee quote not fetched");

//     // const nativeFee = feeQuote.nativeFee;

//     // console.log(`Sending ${amount} token(s) to network with EID ${toEid}`);

//     // return writeContractAsync({
//     //   ...contract,
//     //   functionName: "send",
//     //   args: [sendParam, { nativeFee, lzTokenFee: 0n }],
//     //   value: nativeFee,
//     // });
//   };

//   return {
//     sendTokens,
//     isLoading: isWaiting,
//     isSuccess,
//     isError,
//     error,
//     hash,
//   };
// };
