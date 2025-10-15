import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart3,
  CheckCircle,
  XCircle,
  Wallet,
  Shield,
  AlertCircle,
  Search,
} from "lucide-react";

interface ReportSummaryProps {
  data?: {
    totalAccounts?: number;
    active?: number;
    closed?: number;
    currentBalance?: number;
    securedAmount?: number;
    unsecuredAmount?: number;
    last7DaysEnquiries?: number;
  };
}

const ReportSummary = ({ data }: ReportSummaryProps) => {
  const formatCurrency = (amount?: number) => {
    const safeAmount = Number.isFinite(amount) ? amount! : 0;
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(safeAmount);
  };

  const stats = [
    {
      icon: BarChart3,
      label: "Total Accounts",
      value: (data?.totalAccounts ?? 0).toString(),
      color: "bg-primary/10 text-primary",
    },
    {
      icon: CheckCircle,
      label: "Active",
      value: (data?.active ?? 0).toString(),
      color: "bg-success/10 text-success",
    },
    {
      icon: XCircle,
      label: "Closed",
      value: (data?.closed ?? 0).toString(),
      color: "bg-muted text-muted-foreground",
    },
    {
      icon: Wallet,
      label: "Current Balance",
      value: formatCurrency(data?.currentBalance ?? 0),
      color: "bg-info/10 text-info",
    },
    {
      icon: Shield,
      label: "Secured Amount",
      value: formatCurrency(data?.securedAmount ?? 0),
      color: "bg-success/10 text-success",
    },
    {
      icon: AlertCircle,
      label: "Unsecured Amount",
      value: formatCurrency(data?.unsecuredAmount ?? 0),
      color: "bg-warning/10 text-warning",
    },
    {
      icon: Search,
      label: "Last 7 Days Enquiries",
      value: (data?.last7DaysEnquiries ?? 0).toString(),
      color: "bg-secondary text-secondary-foreground",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Report Summary</CardTitle>
      </CardHeader>
      <CardContent>
        {data ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="p-4 rounded-lg border bg-card hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${stat.color}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-muted-foreground mb-1">
                        {stat.label}
                      </p>
                      <p className="text-xl font-bold text-foreground truncate">
                        {stat.value}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-center text-muted-foreground">
            No summary data available
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default ReportSummary;
