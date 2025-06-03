import { getWeatherIcon } from "@/services/helper";
import { cities } from "@/services/db";

import dynamic from "next/dynamic";
import TemperatureTable from "@/components/Table";

const AustraliaMap = dynamic(() => import("../components/AustraliaMap"), {
  ssr: false,
});

function allCities(props) {
  const { dataGeoCoding, dailyWeatherData } = props;

  const citiesWithWeather = dataGeoCoding
    .map((geoCity, index) => {
      const { results } = geoCity;
      const weather = dailyWeatherData[index];

      if (!results?.length || !weather) return null;

      const { name, id, latitude, longitude } = results[0];
      const code = weather.daily?.weather_code?.[0];
      const icon = getWeatherIcon(code);
      const tempNow = weather.current?.temperature_2m;
      const tempMin = weather.daily?.temperature_2m_min?.[0];
      const tempMax = weather.daily?.temperature_2m_max?.[0];

      return {
        id: id || `${name}-${index}`,
        name,
        latitude,
        longitude,
        icon,
        tempNow,
        tempMin,
        tempMax,
        weatherCode: code,
      };
    })
    .filter(Boolean); // Remove null/invalid entries

  return (
    <div className="flex flex-row justify-center p-5">
      <div className="flex justify-between items-center gap-x-4 w-full max-w-screen-xl">
        <div className="flex justify-center w-2/8 p-3">
          <TemperatureTable
            dataGeoCoding={dataGeoCoding}
            dailyWeatherData={dailyWeatherData}
          />
        </div>
        <div className="flex justify-center h-full w-6/8">
          <AustraliaMap citiesWithWeather={citiesWithWeather} />
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps = async () => {
  try {
    const responseGeoCoding = await Promise.all(
      cities.map((city) =>
        fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`
        )
      )
    );

    const dataGeoCoding = await Promise.all(
      responseGeoCoding.map((res) => res.json())
    );

    const responseDailyWeather = await Promise.all(
      dataGeoCoding.map((geo) =>
        fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${geo.results[0].latitude}&longitude=${geo.results[0].longitude}&daily=weather_code,uv_index_max,temperature_2m_max,temperature_2m_min&current=temperature_2m`
        )
      )
    );

    const dailyWeatherData = await Promise.all(
      responseDailyWeather.map((res) => res.json())
    );

    return {
      props: {
        dataGeoCoding,
        dailyWeatherData,
      },
    };
  } catch (error) {
    console.error("Error in getServerSideProps (/auswide):", error);
    return {
      notFound: true,
    };
  }
};

export default allCities;
