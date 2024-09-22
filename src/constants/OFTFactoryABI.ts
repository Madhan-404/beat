export const MyOFTFactoryABI = [
  { inputs: [], name: "Create2EmptyBytecode", type: "error" },
  { inputs: [], name: "Create2FailedDeployment", type: "error" },
  {
    inputs: [
      { internalType: "uint256", name: "balance", type: "uint256" },
      { internalType: "uint256", name: "needed", type: "uint256" },
    ],
    name: "Create2InsufficientBalance",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "addr",
        type: "address",
      },
      { indexed: false, internalType: "string", name: "name", type: "string" },
      {
        indexed: false,
        internalType: "string",
        name: "symbol",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "imageURI",
        type: "string",
      },
      {
        indexed: false,
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "Deploy",
    type: "event",
  },
  {
    inputs: [
      { internalType: "string", name: "name", type: "string" },
      { internalType: "string", name: "symbol", type: "string" },
      { internalType: "address", name: "lzEndpoint", type: "address" },
      { internalType: "address", name: "delegate", type: "address" },
      { internalType: "uint256", name: "reserveRatio", type: "uint256" },
      { internalType: "uint256", name: "salt", type: "uint256" },
      { internalType: "string", name: "imageURI", type: "string" },
    ],
    name: "deploy",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;
