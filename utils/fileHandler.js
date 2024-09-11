const fs = require("fs");

async function readDataFromFile(readFromFile) {
    try {
      const data = await fs.readFileSync(readFromFile, 'utf8');
      const marketData = JSON.parse(data); 
      return marketData; 
    } catch (err) {
      console.error('Error reading or parsing market data:', err);
      return null; 
    }
  }
  

function writeDataToFile(writeToFile, data) {
  fs.writeFile(writeToFile, JSON.stringify(data, null, 2), (err) => {
    if (err) {
      console.error("Error writing market data:", err);
      return;
    }
    console.log("Market data written to marketData.json");
  });
}

module.exports = { readDataFromFile, writeDataToFile };
