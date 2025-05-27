import React, { useState } from "react";
import { useTheme } from "./../context/ThemeContext";
import Image from "next/image";
function Toggle() {
  const { isDarkMode, toggleTheme } = useTheme();
  return (
    <div onClick={toggleTheme}>
      {/* {isDarkMode ? <LuSunMoon /> : <IoSunnyOutline />} */}
      <Image
        src={`/icons/${isDarkMode ? "toggle-on" : "toggle-off"}.png`}
        // src={"/icons/toggle-on.png"}
        width="35"
        height="35"
        alt={isDarkMode ? "Dark mode enabled" : "Dark mode disabled"}
      />
    </div>
  );
}

export default Toggle;
