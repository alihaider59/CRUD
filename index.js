const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());

const routes = require("./routes/mainRoutes");

// to send response on the base route '/'
app.get("/", (req, res) => {
  res.send("Welcome to the API!");
});

// send response with the api prefix
app.use("/api", routes);

const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

module.exports = app;
