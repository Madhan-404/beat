import TokenCard from "@/components/cards/TokenCard";
import BlurFade from "@/components/magicui/blur-fade";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { CheckIcon, CopyIcon, EditIcon } from "lucide-react";
import { useState } from "react";

const BLUR_FADE_DELAY = 0.25;

export default function Profile() {
  const [user, setUser] = useState({
    username: "CryptoWhale",
    avatarUrl: "/placeholder.svg?height=128&width=128",
    walletAddress: "0x1234...5678",
    tokens: [],
  });

  const [copied, setCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(user.walletAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <Card className="overflow-hidden">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <Avatar className="w-32 h-32">
              <AvatarImage src={user.avatarUrl} alt={user.username} />
              <AvatarFallback>
                {user.username.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-2 text-center sm:text-left flex-grow">
              <div className="flex items-center justify-center sm:justify-start">
                {isEditing ? (
                  <Input
                    value={user.username}
                    onChange={(e) =>
                      setUser({ ...user, username: e.target.value })
                    }
                    className="text-2xl font-bold"
                  />
                ) : (
                  <h2 className="text-2xl font-bold">{user.username}</h2>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  className="ml-2"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  <EditIcon className="h-4 w-4" />
                  <span className="sr-only">
                    {isEditing ? "Save" : "Edit"} username
                  </span>
                </Button>
              </div>
              <div className="flex items-center justify-center sm:justify-start text-muted-foreground">
                <code className="bg-muted px-2 py-1 rounded text-sm">
                  {user.walletAddress}
                </code>
                <Button
                  variant="ghost"
                  size="icon"
                  className="ml-2"
                  onClick={copyToClipboard}
                >
                  {copied ? (
                    <CheckIcon className="h-4 w-4 text-green-500" />
                  ) : (
                    <CopyIcon className="h-4 w-4" />
                  )}
                  <span className="sr-only">Copy wallet address</span>
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {user.tokens &&
          user.tokens.map((token, index) => (
            <BlurFade key={index} delay={BLUR_FADE_DELAY + index * 0.05} inView>
              <TokenCard crypto={token} />
            </BlurFade>
          ))}
      </div>
    </div>
  );
}
