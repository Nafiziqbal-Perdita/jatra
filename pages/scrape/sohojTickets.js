import puppeteer from "puppeteer";
import randomUseragent from "random-useragent";

const sohojTickets = async (fromL, toL, year, monthN, day) => {
  // Array of month names (index 0 is January, 11 is December)
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const monthIndex = parseInt(monthN) - 1;
  const month = monthNames[monthIndex];

  // Capitalize the first letter of 'to' and 'from'
  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  const to = capitalize(toL);
  const from = capitalize(fromL);

  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: ["--start-maximized"],
  });

  const page = await browser.newPage();
  const userAgent = randomUseragent.getRandom();
  console.log("Using User Agent: ", userAgent);
  await page.setUserAgent(userAgent);

  const url = `https://www.shohoz.com/booking/bus/search?fromcity=${from}&tocity=${to}&doj=${day}-${month}-${year}&dor=`;

  await page.goto(url, {
    waitUntil: "networkidle0", // Wait until the page is fully loaded
    timeout: 0,
  });

  await page.waitForSelector(".trip-list-container", {
    visible: true,
  });

  const ticketItems = await page.evaluate(() => {
    const rows = document.querySelectorAll(".trip-info");

    let items = [];

    rows.forEach((row) => {
      const name = row.querySelectorAll("span")[0]?.innerText || "N/A";
      const type = row.querySelectorAll("span")[1]?.innerText || "N/A";
      const route = row.querySelectorAll("span")[2]?.innerText || "N/A"; // Corrected to properly access the route
      const start_time =
        row.querySelector(".departure-time")?.innerText || "N/A";
      const money = row.querySelector(".fare-to-pay")?.innerText || "N/A";
      const seats = row.querySelector(".trip-action span")?.innerText || "N/A";

      const res = {
        name,
        type,
        starting_point: route,
        start_time,
        seats,
        money,
      };
      items.push(res);
    });

    return items;
  });

  await browser.close(); // Don't forget to close the browser

  return ticketItems;
};

export default sohojTickets;