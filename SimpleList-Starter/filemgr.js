const fs = require("fs/promises");
const path = require("path");

const listDataFilePath = path.join(__dirname, "listdata.json");

async function ReadData() {
  try {
    // Make sure the file exists
    await fs.access(listDataFilePath);

    // Read the file
    const data = await fs.readFile(listDataFilePath);

    // Convert the buffer to a JSON object and return it
    return JSON.parse(data);
    
  } catch (error) {
    console.error(error);
  }
}

async function WriteData(dataOut) {
  try {
    // Write the file

  } catch (error) {

  }
}

exports.ReadData = ReadData;
exports.WriteData = WriteData;
