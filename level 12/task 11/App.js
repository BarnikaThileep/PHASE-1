const fs = require('fs');
const path = require('path');
const fileToWatch = path.join(__dirname, 'watchedFile.txt');
if (!fs.existsSync(fileToWatch)) {
    console.error('File does not exist. Please create watchedFile.txt before running the script.');
    process.exit(1);
}
console.log(`Watching for changes on: ${fileToWatch}`);

fs.watch(fileToWatch, (eventType, filename) => {
    if (filename) {
        console.log(`File ${filename} was ${eventType}d.`);
    } else {
        console.log(`A change was detected in the watched file.`);
    }
});
