import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { formatToAustralianDate } from "@/services/helper";

function CurrentForcast({ stats, weatherData }) {
  return (
    <Card className="p-4 bg-gradient-to-br from-[#0a2135] to-[#5583b2] rounded-2xl shadow-lg text-white w-2/5">
      {/**FIRST PART */}
      <div className="flex flex-col justify-between mb-2">
        <div className="flex flex-row items-center justify-between">
          <h5 className="text-lg font-bold">Now</h5>

          <h5 className="text-sm">
            {formatToAustralianDate(weatherData.current.time)}
          </h5>
        </div>
        <div>
          <div className="text-3xl">{weatherData.current.temperature_2m}°C</div>
        </div>
      </div>
      {/**SECOND PART */}

      <div>
        {stats.map((value) => (
          <div className="flex flex-col grow basis-1/2 max-w-1/2 mb-[6px] box-border">
            <h5 className="font-semibold">{value.label}</h5>
            <div>{value.value}</div>
            <hr className="bg-white border-none h-px w-auto m-0 self-auto opacity-25" />
          </div>
        ))}
      </div>
    </Card>
  );
}

export default CurrentForcast;
