const fs = require("fs");
const data = "Hello!!! Barnika";
fs.writeFile("output.txt", data, "utf8", (err) => {
    if (err) {
        console.error("Error writing to file:", err.message);
        return;
    }
    console.log("File successfully written!");
});
