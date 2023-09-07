const fs = require("fs");

// Read data from WithdrawMarfatia.json
const WithdrawData = require("./WithdrawMarfatia.json");

// Convert the "Amount" values from string to int
WithdrawData.forEach((item) => {

    item.Amount = parseInt(item.Amount);
    console.log(item.Amount)
 
});

// Write the updated data back to WithdrawMarfatia.json
const updatedData = JSON.stringify(WithdrawData, null, 2);
fs.writeFileSync("./newWidrowData.json", updatedData, "utf-8");

console.log(updatedData);
