import { useState } from "react";
import { Input } from "@/components/ui/input";

import dynamic from "next/dynamic";

import Search from "@/components/Search";

const AustraliaMap = dynamic(() => import("../components/AustraliaMap"), {
  ssr: false,
});

function HomePage() {
  const [map, setMap] = useState({
    lat: 20,
    lon: 0,
    zoom: 2, // default for world view
  });
  console.log(map.zoom);
  const [location, setLocation] = useState("");

  const updateLocation = (e) => {
    e.preventDefault();
    setLocation(e.target.value);
  };

  //use the location name to find the lat and lon
  const handleSearch = async (e) => {
    e.preventDefault();

    const res = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${location}&count=1&language=en&format=json`
    );
    const data = await res.json();

    const { latitude, longitude } = data?.results[0];

    setMap((prevMap) => ({
      ...prevMap,
      lat: latitude,
      lon: longitude,
      zoom: 5, // closer zoom into the location
    }));
  };

  return (
    <div>
      <Search
        handleSearch={handleSearch}
        location={location}
        updateLocation={updateLocation}
      />

      <div>
        <h1 className="text-center mt-4">
          <AustraliaMap lat={map.lat} lon={map.lon} zoom={map.zoom} />
        </h1>
      </div>
    </div>
  );
}

export default HomePage;
