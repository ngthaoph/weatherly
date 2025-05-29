import Link from "next/link";
import Image from "next/image";
import { useTheme, isDarkMode } from "@/context/ThemeContext";
import Toggle from "@/features/Toggle";
import clsx from "clsx";

function Header({ className }) {
  const { toggleTheme, isDarkMode } = useTheme();
  return (
    <header className={"sticky top-0 z-40 w-full h-full border-b p-2 "}>
      {/* Adjusted padding and border color */}
      <div className="flex flex-row justify-between font-bold text-sm">
        {/* LEFT */}
        <div className="flex items-center space-x-3 text-3xl font-bold p-2">
          {" "}
          <Link href="/">Weatherly</Link>
        </div>
        <div className="flex flex-row space-x-4 items-center">
          <Link href="/about">About</Link>
          <Link href="auswide">Australia</Link>

          <Link href="/contact">Contact</Link>
          <Toggle />
        </div>
      </div>
    </header>
  );
}

export default Header;
