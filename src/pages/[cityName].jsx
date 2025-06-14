import { tempColorsChart } from "@/services/db";

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

export default function CityPage({ cityName, weatherData }) {
  const stats = extractWeatherStats(weatherData, "current");

  const futureStats = extractFutureWeatherStats(weatherData, "daily", 1);

  const icon = getWeatherIcon(Number(futureStats[4]?.value));

  return (
    <div className="flex flex-row justify-center items-center min-h-screen">
      <div className="flex bg-white rounded-[5px] shadow-[0px_2px_7px_0px_rgba(0,0,0,0.1)] p-[15px] min-h-[527px] w-3/5 text-black">
        <div className="flex flex-row justify-center w-full">
          {/**FIRST CARD */}

          <CurrentForcast stats={stats} weatherData={weatherData} />

          {/**SECOND CARD */}

          <div className="w-2/3 p-3">
            {/**FIRST DESCRIPTION */}

            <div className="flex flex-row justify-between">
              <div>
                <Image src={icon?.icon} width={50} height={50} alt="icon" />
              </div>

              <div>
                <div className="text-3xl font-bold">Tomorrow</div>

                <div>
                  {getWeatherDescription(futureStats[4], weatherCodeData)}
                </div>
              </div>

              <div
                className="
                w-[85px] h-[50px]
                font-semibold text-[23px] flex items-center justify-center"
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
                className=" w-[85px] h-[50px] font-semibold text-[23px] flex items-center justify-center"
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

            <div className="flex flex-col">
              <div className="flex flex-col m-3">
                <div className="flex flex-col">
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
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const cityName = params.cityName;
  console.log("🔄 getServerSideProps called for:", cityName);

  try {
    const geoRes = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=1&language=en&format=json`
    );

    if (!geoRes.ok) throw new Error(`Geo API failed for ${cityName}`);
    const geoData = await geoRes.json();
    if (!geoData.results?.length)
      throw new Error(`No geo results for ${cityName}`);

    const { latitude, longitude } = geoData.results[0];

    const weatherRes = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weather_code,temperature_2m_max,temperature_2m_min,uv_index_max,rain_sum,precipitation_probability_max&current=temperature_2m,relative_humidity_2m,is_day,wind_speed_10m,rain,showers,apparent_temperature,weather_code&forecast_days=3`
    );
    if (!weatherRes.ok) throw new Error(`Weather API failed for ${cityName}`);

    const weatherData = await weatherRes.json();

    return {
      props: { cityName, weatherData },
    };
  } catch (error) {
    console.error(
      `❌ getServerSideProps error for ${cityName}:`,
      error.message
    );
    return { notFound: true };
  }
}
