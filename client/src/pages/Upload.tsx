import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload as UploadIcon, FileText, CheckCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import { uploadXml } from "@/api/api";

const Upload = () => {
  const navigate = useNavigate();
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

const handleUpload = async () => {
  if (!file) {
    toast({
      title: "No file selected",
      description: "Please select a file to upload",
      variant: "destructive",
    });
    return;
  }

  try {
    toast({
      title: "Uploading...",
      description: "Please wait while we process your credit report",
    });

    // Call your API
    const res = await uploadXml(file);

    // Handle success
    toast({
      title: "Upload successful ✅",
      description: "Your credit report has been processed successfully",
    });

    // Navigate to the report dashboard with the new report ID
    setTimeout(() => {
      navigate(`/report/${res.id}`);
    }, 1000);
  } catch (err) {
    // ❌ Handle error
    toast({
      title: "Upload failed ❌",
      description: err.message || "Something went wrong while uploading",
      variant: "destructive",
    });
  }
};


  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Upload Credit Report</h1>
            <p className="text-muted-foreground">
              Upload your credit report file to view detailed analysis
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Select Report File</CardTitle>
              <CardDescription>
                Drag and drop your credit report file or click to browse
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
                  isDragging 
                    ? "border-primary bg-primary/5" 
                    : "border-border hover:border-primary/50"
                }`}
              >
                {file ? (
                  <div className="flex flex-col items-center gap-3">
                    <div className="p-3 bg-success/10 rounded-full">
                      <CheckCircle className="h-8 w-8 text-success" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{file.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {(file.size / 1024).toFixed(2)} KB
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-3">
                    <div className="p-3 bg-secondary rounded-full">
                      <UploadIcon className="h-8 w-8 text-secondary-foreground" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground mb-1">
                        Drop your file here
                      </p>
                      <p className="text-sm text-muted-foreground">
                        or click the button below to browse
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => document.getElementById("file-input")?.click()}
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Browse Files
                </Button>
                <Button 
                  onClick={handleUpload}
                  disabled={!file}
                  className="flex-1"
                >
                  <UploadIcon className="mr-2 h-4 w-4" />
                  Upload Report
                </Button>
              </div>

              <input
                id="file-input"
                type="file"
                onChange={handleFileChange}
                className="hidden"
                accept=".xml"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Upload;
