import React, { useState } from "react";
import { useTheme } from "./../context/ThemeContext";
import Image from "next/image";
function Toggle() {
  const { isDarkMode, toggleTheme } = useTheme();
  return (
    <div onClick={toggleTheme}>
      <Image
        src={`/icons/${isDarkMode ? "day-mode" : "night-mode"}.png`}
        // src={"/icons/toggle-on.png"}
        width="20"
        height="20"
        alt={isDarkMode ? "Dark mode enabled" : "Dark mode disabled"}
      />
    </div>
  );
}

export default Toggle;
