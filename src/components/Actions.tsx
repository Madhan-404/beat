import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useBurnMyOFT, useMintMyOFT } from "@/hooks/useMyOFT";
import useToken from "@/hooks/useTokens";
import { useState } from "react";
import { useAccount } from "wagmi";
import { Select, SelectContent, SelectItem, SelectTrigger } from "./ui/select";
import { Chain } from "viem";
import { baseSepolia, sepolia } from "viem/chains";

export function Actions({
  contractAddress,
}: {
  contractAddress: `0x${string}`;
}) {
  const { token, loading, error } = useToken(contractAddress);
  const [amount, setAmount] = useState("");
  const [selectedChain, setSelectedChain] = useState<Chain | null>(null);
  const [recipientAddress, setRecipientAddress] = useState<string>("");
  const { chainId, address, chain } = useAccount();
  const { isLoading, mint, hash } = useMintMyOFT(
    contractAddress,
    "base-sepolia"
  );
  const {
    burn,
    isLoading: burnLoading,
    isSuccess,
    error: burnError,
  } = useBurnMyOFT(contractAddress, "base-sepolia");

  const tokenSymbol = token?.symbol;

  console.log(token, "token", error);

  const handleAmountChange = (e: any) => {
    setAmount(e.target.value);
  };

  const handleBuy = async () => {
    if (!amount) return;

    try {
      console.log("chain", chain, chainId);

      const brrr = await mint(amount);
      console.log("hash", hash, brrr);
    } catch (err) {
      console.error("Error buying tokens:", err);
    }
  };

  const handleSell = async () => {
    if (!amount) return;

    try {
      await burn(amount);
    } catch (err) {
      console.error("Error selling tokens:", err);
    }
  };
  return (
    <Tabs defaultValue="account">
      <TabsList className="grid w-full grid-cols-3" defaultValue="buy">
        <TabsTrigger value="buy">Buy</TabsTrigger>
        <TabsTrigger value="sell">Sell</TabsTrigger>
        <TabsTrigger value="transfer">Transfer</TabsTrigger>
      </TabsList>
      <TabsContent value="buy">
        <Card>
          <CardHeader>
            <CardTitle>{`Buy $${tokenSymbol}`}</CardTitle>
            <CardDescription>
              Enter the amount of ETH you want to spend to buy {token?.symbol}{" "}
              tokens.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="amount">Amount (ETH)</Label>
              <Input
                id="amount"
                type="number"
                placeholder="0.0"
                value={amount}
                onChange={handleAmountChange}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full"
              onClick={handleBuy}
              disabled={isLoading || !amount}
            >
              {isLoading ? "Buying..." : `Buy ${tokenSymbol}`}
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="sell">
        <Card>
          <CardHeader>
            <CardTitle>{`Sell $${tokenSymbol}`}</CardTitle>
            <CardDescription>
              Enter the amount of {tokenSymbol} tokens you want to sell.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="amount">Amount ({tokenSymbol})</Label>
              <Input
                id="amount"
                type="number"
                placeholder="0.0"
                value={amount}
                onChange={handleAmountChange}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full"
              onClick={handleSell}
              disabled={isLoading || !amount}
            >
              {isLoading ? "Selling..." : `Sell ${tokenSymbol}`}
            </Button>
          </CardFooter>
          {isSuccess && (
            <CardContent>
              <p className="text-green-500">Sale successful!</p>
            </CardContent>
          )}
          {error && (
            <CardContent>
              <p className="text-red-500">Error: {error.message}</p>
            </CardContent>
          )}
        </Card>
      </TabsContent>
      <TabsContent value="transfer">
        <Card>
          <CardHeader>
            <CardTitle>Send Tokens</CardTitle>
            <CardDescription>
              Select the chain, enter the amount, and specify the recipient
              address to send tokens.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Chain Selection */}
            <div className="space-y-2">
              <Label htmlFor="chain-select">Select Chain</Label>
              <Select
                onValueChange={(value: string) => {
                  if (value === "sepolia") {
                    setSelectedChain(sepolia);
                  } else {
                    setSelectedChain(baseSepolia);
                  }
                }}
              >
                <SelectTrigger id="chain-select" className="w-full">
                  {selectedChain?.name || "Select Chain"}
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sepolia">{sepolia.name}</SelectItem>
                  <SelectItem value="base-sepolia">
                    {baseSepolia.name}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* To Address Input */}
            <div className="space-y-2">
              <Label htmlFor="to-address">Recipient Address</Label>
              <Input
                id="to-address"
                type="text"
                placeholder="Enter recipient's address"
                value={recipientAddress}
                onChange={(e) => setRecipientAddress(e.target.value)}
              />
            </div>

            {/* Amount Input */}
            <div className="space-y-2">
              <Label htmlFor="amount">Amount to Send</Label>
              <Input
                id="amount"
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
          </CardContent>

          <CardFooter>
            <Button
              className="w-full"
              onClick={() => {
                // sendTokens(
                //   recipientAddress,
                //   getLZEndpointId("eth-sepolia"),
                //   amount
                // );
              }}
            >
              Send
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
