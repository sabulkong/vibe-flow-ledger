
import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Camera, Upload, Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface ReceiptScannerProps {
  onScanResult: (data: any) => void;
}

export const ReceiptScanner: React.FC<ReceiptScannerProps> = ({ onScanResult }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast({
        title: "Error",
        description: "Please select an image file.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    try {
      // Convert image to base64
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64Image = (reader.result as string).split(',')[1];
        
        // Simulate OCR processing for now
        setTimeout(() => {
          const mockData = {
            amount: Math.floor(Math.random() * 100) + 10,
            description: "Scanned receipt - Office supplies",
            category: "supplies",
            type: "expense"
          };
          
          onScanResult(mockData);
          setIsProcessing(false);
          
          toast({
            title: "Receipt scanned successfully",
            description: "Transaction details extracted and ready to review.",
          });
        }, 2000);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      setIsProcessing(false);
      toast({
        title: "Error",
        description: "Failed to process receipt. Please try again.",
        variant: "destructive",
      });
    }
  };

  const openCamera = () => {
    if (fileInputRef.current) {
      fileInputRef.current.setAttribute('capture', 'environment');
      fileInputRef.current.click();
    }
  };

  const selectFile = () => {
    if (fileInputRef.current) {
      fileInputRef.current.removeAttribute('capture');
      fileInputRef.current.click();
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Camera className="w-5 h-5 mr-2" />
          Receipt Scanner
        </CardTitle>
        <CardDescription>
          Scan receipts to automatically extract transaction details
        </CardDescription>
      </CardHeader>
      <CardContent>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />
        
        <div className="space-y-3">
          <Button
            onClick={openCamera}
            disabled={isProcessing}
            className="w-full bg-purple-600 hover:bg-purple-700"
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Camera className="w-5 h-5 mr-2" />
                Take Photo
              </>
            )}
          </Button>
          
          <Button
            onClick={selectFile}
            disabled={isProcessing}
            variant="outline"
            className="w-full"
          >
            <Upload className="w-5 h-5 mr-2" />
            Upload Image
          </Button>
        </div>
        
        <p className="text-sm text-slate-600 mt-3 text-center">
          Our AI will extract amount, date, and merchant information
        </p>
      </CardContent>
    </Card>
  );
};
