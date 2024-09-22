import BlurFade from "@/components/magicui/blur-fade";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { MultiSelect } from "@/components/ui/multi-select";
import { useDeployMyOFT } from "@/hooks/useMyOFTFactory";
import { usePeers } from "@/hooks/usePeers";
import useCreateTokenStore from "@/store/create-token";
import { Label } from "@radix-ui/react-label";
import { baseSepolia, optimismSepolia } from "viem/chains";
import {
  useAccount,
  useChainId,
  useSwitchChain,
  useWriteContract,
} from "wagmi";

const BLUR_FADE_DELAY = 0.04;

const supportedChains = [
  // { value: "eth-sepolia", label: "Eth sepolia" },
  { value: baseSepolia.id.toString(), label: "Base sepolia" },
  { value: optimismSepolia.id.toString(), label: "Optimism sepolia" },
];

export default function CreateProfile() {
  const { chains, setChains, setName, setSymbol, name, symbol } =
    useCreateTokenStore();
  const { data: hash, writeContractAsync } = useWriteContract();
  const { address } = useAccount();
  const currentChainID = useChainId();
  const { switchChainAsync } = useSwitchChain();
  const { deployMyOFT } = useDeployMyOFT();
  const { setPeers } = usePeers();

  async function deployToken(chainID: number) {
    try {
      if (!address) return;
      if (currentChainID !== chainID) {
        await switchChainAsync({
          chainId: chainID,
        });
      }
      const tokenAddress = await deployMyOFT(
        name,
        symbol,
        address,
        BigInt(100),
        "https://pump.mypinata.cloud/ipfs/QmT4nBqLw1gJaAnd3xakG4F6FbmKutfgDWofaLAow4tvRj?img-width=128&img-dpr=2&img-onerror=redirect",
        chainID
      );
      return tokenAddress;
    } catch (error) {
      console.log(error);
    }
  }

  async function handlePeers(address: `0x${string}`, chainID: number) {
    try {
      if (!address) return;
      if (currentChainID !== chainID) {
        await switchChainAsync({
          chainId: chainID,
        });
      }
      const hash = await setPeers(address, currentChainID);
      return hash;
    } catch (error) {
      console.log(error);
    }
  }

  async function handleToken() {
    try {
      let tokenAddress: `0x${string}` | undefined;
      for (let index = 0; index < chains.length; index++) {
        const address = await deployToken(parseInt(chains[index]));
        if (address) {
          console.log(address, "token");
          tokenAddress = address;
        }
      }
      // if (tokenAddress) {
      //   console.log("inAddress");
      //   for (let index = 0; index < chains.length; index++) {
      //     const hash = await handlePeers(tokenAddress, parseInt(chains[index]));
      //     console.log(hash);
      //   }
      // }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <section className="w-full min-h-[calc(100vh-65px)] flex justify-center items-center">
      <BlurFade delay={BLUR_FADE_DELAY * 4} inView>
        <Card className="w-[400px]">
          <CardHeader>
            <BlurFade delay={BLUR_FADE_DELAY * 4} inView>
              <CardTitle>Create Token</CardTitle>
            </BlurFade>
            <BlurFade delay={BLUR_FADE_DELAY * 5} inView>
              <CardDescription>Create your token in one-click.</CardDescription>
            </BlurFade>
          </CardHeader>
          <CardContent>
            <form>
              <div className="flex flex-col w-full justify-center gap-4">
                <BlurFade delay={BLUR_FADE_DELAY * 6} inView>
                  <Avatar className="w-20 h-20 mx-auto">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </BlurFade>
                <BlurFade
                  delay={BLUR_FADE_DELAY * 7}
                  inView
                  className="flex flex-col space-y-1.5"
                >
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    placeholder="Enter name"
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                </BlurFade>
                <BlurFade
                  delay={BLUR_FADE_DELAY * 9}
                  inView
                  className="flex flex-col space-y-1.5"
                >
                  <Label htmlFor="symbol">Symbol</Label>
                  <Input
                    id="symbol"
                    placeholder="Enter symbol"
                    onChange={(e) => {
                      setSymbol(e.target.value);
                    }}
                  />
                </BlurFade>
                <BlurFade
                  delay={BLUR_FADE_DELAY * 9}
                  inView
                  className="flex flex-col space-y-1.5"
                >
                  <Label htmlFor="chain">Select chain</Label>
                  <MultiSelect
                    id="chain"
                    options={supportedChains}
                    onValueChange={setChains}
                    defaultValue={chains}
                    placeholder="Select frameworks"
                    variant="inverted"
                    animation={2}
                    maxCount={3}
                  />
                </BlurFade>
              </div>
            </form>
          </CardContent>
          <CardFooter>
            <BlurFade delay={BLUR_FADE_DELAY * 10} inView className="w-full">
              <Button className="w-full" onClick={handleToken}>
                Create
              </Button>
            </BlurFade>
          </CardFooter>
        </Card>
      </BlurFade>
    </section>
  );
}
