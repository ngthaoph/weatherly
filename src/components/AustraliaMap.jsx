import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Image from "next/image";
import L from "leaflet";
// Manually import marker images
import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";

import { createMapIcon } from "@/services/helper";
import Link from "next/link";

export default function AustraliaMap({ citiesWithWeather }) {
  // -25.2744, 133.7751]
  const position = [-25.2744, 133.7751];
  return (
    <MapContainer
      center={position}
      zoom={4}
      scrollWheelZoom={false}
      style={{ height: "100%", width: "100%" }}
      className="w-full h-full rounded-xl"
    >
      <TileLayer
        attribution='&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {citiesWithWeather.map((city) => (
        <Marker
          position={[city.latitude, city.longitude]}
          icon={createMapIcon(city.name, city.tempNow)}
        >
          <Popup>
            <Link href={`/${city.name.toLowerCase()}`}>
              <strong>{city.name}</strong>
            </Link>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
