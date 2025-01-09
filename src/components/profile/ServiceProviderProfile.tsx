import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Clock, CheckCircle } from "lucide-react";

interface ServiceProviderProfileProps {
  profile: {
    name: string;
    photo: string;
    rating: number;
    reviewCount: number;
    location: string;
    responseTime: string;
    completionRate: number;
    verified: boolean;
    description: string;
    skills: string[];
  };
}

const ServiceProviderProfile = ({ profile }: ServiceProviderProfileProps) => {
  return (
    <Card className="p-6 bg-white">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-32 h-32 rounded-full overflow-hidden flex-shrink-0">
          <img
            src={profile.photo}
            alt={profile.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1 space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-semibold flex items-center gap-2">
                {profile.name}
                {profile.verified && (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                )}
              </h2>
              <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span>{profile.rating}</span>
                <span>({profile.reviewCount} reviews)</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{profile.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{profile.responseTime} response time</span>
            </div>
            <div className="flex items-center gap-1">
              <CheckCircle className="w-4 h-4" />
              <span>{profile.completionRate}% completion rate</span>
            </div>
          </div>

          <p className="text-gray-700">{profile.description}</p>

          <div className="flex flex-wrap gap-2">
            {profile.skills.map((skill, index) => (
              <Badge key={index} variant="secondary">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ServiceProviderProfile;
