const http = new coreHTTP();

// Block Variables
let theList = [];

// setup selectors
const result = document.querySelector(".result");
const input = document.querySelector("#listitem");
const addButton = document.querySelector(".add-btn");
const delButton = document.querySelector(".del-btn");
const doneButton = document.querySelector(".done-btn");

// Listeners
addButton.addEventListener("click", httpPost);
delButton.addEventListener("click", httpDelete);
doneButton.addEventListener("click", httpPut);

// Button Animations
function handleAddButtonShadow() {
  addButton.style.boxShadow = "1px 3px 5px";
}

function handleDeleteButtonShadow() {
  delButton.style.boxShadow = "1px 3px 5px";
}

/* Helper Functions */
function ShowList() {
  let output = "<ul>";
  for (let item of theList) {
    if (item.completed) {
      output += `<li><s>${item.name}</s></li>`;
    } else {
      output += `<li>${item.name}</li>`;
    }
    
  }
  output += "</ul>";
  result.innerHTML = output;
}

async function ReadTasks() {
  try {
    const response = await http.get("/list");
    theList = response.task || [];
    ShowList();
  } catch (error) {
    console.error(error);
    result.innerHTML = "Failed to load list.";
  }
}

async function CreateTask() {
  try {
    const response = await http.post("/list", { name: input.value });
    console.log("response: ", response);
  } catch (error) {
    console.error("error: ", error);
  }
}

async function DeleteTask() {
  try {
    const response = await http.delete("/list/", { name: input.value });
    console.log("response: ", response);
  } catch (error) {
    console.log("error: ", error);
  }
}

async function UpdateTask() {
  try {
    const response = await http.put("/list", { name: input.value })
    console.log("response: ", response);
  } catch (error) {
    console.log("error: ", error);
  }
}

/* Listener Functions */
async function httpPost(e) {
  if (input.value) {
    await CreateTask();
    await ReadTasks();
    ShowList();
  }
}

async function httpDelete(e) {
  if (input.value) {
    await DeleteTask();
    await ReadTasks();
    ShowList();
  }
}

async function httpPut(e) {
  if (input.value) {
    await UpdateTask();
    await ReadTasks();
    ShowList();
  }
}

// Loading functions
function showLoading() {
  result.innerHTML = "Loading...";
}

async function main() {
  addButton.disabled = true;
  delButton.disabled = true;
  showLoading();

  await ReadTasks();

  addButton.disabled = false;
  delButton.disabled = false;
}

main();
