import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import BasicDetails from "@/components/BasicDetails";
import ReportSummary from "@/components/ReportSummary";
import AccountTable from "@/components/AccountTable";
import Navbar from "@/components/Navbar";
import { toast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getReport } from "@/api/api";

const Report = () => {
  const { id } = useParams(); // Get ID from URL like /report/:id
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReport() {
      try {
        const data = await getReport(id); 
        setReport(data);
      } catch (err) {
        console.error("Error fetching report:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchReport();
  }, [id]);

   if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <p className="text-muted-foreground">Loading your report...</p>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <p className="text-destructive">Failed to load report data.</p>
      </div>
    );
  }

  const handleDownload = () => {
  const blob = new Blob([JSON.stringify(report, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${report.basic.name || "credit-report"}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  toast({
    title: "Download started",
    description: "Your credit report has been downloaded",
  });
};

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Credit Report Dashboard</h1>
            <p className="text-muted-foreground">
              Comprehensive credit report for {report.basic.name}
            </p>
          </div>
          <Button onClick={handleDownload} className="gap-2">
            <Download className="h-4 w-4" />
            Download Report
          </Button>
        </div>

        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 max-w-2xl">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="summary">Summary</TabsTrigger>
            <TabsTrigger value="accounts">Accounts</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
          <BasicDetails data={report.basic} />
          <ReportSummary data={report.summary} />
          <AccountTable accounts={report.accounts} />
          </TabsContent>

          <TabsContent value="details">
            <BasicDetails data={report.basic} />
          </TabsContent>

         <TabsContent value="summary">
          <ReportSummary data={report.summary} />
        </TabsContent>

         <TabsContent value="accounts">
          <AccountTable accounts={report.accounts} />
        </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Report;
