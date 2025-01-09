import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface HeroSectionProps {
  onWorkerSignUp?: () => void;
  onCustomerSignUp?: () => void;
  title?: string;
  subtitle?: string;
}

const HeroSection = ({
  onWorkerSignUp = () => console.log("Worker signup clicked"),
  onCustomerSignUp = () => console.log("Customer signup clicked"),
  title = "Connect with Local Service Providers",
  subtitle = "Find trusted professionals in your area or offer your services to those who need them.",
}: HeroSectionProps) => {
  return (
    <section className="min-h-[600px] w-full bg-gradient-to-b from-blue-50 to-white flex items-center">
      <div className="container mx-auto px-4 py-16 flex flex-col lg:flex-row items-center justify-between gap-12">
        <div className="flex-1 space-y-8 text-center lg:text-left">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
            {title}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl">{subtitle}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Button
              size="lg"
              className="text-lg px-8 py-6"
              onClick={onWorkerSignUp}
            >
              Sign Up as Worker
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6"
              onClick={onCustomerSignUp}
            >
              Sign Up as Customer
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="flex-1 relative">
          <div className="relative w-full aspect-square max-w-lg mx-auto">
            <img
              src="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=800&q=80"
              alt="Service professionals"
              className="rounded-2xl shadow-2xl object-cover"
            />
            <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-lg">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <img
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=professional"
                    alt="Professional"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-semibold">Join our community</p>
                  <p className="text-sm text-gray-500">1000+ professionals</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
