const fs = require('fs');
const path = require('path');
const sourceFile = path.join(__dirname, 'largeFile.txt');
const destinationFile = path.join(__dirname, 'largeFileCopy.txt');
if (!fs.existsSync(sourceFile)) {
    console.error('Source file does not exist. Please create largeFile.txt with at least 1MB of data.');
    process.exit(1);
}
const readStream = fs.createReadStream(sourceFile);
const writeStream = fs.createWriteStream(destinationFile);
let totalBytes = 0;
readStream.on('data', (chunk) => {
    totalBytes += chunk.length;
    console.log(`Copied ${totalBytes} bytes...`);
});
readStream.on('error', (err) => {
    console.error('Error reading file:', err);
});
writeStream.on('error', (err) => {
    console.error('Error writing file:', err);
});
readStream.on('end', () => {
    console.log('File copy completed successfully.');
});
readStream.pipe(writeStream);
