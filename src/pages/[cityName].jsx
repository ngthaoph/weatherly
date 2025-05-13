import { cities, tempColorsChart } from "@/services/db";

import {
  formatToAustralianDate,
  extractWeatherStats,
  extractFutureWeatherStats,
  getWeatherIcon,
  getWeatherDescription,
  tempColor,
  capitalise,
  capitaliseAll,
} from "@/services/helper";

import { weatherCodeData } from "@/services/db";

import Image from "next/image";

import CurrentForcast from "@/common/currentForcast";

import { useRouter } from "next/router";

export default function CityPage({ cityName, weatherData, paths }) {
  const stats = extractWeatherStats(weatherData, "current");

  const futureStats = extractFutureWeatherStats(weatherData, "daily", 1);
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-center">
      <div className="flex bg-white rounded-[5px] shadow-[0px_2px_7px_0px_rgba(0,0,0,0.1)] p-[15px] min-h-[527px] w-3/5">
        <div className="flex flex-row justify-center w-full">
          {/**FIRST CARD */}

          <CurrentForcast stats={stats} weatherData={weatherData} />

          {/**SECOND CARD */}

          <div className="w-2/3 p-3">
            {/**FIRST DESCRIPTION */}

            <div className="flex flex-row justify-between">
              <div>
                <Image
                  src={getWeatherIcon(futureStats[4], weatherCodeData)}
                  width={50}
                  height={50}
                  alt="icon"
                />
              </div>

              <div>
                <div className="text-3xl font-bold">Tomorrow</div>

                <div>
                  {getWeatherDescription(futureStats[4], weatherCodeData)}
                </div>
              </div>

              <div
                className="font-semibold text-[23px] flex items-center justify-center"
                style={{
                  backgroundColor: tempColor(
                    futureStats[2].value,

                    tempColorsChart
                  ),
                }}
              >
                {futureStats[2].value}°C
              </div>

              <div
                className="font-semibold text-[23px] flex items-center justify-center"
                style={{
                  backgroundColor: tempColor(
                    futureStats[1].value,

                    tempColorsChart
                  ),
                }}
              >
                {futureStats[1].value}°C
              </div>
            </div>

            {/**DETAILS */}

            <div className="m-2">
              <div>
                {capitalise(cityName)} Weather on{" "}
                {formatToAustralianDate(futureStats[0].value)}
              </div>

              <div className="flex flex-col ">
                <div className="font-bold">
                  {capitaliseAll(futureStats[3].label)}:
                </div>

                <div> {futureStats[3].value}</div>
              </div>

              <div className="flex flex-col">
                <div className="font-bold">
                  {capitaliseAll(futureStats[5].label)}
                </div>{" "}
                <div> {futureStats[5].value}%</div>
              </div>

              <div className="flex flex-col">
                <div className="font-bold">
                  {capitaliseAll(futureStats[6].label)}
                </div>

                <div>{futureStats[6].value}mm</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  try {
    const paths = cities.map((city) => ({
      params: { cityName: city.toLowerCase() },
    }));
    console.log("paths", paths);

    return {
      paths,
      fallback: "blocking", // or 'blocking' if you prefer
    };
  } catch (error) {
    console.error("Error in getStaticPaths:", error);

    // Fails the build, which is usually desired here
    throw new Error("Failed to generate static paths.");
  }
}

export async function getStaticProps({ params }) {
  console.log("getStaticProps - params:", params);
  const cityName = params.cityName;

  // Call geo + weather API like in your other code

  const geoRes = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=1&language=en&format=json`
  );
  if (!geoRes) {
    return {
      notFound: true,
    };
  }
  const geoData = await geoRes.json();

  const lat = geoData.results[0].latitude;

  const lon = geoData.results[0].longitude;

  const weatherRes = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weather_code,temperature_2m_max,temperature_2m_min,uv_index_max,rain_sum,precipitation_probability_max&current=temperature_2m,relative_humidity_2m,is_day,wind_speed_10m,rain,showers,apparent_temperature,weather_code&forecast_days=3`
  );
  if (!weatherRes) {
    return {
      notFound: true,
    };
  }

  const weatherData = await weatherRes.json();

  return {
    props: {
      cityName,

      weatherData,
    },

    revalidate: 60, // ISR (optional)
  };
}
