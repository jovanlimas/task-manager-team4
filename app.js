const express = require("express");
const connectDB = require("./connect");

// Create the express http server
const app = express();

// Define some built-in middleware
app.use(express.static("./Client"));
app.use(express.json());

// Data model (schema)
const tasks = require("./Task.js");

// Define HTTP routes listening for requests
app.get("/list", async (req, res) => {
  try {
    const task = await tasks.find(); 
    res.status(200).json({task});
  } catch {
    res.status(500).json({msg: error});
  };
});

app.post("/list", async (req,res) => {
  // try {
  //   await fm.WriteData(req.body);
  //   res.status(200);
  // } catch (error) {
  //   res.status(500);
  // }
})

// page not found route
app.all("*", (req,res) => {
  res.status(404).send("<h1>Page Not Found...</h1>");
});

// Create a server
const appName = "Simple List";
const port = 3000;
(async function () {
  try {
    await connectDB();
    app.listen(port, () => {console.log(`${appName} is listening on port ${port}.`)});
  } catch (error) {
    console.log(error);
  };
})();