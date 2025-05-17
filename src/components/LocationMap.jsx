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

L.Icon.Default.mergeOptions({
  iconUrl,
  iconRetinaUrl,
  shadowUrl,
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
        <Marker position={[lat, lon]}>
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
