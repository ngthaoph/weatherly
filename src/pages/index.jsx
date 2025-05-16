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
  console.log(map);

  const [location, setLocation] = useState("");
  const [weather, setWeather] = useState({
    minTemp: "",
    maxTemp: "",
  });

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
    const resDetail = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${map.lat}&longitude=${map.lon}&daily=weather_code,uv_index_max,temperature_2m_max,temperature_2m_min&current=temperature_2m`
    );
    const dataDetail = await resDetail.json();

    console.log(dataDetail);
    setWeather((prevWeather) => ({
      minTemp: dataDetail.daily.temperature_2m_max[0],
      maxTemp: dataDetail.daily.temperature_2m_min[0],
    }));
  };

  return (
    <div>
      <Search
        handleSearch={handleSearch}
        location={location}
        s
        updateLocation={updateLocation}
      />

      <div>
        <h1 className="text-center mt-4">
          <AustraliaMap
            lat={map.lat}
            lon={map.lon}
            zoom={map.zoom}
            weather={weather}
          />
        </h1>
      </div>
    </div>
  );
}

export default HomePage;
