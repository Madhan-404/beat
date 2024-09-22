import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { SUPPORTED_CHAINS } from "@/constants/helper";
import { app } from "@/lib/firebase";
import { getWeb3AuthInstance } from "@/lib/web3Auth";
import useSearchStore from "@/store/search";
import useUserStore from "@/store/user";
import {
  GoogleAuthProvider,
  UserCredential,
  getAuth,
  signInWithPopup,
} from "firebase/auth";
import {
  Coins,
  Copy,
  LogOutIcon,
  MoonIcon,
  SearchIcon,
  SunIcon,
  UserIcon,
} from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";

export default function Navbar() {
  const { setSearchText, searchText } = useSearchStore();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { connectors, connect, connectAsync } = useConnect();
  const { disconnect } = useDisconnect();
  const { isConnected } = useAccount();
  const router = useRouter();
  const pathname = usePathname();
  const { setUser, user } = useUserStore();
  const { address } = useAccount();

  const Web3AuthInstance = getWeb3AuthInstance(SUPPORTED_CHAINS);

  async function handleUserData() {
    try {
      if (!Web3AuthInstance.connected) return;
      const user = await Web3AuthInstance.getUserInfo();
      console.log(user);
      setUser(user);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    handleUserData();
  }, [Web3AuthInstance.connected]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const login = async () => {
    try {
      if (!Web3AuthInstance) {
        throw new Error("initiated to login");
      }
      const result = await connectAsync({ connector: connectors[2] });
      console.log("rsult", result);

      handleUserData();
    } catch (err) {
      console.log(err);
    }
  };

  const logout = async () => {
    disconnect();
    if (!Web3AuthInstance.connected) return;
    await Web3AuthInstance.logout();
  };

  if (!mounted) return null;

  return (
    <nav className="bg-background border-b border-border sticky top-0 z-10">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <img
                src="/logo.png"
                alt="beat"
                width={40}
                height={40}
                className="mr-2"
              />
              <span className="sr-only">beat</span>
            </Link>
          </div>
          {pathname === "/profile" || pathname === "/" ? (
            <div className="flex-1 max-w-xl mx-auto">
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  className="pl-10 w-full"
                  placeholder="Search cryptocurrencies..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </div>
            </div>
          ) : null}
          <div className="flex items-center">
            {isConnected ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <img
                      src={user?.profileImage}
                      alt="User Avatar"
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                    <span className="sr-only">Open user menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={() =>
                      setTheme(theme === "dark" ? "light" : "dark")
                    }
                    className="cursor-pointer"
                  >
                    {theme === "dark" ? (
                      <SunIcon className="mr-2 h-4 w-4" />
                    ) : (
                      <MoonIcon className="mr-2 h-4 w-4" />
                    )}
                    {theme === "dark" ? "Light Mode" : "Dark Mode"}
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      router.push("/token/create");
                    }}
                    className="cursor-pointer"
                  >
                    <Coins className="mr-2 h-4 w-4" />
                    Create token
                  </DropdownMenuItem>
                  {address && (
                    <DropdownMenuItem
                      onClick={() => {
                        if (!address) return;
                        navigator.clipboard.writeText(address);
                      }}
                      className="cursor-pointer"
                    >
                      <Copy className="mr-2 h-4 w-4" />
                      Copy address
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem
                    onClick={() => {
                      router.push("/profile");
                    }}
                    className="cursor-pointer"
                  >
                    <UserIcon className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer" onClick={logout}>
                    <LogOutIcon className="mr-2 h-4 w-4" />
                    Disconnect
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button onClick={login}>Connect</Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
