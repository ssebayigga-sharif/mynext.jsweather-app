"use client";

/*
  Weather App using Next.js (app router), React.js, TypeScript, Tailwind CSS.
  This app allows you to search for a city's weather using the OpenWeatherMap API.
  It showcases:
  - Controlled input for searching
  - Fetching data from an external API with TypeScript types
  - Displaying weather information in a styled card
  - A section for your contact email as a client-facing touchpoint

  Note: Be sure to add your OpenWeatherMap API key below.
*/

import React, { useState } from "react";

// Define the expected shape of weather data
type WeatherData = {
  name: string;
  weather: { description: string; icon: string }[];
  main: { temp: number; humidity: number };
  wind: { speed: number };
  sys: { country: string };
};

const API_KEY = "f9966b1c4d1dc32f259544aa0c8e1f4b";

export default function WeatherApp() {
  const [city, setCity] = useState(""); // Input state
  const [weather, setWeather] = useState<WeatherData | null>(null); // Weather data
  const [loading, setLoading] = useState(false); // Loader state
  const [error, setError] = useState<string | null>(null);

  // my email
  const contactEmail = "sharifsseba@gmail.com";

  // Handle form submission
  async function fetchWeather(e: React.FormEvent) {
    e.preventDefault();
    if (!city.trim()) {
      setError("Please enter a city name.");
      setWeather(null);
      return;
    }
    setLoading(true);
    setError(null);
    setWeather(null);

    try {
      // Fetch from OpenWeatherMap; units=metric for Celsius
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
          city.trim()
        )}&appid=${API_KEY}&units=metric`
      );
      if (!res.ok) {
        if (res.status === 404) {
          throw new Error("City not found.");
        } else {
          throw new Error("Unable to fetch weather.");
        }
      }
      const data = await res.json();
      setWeather(data);
    } catch (err: any) {
      setError(err.message || "Failed to get weather.");
    }
    setLoading(false);
  }

  return (
    <main className="flex min-h-screen flex-col items-center bg-blue-100 py-10">
      <section className="w-full max-w-md rounded-lg shadow bg-white p-6 mb-8">
        <h1 className="text-center text-2xl font-extrabold text-blue-700 mb-6">
          Ssebayigga Sharif Weather App
        </h1>
        {/* Search Form */}
        <form onSubmit={fetchWeather} className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Enter city..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-600"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white rounded font-semibold px-4 py-2"
            disabled={loading}
          >
            Search
          </button>
        </form>

        {/* Loading, Error, or Weather Result */}
        <div className="min-h-[120px] flex flex-col items-center justify-center">
          {loading && (
            <div className="text-blue-700 font-medium">Loading...</div>
          )}
          {error && <div className="text-red-500 font-medium">{error}</div>}
          {weather && (
            <div className="bg-blue-50 rounded-xl shadow p-4 w-full flex flex-col items-center">
              <div className="flex items-center gap-3 mb-2">
                <img
                  src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                  alt={weather.weather[0].description}
                  className="w-16 h-16"
                />
                <div>
                  <span className="text-lg font-bold text-blue-800">
                    {weather.name}, {weather.sys.country}
                  </span>
                  <div className="capitalize text-blue-600">
                    {weather.weather[0].description}
                  </div>
                </div>
              </div>
              <div className="flex justify-around w-full mt-2">
                <div className="text-blue-900">
                  <span className="font-semibold">Temp: </span>
                  {Math.round(weather.main.temp)}°C
                </div>
                <div className="text-blue-900">
                  <span className="font-semibold">Humidity: </span>
                  {weather.main.humidity}%
                </div>
                <div className="text-blue-900">
                  <span className="font-semibold">Wind: </span>
                  {weather.wind.speed} m/s
                </div>
              </div>
            </div>
          )}
          {!weather && !loading && !error && (
            <div className="text-gray-400 text-center py-4">
              Search for your city's weather!
            </div>
          )}
        </div>
      </section>

      {/* Contact / Email Area for Interested Clients */}
      <section className="w-full max-w-md bg-blue-50 rounded-lg shadow border border-blue-200 p-4 flex flex-col items-center">
        <h2 className="text-lg font-semibold mb-2 text-blue-700">
          Interested in working together?
        </h2>
        <p className="text-blue-800 mb-1">Contact me at:</p>
        <a
          href={`mailto:${contactEmail}`}
          className="font-mono text-blue-600 hover:underline wrap-break-word"
        >
          {contactEmail}
        </a>
      </section>
    </main>
  );
}

/*
Explanation:
---------------------
- This is a responsive Weather App built with Next.js, React, TypeScript, and styled via Tailwind CSS.
- Users can enter a city to get real-time weather info (temp, humidity, wind, description, and icon) using the OpenWeatherMap API.
- TypeScript types ensure that the fetched weather data fits our UI logic.
- Loading and error states are handled smoothly in the UI.
- At the bottom, a contact/email section is included as a place for clients to reach you – update your email accordingly.
- Just insert your OpenWeatherMap API key at the top to get started!
- Easy to customize and extend further.

Note:
- No Turbopack or any unstable Next.js features are used.
- This works in raw Next.js with app router structure.
*/
