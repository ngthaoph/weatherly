import Link from "next/link";

function Header() {
  return (
    <header
      className={`sticky top-0 z-40 w-full h-full border-b p-1 bg-slate-800 text-white
      } `}
    >
      {/* Adjusted padding and border color */}
      <div className="flex flex-row justify-between m-2 text-lg">
        {/* LEFT */}
        <div className="flex items-center space-x-5">
          {" "}
          <Link href="/">Weatherly</Link>
        </div>
        {/* RIGHT */}

        <div className="flex flex-row space-x-5">
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
