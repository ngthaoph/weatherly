import { Card, CardContent, CardDescription } from "@/components/ui/card";
import Image from "next/image";
import { formatDate, toCelsius, getWeatherIcon } from "@/services/helper";

const ForecastCard = ({ day, weatherIconMap }) => {
  return (
    <Card className="w-full max-w-xs bg-slate-200">
      <CardContent className="flex flex-col content-center gap-2">
        <div>{formatDate(day.dt)}</div>
        <div>{day.weather[0].description}</div>

        <div>
          <Image
            src={getWeatherIcon(day.weather[0].main, weatherIconMap)}
            width={64}
            height={64}
            alt="Weather icon"
          />
        </div>

        <div className="text-md">{toCelsius(day.main.temp)}</div>

        <div className="text-sm space-y-1">
          <div>Feels like {toCelsius(day.main.feels_like)}</div>
          <div>Max temp: {toCelsius(day.main.temp_max)}</div>
          <div>Min temp: {toCelsius(day.main.temp_min)}</div>
          <div>Humidity: {day.main.humidity}%</div>
        </div>
      </CardContent>

      <CardDescription />
    </Card>
  );
};

export default ForecastCard;
