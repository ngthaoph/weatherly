import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Image from "next/image";
import L from "leaflet";
// Manually import marker images
import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";

import { tempColor } from "@/services/helper";

// Fix the default icon
delete L.Icon.Default.prototype._getIconUrl;

export const icon = L.divIcon({
  className: "custom-temp-icon",
  html: `<div 
    style="
      width: 50px;
      height: 50px;
      background-color: none;
      color: black;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      font-size: 12px;
      border-radius: 6px;
      box-shadow: 0 2px 6px rgba(0,0,0,0.3);
      text-align: center;
      background-image: url('/icons/pin.png');
      background-size: cover;
      background-position: center;"
     </div>`,
  iconSize: [50, 50],
  iconAnchor: [25, 25],
});
export default function LocationMap({ lat = 20, lon = 0, zoom, weather = {} }) {
  return (
    <div style={{ height: "50vh", width: "100%" }}>
      <MapContainer
        center={[lat, lon]}
        zoom={zoom}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
        key={`${lat}-${lon}-${zoom}`} // force remount when location or zoom changes
      >
        <TileLayer
          attribution='&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[lat, lon]} icon={icon}>
          <Popup>
            <div className="flex flex-row justify-center">
              <div
                style={{
                  backgroundColor: tempColor(weather.minTemp),
                }}
              >
                {weather.minTemp}°C
              </div>
              <div
                style={{
                  backgroundColor: tempColor(weather.maxTemp),
                }}
              >
                {weather.maxTemp}°C
              </div>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
