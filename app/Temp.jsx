"use client";
import { Button, Input } from "keep-react";
import React, { useState } from "react";
import cities from "./data/cities.json";
export default function Temp() {
  const [suggestions, setSuggestions] = useState([]); // State for filtered suggestionsr

  return (
    <>
      <div>
      <form onSubmit={handleSubmit} className="flex h-screen items-center justify-center gap-5 ">
        <div className="space-x-2 bg-gray-100 px-5 py-3 rounded-md relative ">
          <label htmlFor="from">From</label>
          <input
            id="from"
            name="from"
            type="text"
            value={data.from}
            onChange={handleChange}
            onFocus={() => handleFocus("from")} // Show suggestions when input is focused
            onBlur={handleBlur} // Hide suggestions when input loses focus
            className="border border-black"
          />
          {/* Display suggestions for 'from' */}
          {inputField === "from" && suggestions.length > 0 && isFocused && (
            <ul className="absolute top-full mt-1 max-h-40 overflow-y-auto bg-white border border-gray-300 z-10 w-full">
              {suggestions.map((city, index) => (
                <li
                  key={index}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                  onMouseDown={() => handleSuggestionClick(city.name)} // Use onMouseDown instead of onClick
                >
                  {city.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="space-x-2 bg-gray-100 px-5 py-3 rounded-md relative">
          <label htmlFor="to">To</label>
          <input
            id="to"
            name="to"
            type="text"
            value={data.to}
            onChange={handleChange}
            onFocus={() => handleFocus("to")} // Show suggestions when input is focused
            onBlur={handleBlur} // Hide suggestions when input loses focus
            className="border border-black"
          />
          {/* Display suggestions for 'to' */}
          {inputField === "to" && suggestions.length > 0 && isFocused && (
            <ul className="absolute top-full mt-1 max-h-40 overflow-y-auto bg-white border border-gray-300 z-10 w-full">
              {suggestions.map((city, index) => (
                <li
                  key={index}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                  onMouseDown={() => handleSuggestionClick(city.name)} // Use onMouseDown instead of onClick
                >
                  {city.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="space-x-2 bg-gray-100 px-5 py-3 rounded-md">
          <label htmlFor="date">Date</label>
          <input
            id="date"
            name="date"
            type="date"
            value={data.date || ""}
            onChange={handleChange}
            className="border border-black"
            min={new Date().toISOString().split("T")[0]} 
          />
        </div>

        <div className="space-x-2 bg-gray-100 px-5 py-3 rounded-md">
          <Button type="submit">Submitt</Button>
        </div>
      </form>



    </div>
    </>
  );
}
