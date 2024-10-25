"use client";
import React, { useCallback, useEffect, useState } from "react";
import cities from "./data/cities.json";
import {
  Button,
  Input,
  Select,
  SelectAction,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectValue,
} from "keep-react";
import axios from "axios";
import Card from "./Card";
import Header from "./Header";

export default function HomeUI() {
  const [data, setData] = useState({
    to: "",
    from: "",
    date: null,
  });

  const [suggestions, setSuggestions] = useState([]); // State for filtered suggestions
  const [inputField, setInputField] = useState(""); // State to track which field is being typed into ('from' or 'to')
  const [isFocused, setIsFocused] = useState(false); // Track focus state for showing suggestions
  const [response, setResponse] = useState(null);

  // Function to remove outdated localStorage data on page load
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];

    for (const key in localStorage) {
      if (key.includes("to") && key.includes("and")) {
        const storedDate = key.split("and")[1];
        console.log(storedDate);

        if (storedDate < today) {
          localStorage.removeItem(key); // Remove if the date is before today
        }
      }
    }
  }, []);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === "from" || name === "to") {
      setInputField(name);
      // Filter cities based on input value
      const filteredCities = cities
        .filter((city) =>
          city.name.toLowerCase().startsWith(value.toLowerCase())
        )
        .slice(0, 5); // Limit to 5 suggestions
      setSuggestions(filteredCities);
    }
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (data.from.trim() === "" || data.to.trim() === "" || !data.date)
        return;

      console.log(data);
      const key = `${data.from}to${data.to}and${data.date}`;
      const storedData = localStorage.getItem(key);
      // If data exists in localStorage, use it instead of making an Axios request
      if (storedData) {
        setResponse(JSON.parse(storedData));
        console.log("Loaded data from localStorage:", JSON.parse(storedData));
        return;
      }

      // Otherwise, make the Axios request and store the result
      try {
        const response = await axios.get(
          `https://bussearch.up.railway.app/scrape?from=${data.from}&to=${data.to}&date=${data.date}`
        );
        console.log("Fetched data from API:", response.data);
        setResponse(response.data);
        localStorage.setItem(key, JSON.stringify(response.data));
      } catch (error) {
        console.error("There was an error fetching data:", error);
      }
    },
    [data, response]
  );

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
    <div className="bg-slate-50 min-h-screen h-auto flex justify-center  ">
      <div className=" w-10/12 flex flex-col gap-5 ">
      
<Header/>
        <div className="bg-white rounded-md w-11/12 p-2 flex flex-col items-center  justify-center gap-3 sticky top-1 z-20">
          <div className="flex flex-col sm:flex-row gap-2">
            <fieldset className="relative max-w-md sm:max-w-sm">
              <Input placeholder="From" className="ps-11  " />
              <ul className="text-center font-mono flex flex-col gap-1 mt-2 ">
                <li className=" bg-cyan-500 text-white hover:bg-cyan-300  py-1 rounded-md ">
                  Dhaka
                </li>
              </ul>
            </fieldset>

            <fieldset className="relative max-w-md sm:max-w-sm">
              <Input placeholder="To" className="ps-11  " />
            </fieldset>

            <fieldset className="relative max-w-md sm:max-w-sm">
              <Input
                placeholder="Select date"
                type="date"
                className="ps-11  "
              />
            </fieldset>

            <Button className="bg-cyan-700 hover:bg-cyan-500">Search</Button>
          </div>
          <div>
            <select id="acType" name="acType" className="p-2 border border-cyan-800 text-cyan-800 font-serif rounded-md">
              <option value="" >
                All
              </option>
              <option value="AC">AC</option>
              <option value="Non-AC">Non-AC</option>
            </select>
          </div>
        </div>

        <div className="mt-5 w-full flex flex-col items-center  ">
          <Card />
        </div>
      </div>
    </div>
  );
}
// app/HomeUI.jsx
