// File: /pages/api/submit.js
import puppeteer from "puppeteer"; // Ensure Puppeteer is imported correctly
import fs from "fs/promises"; // Import fs.promises for asynchronous handling
import randomUseragent from "random-useragent"; // Import random-useragent

async function bdtickets(from, to, year,month,day) {
  // Initialize Puppeteer and scrape the data
  const browser = await puppeteer.launch({
    headless: false, // Set to false to see the browser
    defaultViewport: null, // Full-screen mode
    args: ["--start-maximized"], // Maximize the window
  });

  const page = await browser.newPage();
  const userAgent = randomUseragent.getRandom(); // Get a random user agent
  console.log("Using User Agent: ", userAgent); // Log the User Agent
  await page.setUserAgent(userAgent);

  // Build the URL dynamically based on the provided data
  const url = `https://bdtickets.com/bus/search/${from}-to-${to}?journeyDate=${year}-${month}-${day}`;
  
  await page.goto(url, {
    waitUntil: "networkidle0", // Wait until the page is fully loaded
    timeout: 0,
  });

  // Wait for the container element to load
  await page.waitForSelector(".container", {
    visible: true,
  });

  const ticketItems = await page.evaluate(() => {
    const rows = document.querySelectorAll(".col-12");
    let items = [];
    rows.forEach((row) => {
      const lists = row.querySelectorAll("li");
      if (lists.length > 0) {
        const operatorName = lists[0].querySelector("h6")?.innerText || "N/A";
        const spans = lists[0].querySelectorAll("span");
        const money = lists[0].querySelector("h3")?.innerText || "N/A";
        const res = {
          name: operatorName,
          type: spans[0]?.innerText || "N/A",
          starting_point: spans[1]?.innerText || "N/A",
          start_time: spans[3]?.innerText || "N/A",
          seats: spans[5]?.innerText || "N/A",
          money: money,
        };
        items.push(res);
      }
    });
    return items;
  });

  // Convert the array to a JSON string
  const jsonContent = JSON.stringify(ticketItems, null, 2); // Pretty print the JSON

  // Write the JSON string to a file asynchronously
  try {
    await fs.writeFile("ticketData.json", jsonContent, "utf8");
    console.log("Data has been saved to ticketData.json");
  } catch (err) {
    console.log("An error occurred while writing JSON to file:", err);
  }

  await browser.close(); // Close the browser
  return ticketItems; // Return the scraped data
}

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { from, to, date } = req.body;

    const [year, month, day] = date.split('-');
    
    // Call the bdtickets function and wait for the result
    try {
      const result = await bdtickets(from.toLowerCase(), to.toLowerCase(), year,month,day); // Fetch data
      console.log("Scraped Data:", result); // Log the scraped data

      // Respond with a success message and the result
      res.status(200).json({ 
        message: 'Form submitted successfully!', 
        data: result, 
        from, 
        to, 
        date, 
        year, 
        month, 
        day 
      });
    } catch (error) {
      console.error("Error processing data:", error);
      res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
  } else {
    // Handle any other HTTP methods
    res.status(405).json({ message: 'Method not allowed' });
  }
}
