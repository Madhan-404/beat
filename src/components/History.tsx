import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import useToken from "@/hooks/useTokens";
import { useTokenHistory } from "@/hooks/useTokenHistory";
import getRelativeTime from "@/utils/getTimeDiff";
import { formatEther } from "viem";

export function History({
  contractAddress,
}: {
  contractAddress: `0x${string}`;
}) {
  const { token, loading, error } = useToken(contractAddress);
  const history = useTokenHistory(contractAddress, 84532);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between md:items-center flex-col sm:flex-row gap-4">
          <div className="flex items-center gap-2">
            <Avatar className="bg-secondary h-10 w-10">
              <AvatarImage src={token?.imageURI} />
              <AvatarFallback>{token?.symbol}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-semibold">{token?.name}</p>
              <p className="text-xs text-muted-foreground">{token?.symbol}</p>
            </div>
          </div>
          <Select>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue
                defaultValue={"history"}
                placeholder={"Token History"}
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="history" defaultChecked>
                Token History
              </SelectItem>
              <SelectItem value="transfer">Token Transfer</SelectItem>
            </SelectContent>
          </Select>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Invoice</TableHead>
              <TableHead>Time</TableHead>

              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {history.map((tx) => (
              <TableRow key={tx.name}>
                <TableCell
                  className={`font-medium ${
                    tx.name === "Mint"
                      ? "text-green-500"
                      : tx.name === "Burn"
                      ? "text-red-500"
                      : ""
                  }`}
                >
                  {tx.name === "Mint" ? "Buy" : "Sell"}
                </TableCell>

                <TableCell>{tx.args.timestamp.toLocaleString()}</TableCell>

                <TableCell className="text-right">
                  {formatEther(tx.args.amount)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </CardFooter>
    </Card>
  );
}
