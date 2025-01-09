import React, { useState } from "react";
import Navbar from "@/components/navigation/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import SignUpModal from "@/components/auth/SignUpModal";

interface LandingPageProps {
  isAuthenticated?: boolean;
  userName?: string;
}

const LandingPage = ({
  isAuthenticated = false,
  userName = "Guest User",
}: LandingPageProps) => {
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [signUpType, setSignUpType] = useState<"worker" | "customer">(
    "customer",
  );

  const handleWorkerSignUp = () => {
    setSignUpType("worker");
    setShowSignUpModal(true);
  };

  const handleCustomerSignUp = () => {
    setSignUpType("customer");
    setShowSignUpModal(true);
  };

  const handleSignUpComplete = (data: any) => {
    console.log("Sign up completed with data:", data);
    setShowSignUpModal(false);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar
        isAuthenticated={isAuthenticated}
        userName={userName}
        onSignUp={() => setShowSignUpModal(true)}
      />

      <main className="pt-20">
        <HeroSection
          onWorkerSignUp={handleWorkerSignUp}
          onCustomerSignUp={handleCustomerSignUp}
          title="Connect with Local Service Providers"
          subtitle="Find trusted professionals in your area or offer your services to those who need them."
        />

        <section className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Find Services</h3>
              <p className="text-gray-600">
                Easily search and discover local service providers in your area
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Book Instantly</h3>
              <p className="text-gray-600">
                Schedule appointments with just a few clicks
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Trusted Reviews</h3>
              <p className="text-gray-600">
                Read verified reviews from real customers
              </p>
            </div>
          </div>
        </section>
      </main>

      <SignUpModal
        isOpen={showSignUpModal}
        onClose={() => setShowSignUpModal(false)}
        onSignUpComplete={handleSignUpComplete}
      />
    </div>
  );
};

export default LandingPage;
