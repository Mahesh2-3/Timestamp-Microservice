// index.js
// where your node app starts

// Init project
var express = require("express");
var app = express();

// Enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// So that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // Some legacy browsers choke on 204

// Serve static files
app.use(express.static("public"));

// Serve index.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// First API endpoint (unchanged)
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

// Timestamp API endpoint
app.get("/api/:date?", function (req, res) {
  let { date } = req.params;

  if (!date) {
    date = new Date();
  } else if (/^\d+$/.test(date)) { 
    // Check if it's a valid Unix timestamp (all digits)
    date = new Date(parseInt(date));
  } else {
    date = new Date(date);
  }

  if (date.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  res.json({
    unix: date.getTime(),
    utc: date.toUTCString(),
  });
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});

