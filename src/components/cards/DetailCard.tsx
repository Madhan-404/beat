import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Copy } from "lucide-react";

export default function DetailCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Token Details</CardTitle>
        <CardDescription>Description</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-muted-foreground">
            Created by :
          </p>
          <div className="flex items-center gap-1">
            <Avatar className="w-6 h-6">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p className="text-sm font-medium text-muted-foreground">harsh</p>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-muted-foreground">
            Market cap :
          </p>
          <p className="text-sm font-medium text-muted-foreground">$27M</p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-muted-foreground">
            Contract address :
          </p>
          <div className="flex items-center gap-1 cursor-pointer">
            <p className="text-sm font-medium text-muted-foreground">
              0x2xnj....82js
            </p>
            <Copy className="w-3 h-3 text-muted-foreground" />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-muted-foreground">
            Deployed on :
          </p>
          <p className="text-sm font-medium text-muted-foreground">Base</p>
        </div>
      </CardContent>
    </Card>
  );
}
