import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { DollarSign, Clock } from "lucide-react";

interface PricingSetupProps {
  onPricingChange: (pricing: PricingData) => void;
  onAvailabilityChange: (availability: AvailabilityData) => void;
  disabled?: boolean;
}

interface PricingData {
  baseRate: number;
  minimumHours: number;
  travelFee: number;
}

interface AvailabilityData {
  workingDays: string[];
  workingHours: {
    start: string;
    end: string;
  };
  instantBooking: boolean;
}

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const PricingSetup = ({
  onPricingChange,
  onAvailabilityChange,
  disabled,
}: PricingSetupProps) => {
  const [pricing, setPricing] = useState<PricingData>({
    baseRate: 0,
    minimumHours: 2,
    travelFee: 0,
  });

  const [availability, setAvailability] = useState<AvailabilityData>({
    workingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    workingHours: {
      start: "09:00",
      end: "17:00",
    },
    instantBooking: true,
  });

  const handlePricingChange = (field: keyof PricingData, value: number) => {
    const newPricing = { ...pricing, [field]: value };
    setPricing(newPricing);
    onPricingChange(newPricing);
  };

  const toggleWorkingDay = (day: string) => {
    const newDays = availability.workingDays.includes(day)
      ? availability.workingDays.filter((d) => d !== day)
      : [...availability.workingDays, day];

    const newAvailability = { ...availability, workingDays: newDays };
    setAvailability(newAvailability);
    onAvailabilityChange(newAvailability);
  };

  const handleHoursChange = (field: "start" | "end", value: string) => {
    const newAvailability = {
      ...availability,
      workingHours: { ...availability.workingHours, [field]: value },
    };
    setAvailability(newAvailability);
    onAvailabilityChange(newAvailability);
  };

  return (
    <div className="space-y-6 bg-white p-6 rounded-lg">
      {/* Pricing */}
      <Card className="p-4">
        <Label className="text-sm font-medium mb-4 block">Pricing</Label>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Hourly Rate ($)</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="number"
                  min="0"
                  value={pricing.baseRate}
                  onChange={(e) =>
                    handlePricingChange("baseRate", Number(e.target.value))
                  }
                  className="pl-10"
                  disabled={disabled}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Minimum Hours</Label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="number"
                  min="1"
                  value={pricing.minimumHours}
                  onChange={(e) =>
                    handlePricingChange("minimumHours", Number(e.target.value))
                  }
                  className="pl-10"
                  disabled={disabled}
                />
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Travel Fee ($)</Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="number"
                min="0"
                value={pricing.travelFee}
                onChange={(e) =>
                  handlePricingChange("travelFee", Number(e.target.value))
                }
                className="pl-10"
                disabled={disabled}
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Availability */}
      <Card className="p-4">
        <Label className="text-sm font-medium mb-4 block">Availability</Label>
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {daysOfWeek.map((day) => (
              <Button
                key={day}
                variant={
                  availability.workingDays.includes(day) ? "default" : "outline"
                }
                onClick={() => !disabled && toggleWorkingDay(day)}
                className="flex-1"
                disabled={disabled}
              >
                {day.slice(0, 3)}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Start Time</Label>
              <Input
                type="time"
                value={availability.workingHours.start}
                onChange={(e) => handleHoursChange("start", e.target.value)}
                disabled={disabled}
              />
            </div>
            <div className="space-y-2">
              <Label>End Time</Label>
              <Input
                type="time"
                value={availability.workingHours.end}
                onChange={(e) => handleHoursChange("end", e.target.value)}
                disabled={disabled}
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="instant-booking"
              checked={availability.instantBooking}
              onCheckedChange={(checked) => {
                const newAvailability = {
                  ...availability,
                  instantBooking: checked as boolean,
                };
                setAvailability(newAvailability);
                onAvailabilityChange(newAvailability);
              }}
              disabled={disabled}
            />
            <Label htmlFor="instant-booking" className="text-sm font-normal">
              Enable instant booking
            </Label>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PricingSetup;
