export const cities = [
  "Canberra",
  "Sydney",
  "Melbourne",
  // "Brisbane",
  // "Perth",
  // "Adelaide",
  // "Hobart",
  // "Darwin",
];

export const tempColorsChart = [
  { temp: -10, color: "#ffffff" }, // snowy white
  { temp: 0, color: "#cce6ff" }, // light icy blue
  { temp: 5, color: "#99ccff" }, // soft blue
  { temp: 10, color: "#66b2ff" }, // medium blue
  { temp: 15, color: "#3399ff" }, // bright blue
  { temp: 20, color: "#66cc66" }, // mild green
  { temp: 25, color: "#ffcc00" }, // warm yellow
  { temp: 30, color: "#ff9933" }, // hot orange
  { temp: 35, color: "#ff6600" }, // hotter orange
  { temp: 40, color: "#ff3300" }, // red-orange
  { temp: 45, color: "#cc0000" }, // deep red
  { temp: 50, color: "#990000" }, // very hot red
];

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
