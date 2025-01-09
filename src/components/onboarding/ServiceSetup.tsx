import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Plus, X } from "lucide-react";

interface ServiceSetupProps {
  onServiceChange: (services: string[]) => void;
  onSkillsChange: (skills: string[]) => void;
  selectedServices: string[];
  selectedSkills: string[];
  disabled?: boolean;
}

const popularServices = [
  "Home Cleaning",
  "Plumbing",
  "Electrical",
  "Carpentry",
  "Painting",
  "Landscaping",
  "Moving",
  "Handyman",
];

const skillsByService: Record<string, string[]> = {
  "Home Cleaning": [
    "Deep Cleaning",
    "Regular Maintenance",
    "Window Cleaning",
    "Carpet Cleaning",
  ],
  Plumbing: ["Pipe Repair", "Installation", "Drain Cleaning", "Water Heater"],
  Electrical: ["Wiring", "Lighting", "Panel Upgrade", "Troubleshooting"],
  // Add more services and their related skills
};

const ServiceSetup = ({
  onServiceChange,
  onSkillsChange,
  selectedServices,
  selectedSkills,
  disabled,
}: ServiceSetupProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [customSkill, setCustomSkill] = useState("");

  const filteredServices = popularServices.filter((service) =>
    service.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleServiceToggle = (service: string) => {
    const newServices = selectedServices.includes(service)
      ? selectedServices.filter((s) => s !== service)
      : [...selectedServices, service];

    onServiceChange(newServices);

    // Add default skills for the service
    if (skillsByService[service]) {
      const newSkills = [...selectedSkills, ...skillsByService[service]];
      onSkillsChange([...new Set(newSkills)]);
    }
  };

  const addCustomSkill = () => {
    if (customSkill && !selectedSkills.includes(customSkill)) {
      onSkillsChange([...selectedSkills, customSkill]);
      setCustomSkill("");
    }
  };

  const removeSkill = (skill: string) => {
    onSkillsChange(selectedSkills.filter((s) => s !== skill));
  };

  return (
    <div className="space-y-6 bg-white p-6 rounded-lg">
      {/* Service Categories */}
      <Card className="p-4">
        <Label className="text-sm font-medium mb-4 block">
          Service Categories
        </Label>
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search services..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
              disabled={disabled}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {filteredServices.map((service) => (
              <Badge
                key={service}
                variant={
                  selectedServices.includes(service) ? "default" : "outline"
                }
                className="cursor-pointer"
                onClick={() => !disabled && handleServiceToggle(service)}
              >
                {service}
              </Badge>
            ))}
          </div>
        </div>
      </Card>

      {/* Skills */}
      <Card className="p-4">
        <Label className="text-sm font-medium mb-4 block">
          Skills & Expertise
        </Label>
        <div className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Add a custom skill"
              value={customSkill}
              onChange={(e) => setCustomSkill(e.target.value)}
              disabled={disabled}
              onKeyPress={(e) => e.key === "Enter" && addCustomSkill()}
            />
            <Button
              variant="outline"
              size="icon"
              onClick={addCustomSkill}
              disabled={disabled || !customSkill}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {selectedSkills.map((skill) => (
              <Badge
                key={skill}
                variant="secondary"
                className="flex items-center gap-1"
              >
                {skill}
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => !disabled && removeSkill(skill)}
                />
              </Badge>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ServiceSetup;
