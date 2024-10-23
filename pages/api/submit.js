// pages/api/yourApi.js

import { exec } from 'child_process';
import path from 'path';
import sohojTickets from "./sohojTickets";
import bdtickets from "./bdTickets";

export default async function handler(req, res) {
  console.log("Received request:", req.method, req.body); // Log the request method and body

  if (req.method === "POST") {
    const { from, to, date } = req.body;

    // Split the date into year, month, and day
    const [year, month, day] = date.split("-");

    const pythonScriptPath = path.join(process.cwd(), './worker.py'); // Path to your Python script
    console.log(pythonScriptPath);

    try {
      // Execute the Python script
      exec(`python ${pythonScriptPath}`, (error, stdout, stderr) => {
        if (error) {
          console.error(`Error executing Python script: ${error.message}`);
          return res.status(500).json({ message: "Failed to run Python script", error: error.message });
        }

        if (stderr) {
          console.error(`Python error: ${stderr}`);
          return res.status(500).json({ message: "Error in Python script", error: stderr });
        }

        // Send the output from the Python script back to the frontend
        res.status(200).json({ message: stdout.trim() }); // trim() to remove any extra newline characters
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
