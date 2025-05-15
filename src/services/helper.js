export const formatDate = (unixTimestamp) => {
  const date = new Date(unixTimestamp * 1000); // Multiply by 1000 to convert to milliseconds
  return date.toLocaleString(); // You can customize the format if needed
};

export const toCelsius = (kelvin) => (kelvin - 273.15).toFixed(1);

export const getDailyForecasts = (list) => {
  const daily = {};

  list.forEach((entry) => {
    const date = entry.dt_txt.split(" ")[0]; // Get 'YYYY-MM-DD'
    const hour = entry.dt_txt.split(" ")[1]; // Get 'HH:MM:SS'

    // Pick one time per day, e.g. 12:00:00
    if (hour === "12:00:00" && !daily[date]) {
      daily[date] = entry;
    }
  });

  // Return only the selected entries
  return Object.values(daily);
};

export const tempColor = (temp, tempColorsChart) => {
  // Iterate from highest to lowest to find the closest match
  for (let i = tempColorsChart.length - 1; i >= 0; i--) {
    if (temp >= tempColorsChart[i].temp) {
      return tempColorsChart[i].color;
    }
  }
  // If temp is below all ranges, return the coldest color
  return tempColorsChart[0].color;
};

export const getWeatherIcon = (codeNumber) => {
  const weatherCodeData = [
    {
      codes: 0,
      description: "Clear sky",
      icon: "/icons/sun.png",
    },
    {
      codes: 1,
      description: "Mainly clear",
      icon: "/icons/cloudsun.png",
    },
    {
      codes: 2,
      description: "Partly cloudy",
      icon: "/icons/cloudsun.png",
    },
    {
      codes: 3,
      description: "Overcast",
      icon: "/icons/cloudsun.png",
    },
    {
      codes: 45,
      description: "Fog",
      icon: "/icons/cloudfog.png",
    },
    {
      codes: 48,
      description: "Depositing rime fog",
      icon: "/icons/cloudfog.png",
    },
    {
      codes: 51,
      description: "Drizzle: Light intensity",
      icon: "/icons/drizzle.png",
    },
    {
      codes: 53,
      description: "Drizzle: Moderate intensity",
      icon: "/icons/drizzle.png",
    },
    {
      codes: 55,
      description: "Drizzle: Dense intensity",
      icon: "/icons/drizzle.png",
    },
    {
      codes: 56,
      description: "Freezing drizzle: Light intensity",
      icon: "/icons/drizzle.png",
    },
    {
      codes: 57,
      description: "Freezing drizzle: Dense intensity",
      icon: "/icons/drizzle.png",
    },
    {
      codes: 61,
      description: "Rain: Slight intensity",
      icon: "/icons/drizzle.png",
    },
    {
      codes: 63,
      description: "Rain: Moderate intensity",
      icon: "/icons/drizzle.png",
    },
    {
      codes: 65,
      description: "Rain: Heavy intensity",
      icon: "/icons/drizzle.png",
    },
    {
      codes: 66,
      description: "Freezing rain: Light intensity",
      icon: "/icons/drizzle.png",
    },
    {
      codes: 67,
      description: "Freezing rain: Heavy intensity",
      icon: "/icons/drizzle.png",
    },
    {
      codes: 71,
      description: "Snowfall: Slight intensity",
      icon: "/icons/snow.png",
    },
    {
      codes: 73,
      description: "Snowfall: Moderate intensity",
      icon: "/icons/snow.png",
    },
    {
      codes: 75,
      description: "Snowfall: Heavy intensity",
      icon: "/icons/snowflake.png",
    },
    {
      codes: 77,
      description: "Snow grains",
      icon: "/icons/snowflake.png",
    },
    {
      codes: 80,
      description: "Rain showers: Slight",
      icon: "/icons/rain.png",
    },
    {
      codes: 81,
      description: "Rain showers: Moderate",
      icon: "/icons/rain.png",
    },
    {
      codes: 82,
      description: "Rain showers: Violent",
      icon: "/icons/rain.png",
    },
    {
      codes: 85,
      description: "Snow showers: Slight",
      icon: "/icons/snowflake.png",
    },
    {
      codes: 86,
      description: "Snow showers: Heavy",
      icon: "/icons/snowflake.png",
    },
    {
      codes: 95,
      description: "Thunderstorm: Slight or moderate",
      icon: "/icons/thunder.png",
    },
    {
      codes: 96,
      description: "Thunderstorm with slight hail",
      icon: "/icons/hail.png",
    },
    {
      codes: 99,
      description: "Thunderstorm with heavy hail",
      icon: "/icons/hail.png",
    },
  ];
  const match = weatherCodeData.find((element) => element.codes === codeNumber);

  return match;
};
export const getWeatherDescription = (code, weatherCodeData) => {
  const match = weatherCodeData.find((entry) => entry.codes);

  return match.description;
};

export const formatToAustralianDate = (isoString) => {
  const date = new Date(isoString);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
  const year = date.getFullYear();

  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'

  return `${day}/${month}/${year} ${hours}:${minutes} ${ampm}`;
};

export const extractWeatherStats = (data, period) => {
  return [
    {
      label: "Feels Like",
      value: `${data[period].apparent_temperature}°C`,
    },

    {
      label: "Humidity",
      value: `${data[period].relative_humidity_2m}%`,
    },
    {
      label: "Wind",
      value: `${data[period].wind_speed_10m} km/h`,
    },
    {
      label: "Rain Since 9AM",
      value: `${data[period].rain} mm`,
    },
  ];
};

export const extractFutureWeatherStats = (data, period, delta) => {
  return [
    { label: "Day", value: `${data[period].time[delta]}` },

    { label: "Max Temp", value: `${data[period].temperature_2m_max[delta]}` },
    { label: "Min Temp", value: `${data[period].temperature_2m_min[delta]}` },
    { label: "UV Index", value: `${data[period].uv_index_max[delta]}` },
    { label: "Weather Code", value: `${data[period].weather_code[delta]}` },
    {
      label: "Chances of Rain",
      value: `${data[period].precipitation_probability_max[delta]}`,
    },
    {
      label: "Amount of Rain",
      value: `${data[period].rain_sum[delta]}`,
    },
  ];
};

export const capitalise = (word) => {
  if (!word) return "";
  return word.charAt(0).toUpperCase() + word.slice(1);
};

export const capitaliseAll = (word) => {
  return word.toUpperCase();
};
