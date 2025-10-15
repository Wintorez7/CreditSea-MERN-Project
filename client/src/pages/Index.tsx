import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Shield, TrendingUp, Upload } from "lucide-react";
import Navbar from "@/components/Navbar";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: FileText,
      title: "Detailed Reports",
      description: "View comprehensive credit reports with all account details",
    },
    {
      icon: Shield,
      title: "Secure Processing",
      description: "Your financial data is processed securely and privately",
    },
    {
      icon: TrendingUp,
      title: "Credit Score Analysis",
      description: "Track your credit score and financial health over time",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Professional Credit Report Dashboard
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Upload and analyze soft credit pull reports with our modern, intuitive dashboard. 
            Get instant insights into your credit accounts, scores, and financial health.
          </p>
          <Button 
            size="lg" 
            onClick={() => navigate("/upload")}
            className="gap-2"
          >
            <Upload className="h-5 w-5" />
            Upload Your Report
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="border-border hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="p-3 bg-primary/10 rounded-lg w-fit mb-4">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 mb-12">
        <Card className="max-w-3xl mx-auto bg-primary text-primary-foreground border-0">
          <CardContent className="pt-6 pb-6 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to analyze your credit report?
            </h2>
            <p className="text-primary-foreground/90 mb-6">
              Get started in seconds. Simply upload your report and view detailed insights.
            </p>
            <Button 
              variant="secondary"
              size="lg"
              onClick={() => navigate("/upload")}
              className="gap-2"
            >
              <Upload className="h-5 w-5" />
              Get Started Now
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default Index;
