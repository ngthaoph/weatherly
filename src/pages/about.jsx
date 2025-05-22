// pages/about.tsx

import Head from "next/head";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function AboutPage() {
  return (
    <div className="flex justify-center">
      <div>
        <div>
          <title>About | Weatherly</title>
          <meta
            name="description"
            content="Learn more about Weatherly, a simple and fast weather forecast tool using the Open-Meteo API."
          />
        </div>
        <CardDescription className="max-w-3xl mx-auto px-4 py-12 text-gray-800">
          <h1 className="text-4xl font-bold mb-6">About Weatherly</h1>

          <div className="mb-4">
            <strong>Weatherly</strong> is a simple, fast tool for checking the{" "}
            <strong>maximum and minimum temperatures</strong> in any city around
            the world. Just search for a city and get instant results.
          </div>

          <p className="mb-4">
            We use the{" "}
            <a
              href="https://open-meteo.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              Open-Meteo API
            </a>{" "}
            to deliver accurate, real-time weather data — no sign-ups, no
            clutter.
          </p>

          <p className="mb-4">
            Weatherly also features a{" "}
            <strong>dedicated page for Australian cities</strong>, offering an
            at-a-glance view of weather across the country.
          </p>

          <p className="mb-4">
            This site was built as a personal project to combine clean design
            with practical functionality. Thanks for stopping by!
          </p>
        </CardDescription>
      </div>
    </div>
  );
}
