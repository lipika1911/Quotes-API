const fs = require("fs");
const path = require("path");

module.exports = (req, res) => {
  // ✅ Enable CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  const quotesPath = path.join(__dirname, "..", "quotes.json");
  const quotes = JSON.parse(fs.readFileSync(quotesPath, "utf-8"));

  const url = req.url.split("?")[0];

  if (url === "/" || url === "") {
    res.status(200).send("Welcome to the Quotes API");
  } else if (url === "/quotes") {
    res.status(200).json(quotes);
  } else if (url === "/quotes/random") {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    res.status(200).send(randomQuote);
  } else {
    res.status(404).send("Not Found");
  }
};
