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
import Footer from "./Footer";
import Header from "./Header";
import NoData from "./NoData";
import Loader from "./Loader";

export default function HomeUI() {
  const [data, setData] = useState({
    to: "",
    from: "",
    date: null,
  });

  const [suggestions, setSuggestions] = useState([]); // State for filtered suggestions
  const [inputField, setInputField] = useState(""); // State to track which field is being typed into ('from' or 'to')
  const [isFocused, setIsFocused] = useState(false); // Track focus state for showing suggestions
  const [response, setResponse] = useState([]);
  const [type, setType] = useState("");
  const [text,setText]=useState("Discover Available Options!");
  const [loading,setLoading]=useState(false);

  // Function to remove outdated localStorage data on page load

  useEffect(() => {
    console.log("Type", type);
    const today = new Date().toISOString().split("T")[0];
  
    for (const key in localStorage) {
      if (key.includes("to") && key.includes("and")) {
        const storedDate = key.split("and")[1];
        console.log(storedDate);
        console.log(today);
  
        if (storedDate < today) {
          localStorage.removeItem(key); // Remove if the date is before today
        }
      }
    }
  }, [type]); // Add `type` as a dependency here
  


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
setLoading(true);
      const key = `${data.from}to${data.to}and${data.date}`;
      const storedData = localStorage.getItem(key);

      if (storedData) {
        setResponse(JSON.parse(storedData));
        return;
      }

      try {
        const response = await axios.get(
          `https://bussearch.up.railway.app/scrape?from=${data.from}&to=${data.to}&date=${data.date}`
        );
        setResponse(response.data);
        localStorage.setItem(key, JSON.stringify(response.data));
      } catch (error) {
        console.error("There was an error fetching data:", error);
        setText("Server Problem!! Please try later ");
      }

      setLoading(false);
    },
    [data,text,loading]
  );

  const handleSuggestionClick = (cityName) => {
    setData((prevData) => ({
      ...prevData,
      [inputField]: cityName,
    }));
    setSuggestions([]);
    setIsFocused(false);
  };

  const handleFocus = (fieldName) => {
    setInputField(fieldName);
    setIsFocused(true);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setIsFocused(false);
    }, 200);
  };


  // Filter response based on selected type
const filteredResponse = response.filter((item) => {
  if (type === "") return true; // Show all items if no type is selected
  return type === "AC" 
    ? item.type === "AC" 
    : (item.type === "Non AC" || item.type === "NON_AC"); // Handle variations for Non-AC
});

if (loading){
  return (
    <>
  <div className="flex items-center justify-center max-h-screen h-screen" >
  <Loader/>
  </div>
    </>
  );
}else{
  return (
    <div className="bg-slate-50 min-h-screen h-auto flex flex-col justify-between items-center">
      <Header />
      <div className="w-10/12 flex flex-col gap-5">
        <div className="bg-white rounded-md w-11/12 p-2 flex flex-col items-center justify-center gap-3 sticky top-1 z-20">
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
            <fieldset className="relative max-w-md sm:max-w-sm">
              <Input
                id="from"
                name="from"
                value={data.from}
                onChange={handleChange}
                onFocus={() => handleFocus("from")}
                onBlur={handleBlur}
                placeholder="From"
                className="ps-11"
              />
              {inputField === "from" && suggestions.length > 0 && isFocused && (
                <ul className="text-center font-mono flex flex-col gap-1 mt-2">
                  {suggestions.map((city, index) => (
                    <li
                      key={index}
                      onMouseDown={() => handleSuggestionClick(city.name)}
                      className="bg-cyan-500 text-white hover:bg-cyan-300 py-1 rounded-md"
                    >
                      {city.name}
                    </li>
                  ))}
                </ul>
              )}
            </fieldset>

            <fieldset className="relative max-w-md sm:max-w-sm">
              <Input
                id="to"
                name="to"
                value={data.to}
                onChange={handleChange}
                onFocus={() => handleFocus("to")}
                onBlur={handleBlur}
                placeholder="To"
                className="ps-11"
              />
              {inputField === "to" && suggestions.length > 0 && isFocused && (
                <ul className="text-center font-mono flex flex-col gap-1 mt-2">
                  {suggestions.map((city, index) => (
                    <li
                      key={index}
                      onMouseDown={() => handleSuggestionClick(city.name)}
                      className="bg-cyan-500 text-white hover:bg-cyan-300 py-1 rounded-md"
                    >
                      {city.name}
                    </li>
                  ))}
                </ul>
              )}
            </fieldset>

            <fieldset className="relative max-w-md sm:max-w-sm">
              <Input
                id="date"
                name="date"
                value={data.date || ""}
                onChange={handleChange}
                min={new Date().toISOString().split("T")[0]}
                placeholder="Select date"
                type="date"
                className="ps-11"
              />
            </fieldset>

            <Button type="submit" className="bg-cyan-700 hover:bg-cyan-500">
              Search
            </Button>
          </form>

          <div>
            <select
              onChange={(e) => setType(e.target.value)}
              id="acType"
              name="acType"
              className="p-2 border border-cyan-800 text-cyan-800 font-serif rounded-md"
            >
              <option value="">All</option>
              <option value="AC">AC</option>
              <option value="Non-AC">Non-AC</option>
            </select>
          </div>
        </div>



        {
  response.length === 0 ? (
    <NoData text={text} />
    // <Loader/>
  ) : (
    <div className="mt-5 w-full flex flex-col items-center">
      {filteredResponse.map((data, index) => (
        <Card key={index} data={data} />
      ))}
    </div>
  )
}



  
      </div>
      <Footer />
    </div>
  );
}
 
}
