import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import type { Coords } from "../type";
import { MaptilerLayer } from "@maptiler/leaflet-maptilersdk";
import { useEffect } from "react";

type Props = {
  setCordinates: (lat: number, lon: number) => void;
  coords: Coords;
  mapType: string;
};

const Map = ({ setCordinates, coords, mapType }: Props) => {
  return (
    <MapContainer
      key={`${coords.lat},${coords.lon}`}
      center={[coords.lat, coords.lon]}
      zoom={5}
      style={{ width: "100%", height: "500px" }}
    >
      <MapClick onMapClick={setCordinates} coords={coords} />
      <MapTileLayer />
      <TileLayer
        opacity={0.7}
        url={`https://tile.openweathermap.org/map/${mapType}/{z}/{x}/{y}.png?appid=${
          import.meta.env.VITE_API_KEY
        }`}
      />
      <Marker position={[coords.lat, coords.lon]} />
    </MapContainer>
  );
};

export default Map;

const MapClick = ({
  onMapClick,
  coords,
}: {
  onMapClick: (lat: number, lon: number) => void;
  coords: Coords;
}) => {
  const map = useMap();
  map.panTo([coords.lat, coords.lon]);
  map.on("click", (e) => {
    const { lat, lng } = e.latlng;

    onMapClick(lat, lng);
  });
  return null;
};

function MapTileLayer() {
  const map = useMap();

  useEffect(() => {
    const mapTileLayer = new MaptilerLayer({
      style: "basic-dark",
      apiKey: import.meta.env.VITE_MAPTILER_API_KEY,
    });
    mapTileLayer.addTo(map);
    return () => {
      map.removeLayer(mapTileLayer);
    };
  }, [map]);

  return null;
}
