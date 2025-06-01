import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { tempColor, getWeatherIcon, capitalise } from "@/services/helper";
import { tempColorsChart } from "@/services/db";
import { useTheme } from "@/context/ThemeContext";

function TemperatureTable({ dataGeoCoding, dailyWeatherData }) {
  const { isDarkMode } = useTheme();
  return (
    <Table
      className={`${
        isDarkMode
          ? "bg-[var(--background)] text-[var(--font)]"
          : "bg-[var(--foreground)] text-[var(--background)]"
      } font-bold`}
    >
      <TableBody>
        {dataGeoCoding?.map((geoCity, index) => {
          const cityName = geoCity.results[0].name;

          const weather = dailyWeatherData[index];

          const code = weather.daily?.weather_code[0]; //correct

          const icon = getWeatherIcon(code);

          return (
            <TableRow key={geoCity.results[0].id || index}>
              <TableCell className="flex flex-row items-center">
                <Image src={icon?.icon} width={50} height={50} alt="code" />
                <Link href={`/${cityName.toLowerCase()}`}>
                  {capitalise(cityName)}
                </Link>
              </TableCell>
              <TableCell>{weather.current.temperature_2m}</TableCell>
              {/**MIN */}
              <TableCell
                style={{
                  backgroundColor: tempColor(
                    weather.daily.temperature_2m_min[0]
                  ),
                  color: "black",
                }}
                className="font-bold"
              >
                {weather.daily.temperature_2m_min[0]}
              </TableCell>
              {/**Max */}
              <TableCell
                style={{
                  backgroundColor: tempColor(
                    weather.daily.temperature_2m_max[0]
                  ),

                  color: "black",
                }}
              >
                {weather.daily.temperature_2m_max[0]}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

export default TemperatureTable;
