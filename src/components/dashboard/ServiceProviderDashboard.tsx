import React from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, DollarSign, Users } from "lucide-react";
import ServiceProviderProfile from "../profile/ServiceProviderProfile";
import ReviewSection from "../profile/ReviewSection";

interface DashboardStat {
  label: string;
  value: string;
  icon: React.ReactNode;
  change?: string;
}

const stats: DashboardStat[] = [
  {
    label: "Total Earnings",
    value: "$2,450",
    icon: <DollarSign className="w-4 h-4" />,
    change: "+12.5%",
  },
  {
    label: "Active Bookings",
    value: "24",
    icon: <Calendar className="w-4 h-4" />,
  },
  {
    label: "Response Time",
    value: "2h",
    icon: <Clock className="w-4 h-4" />,
  },
  {
    label: "Total Customers",
    value: "156",
    icon: <Users className="w-4 h-4" />,
    change: "+3.2%",
  },
];

const mockProfile = {
  name: "John Doe",
  photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
  rating: 4.8,
  reviewCount: 124,
  location: "New York, NY",
  responseTime: "< 2 hours",
  completionRate: 98,
  verified: true,
  description:
    "Professional handyman with over 10 years of experience in home repairs and maintenance.",
  skills: ["Plumbing", "Electrical", "Carpentry", "Painting"],
};

const mockReviews = [
  {
    id: "1",
    author: "Alice Johnson",
    rating: 5,
    date: "2 days ago",
    content: "Excellent work! Very professional and thorough.",
  },
  {
    id: "2",
    author: "Bob Smith",
    rating: 4,
    date: "1 week ago",
    content: "Great service, would recommend to others.",
  },
];

const ServiceProviderDashboard = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => (
          <Card key={index} className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{stat.label}</p>
                <h3 className="text-2xl font-semibold mt-1">{stat.value}</h3>
                {stat.change && (
                  <p className="text-sm text-green-500">{stat.change}</p>
                )}
              </div>
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                {stat.icon}
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
          <TabsTrigger value="bookings">Bookings</TabsTrigger>
          <TabsTrigger value="earnings">Earnings</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-4">
          <ServiceProviderProfile profile={mockProfile} />
        </TabsContent>

        <TabsContent value="reviews">
          <ReviewSection reviews={mockReviews} />
        </TabsContent>

        <TabsContent value="bookings">
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Upcoming Bookings</h3>
            {/* Add BookingsList component here */}
          </Card>
        </TabsContent>

        <TabsContent value="earnings">
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Earnings Overview</h3>
            {/* Add EarningsChart component here */}
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ServiceProviderDashboard;
