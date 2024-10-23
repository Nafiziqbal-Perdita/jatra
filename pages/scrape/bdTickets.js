import puppeteer from "puppeteer";
import randomUseragent from "random-useragent";

const bdtickets = async (from, to, year, month, day) => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: ["--start-maximized"],
  });

  const page = await browser.newPage();
  const userAgent = randomUseragent.getRandom();
  console.log("Using User Agent: ", userAgent);
  await page.setUserAgent(userAgent);


  

  const url = `https://bdtickets.com/bus/search/${from}-to-${to}?journeyDate=${year}-${month}-${day}`;
  await page.goto(url, { waitUntil: "networkidle0", timeout: 0 });

  await page.waitForSelector(".container", { visible: true });

  const ticketItems = await page.evaluate(() => {
    const rows = document.querySelectorAll(".col-12");
    let items = [];
    rows.forEach((row) => {
      const lists = row.querySelectorAll("li");
      if (lists.length > 0) {
        const operatorName = lists[0].querySelector("h6")?.innerText || "N/A";
        const spans = lists[0].querySelectorAll("span");
        const money = lists[0].querySelector("h3")?.innerText || "N/A";
        items.push({
          name: operatorName,
          type: spans[0]?.innerText || "N/A",
          starting_point: spans[1]?.innerText || "N/A",
          start_time: spans[3]?.innerText || "N/A",
          seats: spans[5]?.innerText || "N/A",
          money: money,
        });
      }
    });
    return items;
  });

  await browser.close();
  return ticketItems;
};

export default bdtickets;