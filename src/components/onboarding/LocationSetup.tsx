import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getStates, validateZipCode } from "@/lib/services/location";

interface LocationSetupProps {
  onLocationChange: (location: {
    city: string;
    state: string;
    zipCode: string;
  }) => void;
  onRadiusChange?: (radius: number) => void;
  showRadius?: boolean;
  disabled?: boolean;
}

const LocationSetup = ({
  onLocationChange,
  onRadiusChange,
  showRadius = false,
  disabled = false,
}: LocationSetupProps) => {
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [radius, setRadius] = useState(20);
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!city || !state || !zipCode) {
      setError("All fields are required");
      return;
    }

    if (!validateZipCode(zipCode)) {
      setError("Invalid ZIP code format");
      return;
    }

    setError("");
    onLocationChange({ city, state, zipCode });
  };

  const handleRadiusChange = (value: number[]) => {
    setRadius(value[0]);
    onRadiusChange?.(value[0]);
  };

  return (
    <div className="space-y-6 bg-white p-6 rounded-lg">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="city">City</Label>
          <Input
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city"
            disabled={disabled}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="state">State</Label>
          <Select value={state} onValueChange={setState} disabled={disabled}>
            <SelectTrigger>
              <SelectValue placeholder="Select state" />
            </SelectTrigger>
            <SelectContent>
              {getStates().map((state) => (
                <SelectItem key={state.code} value={state.code}>
                  {state.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="zipCode">ZIP Code</Label>
          <Input
            id="zipCode"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
            placeholder="Enter ZIP code"
            maxLength={5}
            disabled={disabled}
          />
        </div>

        {showRadius && (
          <div className="space-y-4">
            <Label>Service Radius</Label>
            <div className="space-y-2">
              <Slider
                value={[radius]}
                max={50}
                step={1}
                onValueChange={handleRadiusChange}
                disabled={disabled}
              />
              <div className="flex justify-between text-sm text-gray-500">
                <span>0 miles</span>
                <span>{radius} miles</span>
                <span>50 miles</span>
              </div>
            </div>
          </div>
        )}

        {error && <p className="text-sm text-red-500">{error}</p>}

        <Button onClick={handleSubmit} className="w-full" disabled={disabled}>
          Save Location
        </Button>
      </div>
    </div>
  );
};

export default LocationSetup;
