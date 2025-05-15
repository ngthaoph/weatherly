import Link from "next/link";

function NotFound() {
  return (
    <div className="flex justify-center hero min-h-screen">
      <div className="hero-content">
        <div className="flex flex-col max-w-md">
          <h1 className="text-5xl font-bold text-pretty">
            I have bad news for you
          </h1>
          <p className="py-6">
            The page you are looking for might be removed or is temporarily
            unavailable
          </p>
          <Link
            className="btn btn-xs sm:btn-sm md:btn-md
          lg:btn-lg xl:btn-xl"
            href="/"
          >
            Back to Home Page
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
