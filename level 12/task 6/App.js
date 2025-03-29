const fs = require("fs");
const oldFileName = "original.txt";
const newFileName = "renamed.txt";
fs.rename(oldFileName, newFileName, (err) => {
    if (err) {
        console.error("Error renaming file:", err.message);
        return;
    }
    console.log(`File renamed from "${oldFileName}" to "${newFileName}" successfully!`);
});
