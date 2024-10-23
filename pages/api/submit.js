import bdtickets from "./bdTickets";
import sohojTickets from "./sohojTickets";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { from, to, date } = req.body;

    const [year, month, day] = date.split("-");

    // Call the bdtickets function and wait for the result
    try {
      // Use Promise.all to call both functions concurrently
      const [sohojResult, bdTicketResult] = await Promise.all([
        sohojTickets(from.toLowerCase(), to.toLowerCase(), year, month, day),
        bdtickets(from.toLowerCase(), to.toLowerCase(), year, month, day),
      ]);
      // Combine the results
      // const combinedResult = {
      //   bdtickets: bdTicketResult,
      //   sohojTickets: sohojResult,
      // };
    const combinedResult = [...bdTicketResult, ...sohojResult];


     

      console.log("Scraped Data:", combinedResult); // Log the scraped data

      // Respond with a success message and the result
      res.status(200).json({
        message: "Form submitted successfully!",
        data: combinedResult,
        from,
        to,
        date,
        year,
        month,
        day,
      });
    } catch (error) {
      console.error("Error processing data:", error);
      res
        .status(500)
        .json({ message: "Internal Server Error", error: error.message });
    }
  } else {
    // Handle any other HTTP methods
    res.status(405).json({ message: "Method not allowed" });
  }
}
