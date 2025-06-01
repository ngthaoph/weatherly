import { Input } from "@/components/ui/input";

function Search({ handleSearch, location, updateLocation }) {
  return (
    <div className="w-full max-w-sm items-center gap-1.5">
      <form onSubmit={handleSearch}>
        <label></label>
        <Input
          id="weather-search"
          className="bg-[var(--muted)] text-black rounded-[4px]"
          type="text"
          placeholder={`🔍  Search your location`}
          value={location}
          onChange={updateLocation}
        />
      </form>
    </div>
  );
}

export default Search;
