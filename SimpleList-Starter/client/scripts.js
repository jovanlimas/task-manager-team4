const http = new coreHTTP();

// Block Variables
let theList = [];

// setup selectors
const result = document.querySelector(".result");
const input = document.querySelector("#listitem");
const addButton = document.querySelector(".add-btn");
const delButton = document.querySelector(".del-btn");

// Listeners
addButton.addEventListener("click", httpPost);
delButton.addEventListener("click", httpDelete);

// btn animation
let isShadow = false;
function addShadow() {
  isShadow = !isShadow;
  if (isShadow) {
    addButton.style.boxShadow = "1px 3px 5px";
  }
}

function delShadow() {
  isShadow = !isShadow;
  if (isShadow) {
    delButton.style.boxShadow = "1px 3px 5px";
  }
}

/* Helper Functions */
function ShowList() {
  let output = "<ul>";
  for (const itm of theList) {
    output += `<li>${itm}</li>`;
  }
  output += "</ul>";
  result.innerHTML = output;
}

async function GetList() {
  try {
    theList = await http.get("/list");
    console.log(theList);
    ShowList();
  } catch (error) {
    console.error(error);
    result.innerHTML = "Failed to load list.";
  }
}

async function WriteList() {
  try {
    await http.post("/list", theList);
  } catch (error) {
    console.error(error);
  }
}

/* Listener Functions */
async function httpPost(e) {
  const newItem = input.value;
  if (newItem) {
    theList.push(newItem);
    await WriteList();
    ShowList();
  }
}

function httpDelete(e) {
  const index = theList.indexOf(input.value);

  if (index == -1) {
    alert("Not found.");
  } else {
    theList.splice(index, 1);
    WriteList();
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

  await GetList();

  addButton.disabled = false;
  delButton.disabled = false;
}

main();
