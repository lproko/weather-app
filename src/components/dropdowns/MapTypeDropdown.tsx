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
  mapType: string;
  setMapType: Dispatch<SetStateAction<string>>;
};

const MapTypeDropdown = ({ mapType, setMapType }: Props) => {
  return (
    <Select value={mapType} onValueChange={(value) => setMapType(value)}>
      <SelectTrigger className="w-full md:w-[180px]">
        <SelectValue placeholder="Select Layer" />
      </SelectTrigger>
      <SelectContent className="z-10001">
        <SelectGroup>
          <SelectLabel>Map Layers</SelectLabel>
          {mapLayers.map((layer) => (
            <SelectItem key={layer.layer} value={layer.layer}>
              {layer.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default MapTypeDropdown;

const mapLayers = [
  {
    label: "Clouds",
    layer: "clouds_new",
  },
  {
    label: "Precipitation",
    layer: "precipitation_new",
  },
  {
    label: "Level pressure",
    layer: "pressure_new",
  },
  {
    label: "Wind speed",
    layer: "wind_new",
  },
  {
    label: "Temperature",
    layer: "temp_new",
  },
];
