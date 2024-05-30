// Get 3rd Party modules
const express = require("express");
// Get Custom built modules
const fm = require("./filemgr");

// Create the express http server
const app = express();

// Define some built-in middleware
app.use(express.static("./Client"));
app.use(express.json());

// Define HTTP routes listening for requests
app.get("/list", async (req, res) => {
  const data = await fm.ReadData();
  if (data) {
    res.json(data);
  } else {
    res.status(500);
  }
});

app.post("/list", async (req,res) => {
  try {
    await fm.WriteData(req.body);
    res.status(200);
  } catch (error) {
    res.status(500);
  }
})

// page not found route
app.all("*", (req,res) => {
  res.status(404).send("<h1>Page Not Found...</h1>");
});

// Create a server
const appName = "Simple List";
const port = 3000;
app.listen(port, () => {
  console.log(`App ${appName} is running on port ${port}`);
})