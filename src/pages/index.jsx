import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";

import dynamic from "next/dynamic";

import Search from "@/components/Search";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

const LocationMap = dynamic(() => import("../components/LocationMap"), {
  ssr: false,
});

function HomePage() {
  const [map, setMap] = useState({
    lat: 20,
    lon: 0,
    zoom: 2, // default for world view
  });

  const [location, setLocation] = useState("");

  const [searchQuery, setSearchQuery] = useState("");
  console.log(searchQuery);

  const updateLocation = (e) => {
    e.preventDefault();
    setLocation(e.target.value);
  };
  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(location); // Triggers API fetch
  };

  const fetchCoords = async () => {
    const res = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${searchQuery}&count=1&language=en&format=json`
    );
    const data = await res.json();
    return data.results[0];
  };

  const fetchWeather = async (latitude, longitude) => {
    const res = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weather_code,uv_index_max,temperature_2m_max,temperature_2m_min&current=temperature_2m`
    );
    const data = await res.json();

    return {
      minTemp: data.daily.temperature_2m_min[0],
      maxTemp: data.daily.temperature_2m_max[0],
    };
  };
  //get the location coords
  const { data: coords, isSuccess: hasCoords } = useQuery({
    queryKey: ["coords", searchQuery],
    queryFn: fetchCoords,
    enabled: !!searchQuery,
  });

  const { data: weatherData, isSuccess: hasWeather } = useQuery({
    queryKey: ["weather", coords?.latitude, coords?.longitude],
    queryFn: () => fetchWeather(coords.latitude, coords.longitude),
    enabled: !!coords,
  });

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
          <LocationMap
            lat={coords?.latitude}
            lon={coords?.longitude}
            weather={weatherData}
            zoom={weatherData ? 10 : 2}
          />
        </h1>
      </div>
    </div>
  );
}

export default HomePage;
