import Link from "next/link";

function Header() {
  return (
    <header
      className={`sticky top-0 z-40 w-full h-full border-b p-2 bg-[var(--foreground)]
      text-white
      } `}
    >
      {/* Adjusted padding and border color */}
      <div className="flex flex-row justify-between  text-sm">
        {/* LEFT */}
        <div className="flex items-center space-x-3">
          {" "}
          <Link href="/">Weatherly</Link>
        </div>
        <div className="flex flex-row space-x-4">
          <Link href="/about">About</Link>
          <Link href="auswide">Australia</Link>

          <Link href="/contact">Contact</Link>
          <div>Toggle</div>
        </div>
      </div>
    </header>
  );
}

export default Header;
