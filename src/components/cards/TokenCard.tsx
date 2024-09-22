import { Token } from "@/types/token";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import getRelativeTime from "@/utils/getTimeDiff";
import { useTokenPrice } from "@/hooks/useTokenPrice";
import { useRouter } from "next/router";

export default function TokenCard({ crypto }: { crypto: Token }) {
  const { loading, error, price } = useTokenPrice(crypto.addr, "1", crypto.id);
  const router = useRouter();
  return (
    <Card
      className="overflow-hidden shadow-none"
      onClick={() => {
        router.push(crypto.addr);
      }}
    >
      <CardHeader className="pb-2">
        <CardTitle className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Avatar className="bg-secondary h-12 w-12">
              <AvatarImage src={crypto.imageURI} />
              <AvatarFallback>{crypto.name}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-md font-medium">{crypto.name}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {price && price.toString()}
              </p>
            </div>
          </div>
          <p className="text-xl font-semibold">
            {getRelativeTime(crypto.db_write_timestamp)}
          </p>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex justify-between items-center"></CardContent>
    </Card>
  );
}
