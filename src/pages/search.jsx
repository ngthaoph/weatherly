import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useRouter } from "next/router";
import CityPage from "./[cityName]";

function Search(props) {
  const { cityName, weatherData } = props;
  console.log(cityName, weatherData);
  const router = useRouter();
  const [location, setLocation] = useState("");
  const updateLocation = (e) => {
    e.preventDefault();
    setLocation(e.target.value);
  };
  const moveToLocation = (e) => {
    router.push(`/${location.toLowerCase()}`);
  };

  return (
    <div className="w-full max-w-sm items-center gap-1.5">
      <div>
        <label>Weather Search</label>
        <Input
          id="weather-search"
          className="bg-white"
          type="text"
          placeholder="Your Current Location"
          value={location}
          onChange={updateLocation}
          onKeyDown={moveToLocation}
        />
      </div>
    </div>
  );
}
export default Search;
