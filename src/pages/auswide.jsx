import Image from "next/image";
import Link from "next/link";

import {
  tempColor,
  getWeatherIcon,
  capitalise,
  getWeatherDescription,
} from "@/services/helper";
import { cities, tempColorsChart, weatherCodeData } from "@/services/db";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import dynamic from "next/dynamic";

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
  console.log(citiesWithWeather);
  return (
    <div className="flex justify-center p-4">
      <div className="flex flex-row justify-between items-start gap-x-4 w-full max-w-screen-xl">
        <div className="flex justify-center w-2/8 bg-cyan-800 p-3 rounded-[9px]">
          <Table className="bg-white rounded-[9px]">
            <TableHeader>
              <TableRow>
                <TableHead className="w-1/2">City</TableHead>
                <TableHead className="w-1/8">NOW</TableHead>
                <TableHead className="w-1/8">MIN</TableHead>
                <TableHead className="w-1/8">MAX</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {dataGeoCoding?.map((geoCity, index) => {
                const cityName = geoCity.results[0].name;

                const weather = dailyWeatherData[index];

                const code = weather.daily?.weather_code[0]; //correct

                const icon = getWeatherIcon(code);

                return (
                  <TableRow key={geoCity.results[0].id || index}>
                    <TableCell className="flex flex-row items-center">
                      <Image
                        src={icon?.icon || "/icons/default.png"}
                        width={50}
                        height={50}
                        alt="code"
                      />
                      <Link href={`/${cityName.toLowerCase()}`}>
                        {capitalise(cityName)}
                      </Link>
                    </TableCell>
                    <TableCell>{weather.current.temperature_2m}</TableCell>
                    <TableCell
                      style={{
                        backgroundColor: tempColor(
                          weather.daily.temperature_2m_min[0],
                          tempColorsChart
                        ),
                      }}
                    >
                      {weather.daily.temperature_2m_min[0]}
                    </TableCell>
                    <TableCell
                      style={{
                        backgroundColor: tempColor(
                          weather.daily.temperature_2m_max[0],
                          tempColorsChart
                        ),
                      }}
                    >
                      {weather.daily.temperature_2m_max[0]}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
        <div className="flex justify-center h-full w-6/8">
          <AustraliaMap citiesWithWeather={citiesWithWeather} />
        </div>
      </div>
    </div>
  );
}
// export const getStaticProps = async () => {
//   const responseGeoCoding = await Promise.all(
//     cities.map((city) =>
//       fetch(
//         `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`
//       )
//     )
//   );

//   const dataGeoCoding = await Promise.all(
//     responseGeoCoding.map((res) => res.json())
//   );
//   if (!dataGeoCoding) {
//     return {
//       notFound: true,
//     };
//   }

//   // Fetch daily weather only for valid entries
//   const responseDailyWeather = await Promise.all(
//     dataGeoCoding.map((geo) =>
//       fetch(
//         `https://api.open-meteo.com/v1/forecast?latitude=${geo.results[0].latitude}&longitude=${geo.results[0].longitude}&daily=weather_code,uv_index_max,temperature_2m_max,temperature_2m_min&current=temperature_2m`
//       )
//     )
//   );

//   const dailyWeatherData = await Promise.all(
//     responseDailyWeather.map((res) => res.json())
//   );
//   if (!dailyWeatherData) {
//     return {
//       notFound: true,
//     };
//   }

//   return {
//     props: {
//       dataGeoCoding,
//       dailyWeatherData,
//     },
//     revalidate: 20,
//   };
// };
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
