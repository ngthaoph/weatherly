import Image from "next/image";
import Link from "next/link";

import {
  toCelsius,
  tempColor,
  getWeatherIcon,
  capitalise,
} from "@/services/helper";
import { cities, tempColorsChart } from "@/services/db";

import { weatherCodeData } from "@/services/weathericons";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function allCities(props) {
  const { dataGeoCoding, dailyWeatherData } = props;
  console.log(dailyWeatherData);

  return (
    <div className="flex justify-center ">
      <div className="flex w-1/3 bg-cyan-800 p-3 rounded-[9px]">
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
            {dataGeoCoding.map((geoCity, index) => {
              const cityName = geoCity.results[0].name;
              console.log(typeof cityName);
              const weather = dailyWeatherData[index];
              const code = weather.daily?.weather_code[index];
              const icon = getWeatherIcon(code, weatherCodeData);

              return (
                <TableRow key={geoCity.results[0].id || index}>
                  <TableCell className="flex flex-row items-center">
                    <Image src={icon} width={50} height={50} alt="code" />
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
