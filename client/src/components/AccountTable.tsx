import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface Account {
  bank: string;
  cardType: string;
  accountNumber: string;
  address: string;
  amountOverdue: number;
  currentBalance: number;
}

interface AccountTableProps {
  accounts: Account[];
}

const AccountTable = ({ accounts }: AccountTableProps) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Credit Accounts Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="font-semibold">Bank Name</TableHead>
                <TableHead className="font-semibold">Type</TableHead>
                <TableHead className="font-semibold">Account Number</TableHead>
                <TableHead className="font-semibold">Address</TableHead>
                <TableHead className="font-semibold text-right">Amount Overdue</TableHead>
                <TableHead className="font-semibold text-right">Current Balance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {accounts.map((account, index) => (
                <TableRow key={index} className="hover:bg-muted/30">
                  <TableCell className="font-medium">{account.bank}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="font-normal">
                      {account.cardType}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-mono text-sm">{account.accountNumber}</TableCell>
                  <TableCell className="text-muted-foreground">{account.address}</TableCell>
                  <TableCell className="text-right">
                    {account.amountOverdue > 0 ? (
                      <span className="text-destructive font-semibold">
                        {formatCurrency(account.amountOverdue)}
                      </span>
                    ) : (
                      <span className="text-success">₹0</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right font-semibold">
                    {formatCurrency(account.currentBalance)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default AccountTable;
