import React from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

type Props = {};

const Map = ({}: Props) => {
  return (
    <MapContainer
      center={[30, 50]}
      zoom={5}
      style={{ width: "1000px", height: "500px" }}
    >
      <MapClick />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[30, 50]} />
    </MapContainer>
  );
};

export default Map;

const MapClick = () => {
  const map = useMap();

  map.on("click", (e) => {
    const { lat, lng } = e.latlng;
    map.panTo([lat, lng]);
  });
  return null;
};
