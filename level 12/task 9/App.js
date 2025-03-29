const fs = require('fs');
const path = require('path');
const sourceFile = path.join(__dirname, 'source.txt');
const destinationFile = path.join(__dirname, 'destination.txt');
if (!fs.existsSync(sourceFile)) {
    console.error('Source file does not exist. Please create source.txt with some content.');
    process.exit(1);
}
if (fs.existsSync(destinationFile)) {
    console.error('Destination file already exists. Delete it first if you want to copy again.');
    process.exit(1);
}

fs.copyFile(sourceFile, destinationFile, (err) => {
    if (err) {
        console.error('Error copying file:', err);
        return;
    }
    console.log('File copied successfully to', destinationFile);
});
