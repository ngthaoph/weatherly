import { Input } from "@/components/ui/input";

function Search({ handleSearch, location, updateLocation }) {
  return (
    <div className="w-full max-w-sm items-center gap-1.5">
      <form onSubmit={handleSearch}>
        <label>Weather Search</label>
        <Input
          id="weather-search"
          className="bg-white"
          type="text"
          placeholder="Type in a Location"
          value={location}
          onChange={updateLocation}
        />
      </form>
    </div>
  );
}

export default Search;
