import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { getDailyForecasts } from "@/services/helper";
import { weatherIconMap } from "@/services/weathericons";

import ForecastCard from "@/common/foreCastCard";

const Weather = (props) => {
  const { location, fiveDaysWeather } = props;

  const days = getDailyForecasts(fiveDaysWeather.list.map((day) => day));

  return (
    <div>
      <div className="flex justify-center">
        Weather Updates in {location.name} For The Next 5 Days
      </div>
      <div className="flex p-3 justify-center-safe">
        <Carousel>
          <CarouselContent className="flex ">
            {days.map((day, index) => (
              <CarouselItem
                key={index}
                className="pl-1 md:basis-1/2 lg:basis-1/3"
              >
                <div>
                  <ForecastCard
                    key={index}
                    day={day}
                    weatherIconMap={weatherIconMap}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
};

export const getStaticProps = async () => {
  const APIKey = "6b98c4e197dc840daf0106c06ad4c697";
  const responseLocation = await fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=Melbourne&limit=1&appid=${APIKey}`
  );

  const dataLocation = await responseLocation.json();

  const location = dataLocation[0];
  if (!responseLocation.ok) {
    throw new Error(`Failed to fetch posts - Error ${responseLocation.status}`);
  }
  const responseCurrentWeather = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&appid=${APIKey}`
  );
  const currentWeather = await responseCurrentWeather.json();

  const responseWeatherFiveDays = await fetch(
    `http://api.openweathermap.org/data/2.5/forecast?lat=${location.lat}&lon=${location.lon}&appid=${APIKey}`
  );
  const fiveDaysWeather = await responseWeatherFiveDays.json();

  return {
    props: { location, currentWeather, fiveDaysWeather },
    revalidate: 20,
  };
};

export default Weather;
