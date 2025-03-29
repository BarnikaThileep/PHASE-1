const fs = require("fs");
const dataToAppend = "\nMore content here.";
fs.appendFile("output.txt", dataToAppend, "utf8", (err) => {
    if (err) {
        console.error("Error appending to file:", err.message);
        return;
    }
    console.log("Content successfully appended!");
});
