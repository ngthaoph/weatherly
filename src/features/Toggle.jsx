import React, { useState } from "react";
import { useTheme } from "./../context/ThemeContext";
import Image from "next/image";
function Toggle() {
  const { isDarkMode, toggleTheme } = useTheme();
  return (
    <div onClick={toggleTheme}>
      {/* {isDarkMode ? <LuSunMoon /> : <IoSunnyOutline />} */}
      <Image
        src={`/icons/${isDarkMode ? "day-mode" : "night-mode"}.png`}
        // src={"/icons/toggle-on.png"}
        width="25"
        height="25"
        backgroundColor="white"
        alt={isDarkMode ? "Dark mode enabled" : "Dark mode disabled"}
      />
    </div>
  );
}

export default Toggle;
