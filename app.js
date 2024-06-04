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
  try {
    await tasks.create({
      name: req.body.name,
      completed: false
    });
    res.status(200).json({msg: 'Task created successfully'});
  } catch (error) {
    res.status(500).json({msg: error.message});
  }
})

app.put("/list", async (req, res) => {
  try {
    const response = await tasks.updateOne(
      { name: req.body.name },
      { completed: true }
    )
    console.log("number of matched documents: ", response.matchedCount);
    res.status(200).json({msg: "Task updated successfully"});
  } catch (error) {
    res.status(500).json({msg: error.message});
  }
})

app.delete("/list", async (req, res) => {
  try {
    const numberOfDeleted = (await tasks.deleteOne({ name: req.body.name })).deletedCount;
    if (numberOfDeleted == 0) {
      console.log("Task not found!");
      res.status(500).json({msg: "Task not found."});
    } else {
      res.status(200).json({msg: "Task deleted."});
    }
  } catch (error) {
    res.status(500).json({msg: error.message});
  }
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
