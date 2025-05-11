export const weatherIconMap = {
  Clear: "/icons/sun.png",
  Clouds: "/icons/clouds.png",
  Rain: "/icons/rain.png",
  Thunderstorm: "/icons/thunder.png",
  Snow: "/icons/snow.png",
  Drizzle: "/icons/drizzle.png",
};

export const weatherCodeData = [
  {
    codes: [0],
    description: "Clear sky",
    icon: "/icons/sun.png",
  },
  {
    codes: [1, 2, 3],
    description: "Mainly clear, partly cloudy, and overcast",
    icon: "/icons/cloudsun.png",
  },
  {
    codes: [45, 48],
    description: "Fog and depositing rime fog",
    icon: "/icons/cloudfog.png",
  },
  {
    codes: [51, 53],
    description: "Drizzle: Light, moderate, and dense intensity",
    icon: "/icons/drizzle.png",
  },
  {
    codes: [55],
    description: "Drizzle: Dense intensity",
    icon: "/icons/drizzle.png",
  },
  {
    codes: [56, 57],
    description: "Freezing Drizzle: Light and dense intensity",
    icon: "/icons/drizzle.png",
  },
  {
    codes: [61],
    description: "Rain: Slight intensity",
    icon: "/icons/drizzle.png",
  },
  {
    codes: [63, 65],
    description: "Rain: Moderate and heavy intensity",
    icon: "/icons/drizzle.png",
  },
  {
    codes: [66, 67],
    description: "Freezing Rain: Light and heavy intensity",
    icon: "/icons/drizzle.png",
  },
  {
    codes: [71, 73],
    description: "Snow fall: Slight and moderate intensity",
    icon: "/icons/snow.png",
  },
  {
    codes: [75],
    description: "Snow fall: Heavy intensity",
    icon: "/icons/snowflake.png",
  },
  {
    codes: [77],
    description: "Snow grains",
    icon: "/icons/snowflake.png",
  },
  {
    codes: [80, 81, 82],
    description: "Rain showers: Slight, moderate, and violent",
    icon: "/icons/rain.png",
  },
  {
    codes: [85, 86],
    description: "Snow showers: Slight and heavy",
    icon: "/icons/snowflake.png",
  },
  {
    codes: [95],
    description: "Thunderstorm: Slight or moderate",
    icon: "/icons/thunder.png",
  },
  {
    codes: [96, 99],
    description: "Thunderstorm with slight and heavy hail",
    icon: "/icons/hail.png",
  },
];
