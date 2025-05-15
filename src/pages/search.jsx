import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useRouter } from "next/router";
import CityPage from "./[cityName]";

function Search() {
  const router = useRouter();
  const [location, setLocation] = useState("");
  const updateLocation = (e) => {
    e.preventDefault();
    setLocation(e.target.value);
  };
  const moveToLocation = (e) => {
    router.push(`/${location.toLowerCase()}`);
  };
  console.log("location:", location);
  return (
    <div className="w-full max-w-sm items-center gap-1.5">
      <div>
        <label>Weather Search</label>
        <Input
          id="weather-search"
          className="bg-white"
          type="text"
          placeholder="Type in A Location"
          value={location}
          onChange={updateLocation}
          onKeyDown={moveToLocation}
        />
      </div>
      <div>{location}</div>
    </div>
  );
}

export default Search;
