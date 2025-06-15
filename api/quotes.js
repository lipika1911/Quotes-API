// api/quotes.js
const fs = require("fs");
const path = require("path");

module.exports = (req, res) => {
  const quotesPath = path.join(__dirname, "..", "quotes.json");
  const quotes = JSON.parse(fs.readFileSync(quotesPath, "utf-8"));

  const url = req.url.split("?")[0]; // remove query params

  if (url === "/" || url === "") {
    res.status(200).send("Welcome to the Quotes API");
  } else if (url === "/quotes") {
    res.status(200).json(quotes);
  } else if (url === "/quotes/random") {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    res.status(200).send(randomQuote); // just the quote text
  } else {
    res.status(404).send("Not Found");
  }
};
