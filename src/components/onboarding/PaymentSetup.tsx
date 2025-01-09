import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { DollarSign, CheckCircle, Calendar, Loader2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";

interface PaymentSetupProps {
  isComplete: boolean;
  onSetupComplete: () => void;
  disabled?: boolean;
}

interface CommissionTier {
  minAmount: number;
  percentage: number;
}

const PaymentSetup = ({
  isComplete,
  onSetupComplete,
  disabled,
}: PaymentSetupProps) => {
  const [payoutSchedule, setPayoutSchedule] = useState("weekly");
  const [taxFormSubmitted, setTaxFormSubmitted] = useState(false);
  const [baseCommission, setBaseCommission] = useState(15);
  const [commissionTiers, setCommissionTiers] = useState<CommissionTier[]>([
    { minAmount: 0, percentage: 15 },
    { minAmount: 1000, percentage: 12 },
    { minAmount: 5000, percentage: 10 },
  ]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  const handleTaxFormUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      setUploadProgress(0);

      // Simulate file upload progress
      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 95) {
            clearInterval(interval);
            return prev;
          }
          return prev + 5;
        });
      }, 100);

      // Simulate upload completion
      setTimeout(() => {
        clearInterval(interval);
        setUploadProgress(100);
        setTaxFormSubmitted(true);
        setIsUploading(false);
      }, 2000);
    }
  };

  const handleStripeConnect = async () => {
    setIsConnecting(true);
    // Simulate Stripe connection process
    setTimeout(() => {
      onSetupComplete();
      setIsConnecting(false);
    }, 2000);
  };

  // ... rest of the existing functions ...

  return (
    <div className="space-y-6 bg-white p-6 rounded-lg">
      {/* ... existing header section ... */}

      {!isComplete && (
        <div className="space-y-6">
          {/* ... existing commission structure section ... */}

          {/* Tax Forms with Progress */}
          <Card className="p-4">
            <Label className="text-sm font-medium mb-2 block">Tax Forms</Label>
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                Please upload your W-9 form for tax purposes
              </p>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleTaxFormUpload}
                className="hidden"
                id="tax-form-upload"
                disabled={disabled || taxFormSubmitted || isUploading}
              />
              <label htmlFor="tax-form-upload">
                <Button
                  variant="outline"
                  className="w-full relative"
                  disabled={disabled || taxFormSubmitted || isUploading}
                  asChild
                >
                  <span>
                    {isUploading ? (
                      <div className="flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Uploading...
                      </div>
                    ) : taxFormSubmitted ? (
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4" />
                        Form Submitted
                      </div>
                    ) : (
                      "Upload W-9 Form"
                    )}
                  </span>
                </Button>
              </label>
              {isUploading && (
                <div className="space-y-2">
                  <Progress value={uploadProgress} />
                  <p className="text-xs text-gray-500 text-center">
                    {uploadProgress}%
                  </p>
                </div>
              )}
            </div>
          </Card>

          <Button
            className="w-full"
            onClick={handleStripeConnect}
            disabled={!taxFormSubmitted || disabled || isConnecting}
          >
            {isConnecting ? (
              <div className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Connecting to Stripe...
              </div>
            ) : (
              "Connect Stripe Account"
            )}
          </Button>
          <p className="text-xs text-gray-500 text-center">
            You'll be redirected to Stripe to complete the setup
          </p>
        </div>
      )}

      {isComplete && (
        <Button className="w-full" disabled>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4" />
            Connected
          </div>
        </Button>
      )}
    </div>
  );
};

export default PaymentSetup;
