import sohojTickets from "./sohojTickets";
import bdtickets from "./bdTickets";

export default async function handler(req, res) {
  console.log("Received request:", req.method, req.body); // Log the request method and body

  if (req.method === "POST") {
    const { from, to, date } = req.body;

    // Split the date into year, month, and day
    const [year, month, day] = date.split("-");

    try {
      // Use Promise.all to call both functions concurrently
      // const [sohojResult, bdTicketResult] = await Promise.all([
      //   sohojTickets(from.toLowerCase(), to.toLowerCase(), year, month, day),
      //   bdtickets(from.toLowerCase(), to.toLowerCase(), year, month, day),
      // ]);



      // const combinedResult = [...bdTicketResult, ...sohojResult];
      // console.log("Scraped Data:", combinedResult); // Log the scraped data

      const result = await bdtickets(from.toLowerCase(), to.toLowerCase(), year, month, day);




      // Respond with a success message and the result
      res.status(200).json({
        message: "Form submitted successfully!",
        data: result,
        from,
        to,
        date,
        year,
        month,
        day,
      });
    } catch (error) {
      console.error("Error processing data:", error);
      res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
  } else {
    // Handle any other HTTP methods
    res.status(405).json({ message: "Method not allowed" });
  }
}
