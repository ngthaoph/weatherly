import Header from "./Header";
import Footer from "./Footer";
import { useTheme } from "@/context/ThemeContext";
import clsx from "clsx";

import { Victor_Mono } from "next/font/google";

const victor = Victor_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  style: ["normal", "italic"],
});

function Layout(props) {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div
      className={clsx(
        victor.className,
        "relative flex min-h-screen min-w-screen flex-col",
        {
          "bg-[var(--background)] text-[var(--foreground)]": !isDarkMode,
          "bg-[var(--foreground)] text-[var(--background)]": isDarkMode,
        }
      )}
    >
      <Header />

      {/* APP BODY */}
      <div
        className={clsx("flex-1 overflow-y-auto", {
          "bg-[var(--dark)] text-[var(--light]": !isDarkMode,
          "bg-[var(--light)] text-[var(--dark]": isDarkMode,
        })}
      >
        {props.children}
      </div>

      <Footer />
    </div>
  );
}

export default Layout;
