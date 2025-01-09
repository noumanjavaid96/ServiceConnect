import React from "react";
import { Button } from "@/components/ui/button";
import { DollarSign, CheckCircle } from "lucide-react";

interface PaymentSetupProps {
  isComplete: boolean;
  onSetupComplete: () => void;
}

const PaymentSetup = ({ isComplete, onSetupComplete }: PaymentSetupProps) => {
  return (
    <div className="space-y-6 text-center bg-white p-6 rounded-lg">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
        {isComplete ? (
          <CheckCircle className="w-8 h-8 text-green-600" />
        ) : (
          <DollarSign className="w-8 h-8 text-green-600" />
        )}
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-semibold">
          {isComplete ? "Payment Setup Complete" : "Set Up Payment"}
        </h3>
        <p className="text-sm text-gray-600">
          {isComplete
            ? "Your Stripe account is connected and ready to receive payments"
            : "Connect your account with Stripe to receive payments"}
        </p>
      </div>

      <Button
        className="w-full"
        onClick={onSetupComplete}
        disabled={isComplete}
      >
        {isComplete ? "Connected" : "Connect Stripe Account"}
      </Button>

      {!isComplete && (
        <p className="text-xs text-gray-500">
          You'll be redirected to Stripe to complete the setup
        </p>
      )}
    </div>
  );
};

export default PaymentSetup;
