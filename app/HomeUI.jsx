"use client";
import React, { useCallback, useEffect, useState } from "react";
import cities from "./data/cities.json";
import { Button } from 'keep-react';

export default function HomeUI() {
  const [data, setData] = useState({
    to: "",
    from: "",
    date: null,
  });

  const [suggestions, setSuggestions] = useState([]); // State for filtered suggestions
  const [inputField, setInputField] = useState(""); // State to track which field is being typed into ('from' or 'to')
  const [isFocused, setIsFocused] = useState(false); // Track focus state for showing suggestions

  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setData((prevData) => ({
        ...prevData,
        [name]: value,
      }));

      if (name === "from" || name === "to") {
        setInputField(name);
        // Filter cities based on input value
        const filteredCities = cities
          .filter((city) => city.name.toLowerCase().startsWith(value.toLowerCase()))
          .slice(0, 5); // Limit to 5 suggestions
        setSuggestions(filteredCities);
      }
    },
    []
  );

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();

    if (data.from.trim() === "") return;
    if (data.to.trim() === "") return;
    if (!data.date) return;

    console.log(data);

    try {
      const response = await fetch('/api/submit ', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      console.log("Success:", result);

    } catch (error) {
      console.log(error);
    }

  }, [data]);

  const handleSuggestionClick = (cityName) => {
    setData((prevData) => ({
      ...prevData,
      [inputField]: cityName, // Set the selected city in the relevant input field
    }));
    setSuggestions([]); // Clear suggestions after selection
    setIsFocused(false); // Hide suggestions after selection
  };

  const handleFocus = (fieldName) => {
    setInputField(fieldName);
    setIsFocused(true); // Show suggestions on focus
  };

  const handleBlur = () => {
    // Delay blur to allow time for suggestion click
    setTimeout(() => {
      setIsFocused(false);
    }, 200);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex h-screen items-center justify-center gap-5">
        <div className="space-x-2 bg-gray-100 px-5 py-3 rounded-md relative">
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
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </div>
  );
}
