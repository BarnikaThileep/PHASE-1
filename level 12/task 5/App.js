const fs = require("fs");
const fileName = "test.txt";
fs.stat(fileName, (err, stats) => {
    if (err) {
        console.error("Error retrieving file information:", err.message);
        return;
    }

    console.log(`File: ${fileName}`);
    console.log(`Size: ${stats.size} bytes`);
    console.log(`Created: ${stats.birthtime.toLocaleString()}`);
    console.log(`Last Modified: ${stats.mtime.toLocaleString()}`);
});
