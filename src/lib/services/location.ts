export interface LocationData {
  city: string;
  state: string;
  zipCode: string;
}

const US_STATES = [
  { name: "Alabama", code: "AL" },
  { name: "Alaska", code: "AK" },
  // ... add all states
];

export const getStates = () => US_STATES;

export const validateZipCode = (zipCode: string) => {
  const zipRegex = /^\d{5}(-\d{4})?$/;
  return zipRegex.test(zipCode);
};

export const getLocationSuggestions = async (
  input: string,
): Promise<LocationData[]> => {
  // This would typically call your backend API
  // For now, return mock data
  return [
    { city: "New York", state: "NY", zipCode: "10001" },
    { city: "Los Angeles", state: "CA", zipCode: "90001" },
    // Add more mock data
  ];
};
