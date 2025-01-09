import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import LocationSetup from "./LocationSetup";
import PhotoUpload from "./PhotoUpload";
import PermitsUpload from "./PermitsUpload";
import PaymentSetup from "./PaymentSetup";
import ServiceSetup from "./ServiceSetup";
import PricingSetup from "./PricingSetup";

interface OnboardingWizardProps {
  userType?: "worker" | "customer";
  onComplete?: (data: any) => void;
  initialStep?: number;
  email?: string;
  password?: string;
}

interface FormData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  description: string;
  photo: File | null;
  location: {
    city: string;
    state: string;
    zipCode: string;
    serviceAreas?: Array<{
      zipCode: string;
      radius: number;
    }>;
  } | null;
  serviceRadius: number;
  services: string[];
  skills: string[];
  pricing?: {
    baseRate: number;
    minimumHours: number;
    travelFee: number;
  };
  availability?: {
    workingDays: string[];
    workingHours: {
      start: string;
      end: string;
    };
    instantBooking: boolean;
  };
  permits: File[];
  stripeComplete: boolean;
}

const OnboardingWizard = ({
  userType = "customer",
  onComplete = () => {},
  initialStep = 0,
  email = "",
  password = "",
}: OnboardingWizardProps) => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    email,
    password,
    firstName: "",
    lastName: "",
    description: "",
    photo: null,
    location: null,
    serviceRadius: 20,
    services: [],
    skills: [],
    permits: [],
    stripeComplete: false,
  });

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 0: // Basic Information
        if (!formData.firstName.trim() || !formData.lastName.trim()) {
          toast({
            title: "Required Fields",
            description: "Please fill in both first and last name",
            variant: "destructive",
          });
          return false;
        }
        if (userType === "worker" && !formData.description.trim()) {
          toast({
            title: "Required Field",
            description: "Please provide a professional description",
            variant: "destructive",
          });
          return false;
        }
        break;

      case 2: // Location
        if (!formData.location) {
          toast({
            title: "Location Required",
            description: "Please select a valid location",
            variant: "destructive",
          });
          return false;
        }
        break;

      case 3: // Services & Skills (Workers only)
        if (userType === "worker" && formData.services.length === 0) {
          toast({
            title: "Services Required",
            description: "Please select at least one service category",
            variant: "destructive",
          });
          return false;
        }
        break;

      case 6: // Payment Setup (Workers only)
        if (userType === "worker" && !formData.stripeComplete) {
          toast({
            title: "Payment Setup Required",
            description: "Please complete the payment setup",
            variant: "destructive",
          });
          return false;
        }
        break;
    }
    return true;
  };

  const workerSteps = [
    {
      title: "Basic Information",
      component: (
        <div className="space-y-4">
          <div>
            <Label htmlFor="firstName">First Name *</Label>
            <Input
              id="firstName"
              placeholder="John"
              value={formData.firstName}
              onChange={(e) =>
                setFormData({ ...formData, firstName: e.target.value })
              }
              disabled={loading}
            />
          </div>
          <div>
            <Label htmlFor="lastName">Last Name *</Label>
            <Input
              id="lastName"
              placeholder="Doe"
              value={formData.lastName}
              onChange={(e) =>
                setFormData({ ...formData, lastName: e.target.value })
              }
              disabled={loading}
            />
          </div>
          <div>
            <Label htmlFor="description">Professional Description *</Label>
            <Textarea
              id="description"
              placeholder="Tell us about your experience and services..."
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="h-32"
              disabled={loading}
            />
          </div>
        </div>
      ),
    },
    {
      title: "Profile Photo",
      component: (
        <PhotoUpload
          photo={formData.photo ? URL.createObjectURL(formData.photo) : null}
          onPhotoChange={(file) => setFormData({ ...formData, photo: file })}
          disabled={loading}
        />
      ),
    },
    {
      title: "Location & Service Area",
      component: (
        <LocationSetup
          onLocationChange={(location) =>
            setFormData({ ...formData, location })
          }
          onRadiusChange={(radius) =>
            setFormData({ ...formData, serviceRadius: radius })
          }
          showRadius={true}
          disabled={loading}
        />
      ),
    },
    {
      title: "Services & Skills",
      component: (
        <ServiceSetup
          selectedServices={formData.services}
          selectedSkills={formData.skills}
          onServiceChange={(services) => setFormData({ ...formData, services })}
          onSkillsChange={(skills) => setFormData({ ...formData, skills })}
          disabled={loading}
        />
      ),
    },
    {
      title: "Pricing & Availability",
      component: (
        <PricingSetup
          onPricingChange={(pricing) => setFormData({ ...formData, pricing })}
          onAvailabilityChange={(availability) =>
            setFormData({ ...formData, availability })
          }
          disabled={loading}
        />
      ),
    },
    {
      title: "Verification",
      component: (
        <PermitsUpload
          permits={formData.permits}
          onPermitsChange={(permits) => setFormData({ ...formData, permits })}
          disabled={loading}
        />
      ),
    },
    {
      title: "Payment Setup",
      component: (
        <PaymentSetup
          isComplete={formData.stripeComplete}
          onSetupComplete={() =>
            setFormData({ ...formData, stripeComplete: true })
          }
          disabled={loading}
        />
      ),
    },
  ];

  const customerSteps = [
    {
      title: "Basic Information",
      component: (
        <div className="space-y-4">
          <div>
            <Label htmlFor="firstName">First Name *</Label>
            <Input
              id="firstName"
              placeholder="John"
              value={formData.firstName}
              onChange={(e) =>
                setFormData({ ...formData, firstName: e.target.value })
              }
              disabled={loading}
            />
          </div>
          <div>
            <Label htmlFor="lastName">Last Name *</Label>
            <Input
              id="lastName"
              placeholder="Doe"
              value={formData.lastName}
              onChange={(e) =>
                setFormData({ ...formData, lastName: e.target.value })
              }
              disabled={loading}
            />
          </div>
        </div>
      ),
    },
    {
      title: "Profile Photo (Optional)",
      component: (
        <PhotoUpload
          photo={formData.photo ? URL.createObjectURL(formData.photo) : null}
          onPhotoChange={(file) => setFormData({ ...formData, photo: file })}
          optional={true}
          disabled={loading}
        />
      ),
    },
    {
      title: "Location",
      component: (
        <LocationSetup
          onLocationChange={(location) =>
            setFormData({ ...formData, location })
          }
          showRadius={false}
          disabled={loading}
        />
      ),
    },
  ];

  const steps = userType === "worker" ? workerSteps : customerSteps;

  const handleNext = async () => {
    if (!validateStep(currentStep)) return;

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setLoading(true);
      try {
        await onComplete(formData);
        toast({
          title: "Success!",
          description: "Your profile has been created successfully.",
        });
      } catch (error) {
        toast({
          title: "Error",
          description:
            "There was an error completing your registration. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <Card className="w-full max-w-lg mx-auto p-6 bg-white">
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-semibold">{steps[currentStep].title}</h2>
          <div className="flex justify-center gap-2 mt-4">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`h-2 w-16 rounded-full ${
                  index <= currentStep ? "bg-blue-500" : "bg-gray-200"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="min-h-[300px]">{steps[currentStep].component}</div>

        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 0 || loading}
          >
            <ChevronLeft className="mr-2 h-4 w-4" /> Back
          </Button>
          <Button onClick={handleNext} disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {currentStep === steps.length - 1 ? "Completing..." : "Next..."}
              </>
            ) : currentStep === steps.length - 1 ? (
              "Complete"
            ) : (
              <>
                Next <ChevronRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default OnboardingWizard;
