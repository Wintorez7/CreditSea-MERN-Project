import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Phone, CreditCard as CreditCardIcon, TrendingUp } from "lucide-react";

interface BasicDetailsProps {
  data?: {
    name?: string;
    mobile?: string;
    pan?: string;
    creditScore?: number;
  };
}

const BasicDetails = ({ data }: BasicDetailsProps) => {
  const getCreditScoreColor = (score?: number) => {
    if (!score) return "text-muted-foreground";
    if (score >= 750) return "text-success";
    if (score >= 650) return "text-warning";
    return "text-destructive";
  };

  const name = data?.name || "N/A";
  const mobile = data?.mobile || "N/A";
  const pan = data?.pan || "N/A";
  const creditScore = data?.creditScore ?? 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Basic Details</CardTitle>
      </CardHeader>
      <CardContent>
        {data ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-secondary rounded-lg">
                <User className="h-5 w-5 text-secondary-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Name</p>
                <p className="font-semibold text-foreground truncate">{name}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 bg-secondary rounded-lg">
                <Phone className="h-5 w-5 text-secondary-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Mobile</p>
                <p className="font-semibold text-foreground truncate">{mobile}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 bg-secondary rounded-lg">
                <CreditCardIcon className="h-5 w-5 text-secondary-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">PAN</p>
                <p className="font-semibold text-foreground truncate">{pan}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <TrendingUp
                  className={`h-5 w-5 ${getCreditScoreColor(creditScore)}`}
                />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Credit Score</p>
                <p
                  className={`text-2xl font-bold ${getCreditScoreColor(
                    creditScore
                  )}`}
                >
                  {creditScore || "N/A"}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-center text-muted-foreground">
            No basic details available
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default BasicDetails;
