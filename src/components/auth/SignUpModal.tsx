import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SocialLoginButtons from "./SocialLoginButtons";
import OnboardingWizard from "../onboarding/OnboardingWizard";

interface SignUpModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  onSignUpComplete?: (data: any) => void;
}

const SignUpModal = ({
  isOpen = true,
  onClose = () => {},
  onSignUpComplete = () => {},
}: SignUpModalProps) => {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [userType, setUserType] = useState<"worker" | "customer">("customer");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    setShowOnboarding(true);
  };

  const handleOnboardingComplete = (data: any) => {
    onSignUpComplete({ ...data, userType });
    onClose();
  };

  if (showOnboarding) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-[480px] p-0">
          <OnboardingWizard
            userType={userType}
            onComplete={handleOnboardingComplete}
          />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[480px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Create an Account
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="customer" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger
              value="customer"
              onClick={() => setUserType("customer")}
            >
              Customer
            </TabsTrigger>
            <TabsTrigger value="worker" onClick={() => setUserType("worker")}>
              Service Provider
            </TabsTrigger>
          </TabsList>

          <TabsContent value="customer">
            <div className="space-y-4">
              <SocialLoginButtons
                onGoogleClick={() => setShowOnboarding(true)}
                onAppleClick={() => setShowOnboarding(true)}
                onFacebookClick={() => setShowOnboarding(true)}
              />

              <form onSubmit={handleEmailSignUp} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <Button type="submit" className="w-full">
                  Continue
                </Button>
              </form>
            </div>
          </TabsContent>

          <TabsContent value="worker">
            <div className="space-y-4">
              <SocialLoginButtons
                onGoogleClick={() => setShowOnboarding(true)}
                onAppleClick={() => setShowOnboarding(true)}
                onFacebookClick={() => setShowOnboarding(true)}
              />

              <form onSubmit={handleEmailSignUp} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="worker-email">Email</Label>
                  <Input
                    id="worker-email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="worker-password">Password</Label>
                  <Input
                    id="worker-password"
                    type="password"
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <Button type="submit" className="w-full">
                  Continue
                </Button>
              </form>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default SignUpModal;
