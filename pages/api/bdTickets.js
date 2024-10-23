import puppeteer from "puppeteer-core";
import randomUseragent from "random-useragent";
import chromium from "chrome-aws-lambda";
const bdtickets = async (from, to, year, month, day) => {

  let browser;

  // Check if running in production (Vercel) or locally
  if (process.env.AWS_LAMBDA_FUNCTION_VERSION) {
    // Running on Vercel (AWS Lambda environment)
    browser = await puppeteer.launch({
      defaultViewport: chromium.defaultViewport,
      args: [...chromium.args, "--start-maximized"],
      executablePath: await chromium.executablePath,
      headless: chromium.headless,
    });
  } else {
    // Running locally
    browser = await puppeteer.launch({
      headless: false, // You can set this to true if you want to run headless locally
      args: ["--start-maximized"],
      executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe", // Adjust this path based on your local Chrome installation
    });
  }

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
