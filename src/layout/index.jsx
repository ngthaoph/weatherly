import Header from "./Header";
import Footer from "./Footer";
import { useTheme } from "@/context/ThemeContext";
import clsx from "clsx";

import { Roboto } from "next/font/google";

// const roboto = Roboto({
//   subset: ["latin"],
//   weight: ["300", "400", "700"],
//   style: ["normal", "italic"],
// });

function Layout(props) {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div
      className={clsx("relative flex min-h-screen min-w-screen flex-col", {
        "bg-[var(--foreground)] text-[var(--background)]": !isDarkMode,
        "bg-[var(--background)] text-[var(--foreground)]": isDarkMode,
      })}
    >
      <Header />

      {/* APP BODY */}
      <div
        className={clsx("flex-1 overflow-y-auto", {
          "bg-[var(--foreground)] text-[var(--background)]": isDarkMode,
          "bg-[var(--background)] text-[var(--foreground)]": !isDarkMode,
        })}
      >
        {props.children}
      </div>

      <Footer />
    </div>
  );
}

export default Layout;
