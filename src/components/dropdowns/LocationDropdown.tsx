import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Dispatch, SetStateAction } from "react";
type Props = {
  location: string;
  setLocation: Dispatch<SetStateAction<string>>;
};

const LocationDropdown = ({ location, setLocation }: Props) => {
  return (
    <Select value={location} onValueChange={(value) => setLocation(value)}>
      <SelectTrigger className="w-full md:w-[180px]">
        <SelectValue placeholder="Select location" />
      </SelectTrigger>
      <SelectContent className="z-10001">
        <SelectGroup>
          <SelectLabel>Locations</SelectLabel>
          {location === "custom" && (
            <SelectItem value="custom">Custom</SelectItem>
          )}
          {locations.map((city) => (
            <SelectItem key={city} value={city}>
              {city}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default LocationDropdown;

const locations = [
  "New York",
  "London",
  "Tokyo",
  "Paris",
  "Dubai",
  "Singapore",
  "Los Angeles",
  "Sydney",
  "Rome",
  "Barcelona",
  "Hong Kong",
  "Berlin",
  "Toronto",
  "Chicago",
  "Istanbul",
  "Seoul",
  "Amsterdam",
  "Bangkok",
  "San Francisco",
  "Vienna",
];
