const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const inputFile = path.join(__dirname, 'test.txt');
const compressedFile = path.join(__dirname, 'test.txt.gz');
const decompressedFile = path.join(__dirname, 'test_decompressed.txt');
function compressFile() {
    if (!fs.existsSync(inputFile)) {
        console.error('Input file does not exist. Please create test.txt with some data.');
        process.exit(1);
    }
    const gzip = zlib.createGzip();
    const input = fs.createReadStream(inputFile);
    const output = fs.createWriteStream(compressedFile);
    input.pipe(gzip).pipe(output);
    output.on('finish', () => {
        console.log('File compressed successfully.');
        decompressFile();
    });
}
function decompressFile() {
    const gunzip = zlib.createGunzip();
    const input = fs.createReadStream(compressedFile);
    const output = fs.createWriteStream(decompressedFile);

    input.pipe(gunzip).pipe(output);

    output.on('finish', () => {
        console.log('File decompressed successfully.');
        verifyDecompression();
    });
}

function verifyDecompression() {
    const original = fs.readFileSync(inputFile, 'utf8');
    const decompressed = fs.readFileSync(decompressedFile, 'utf8');
    
    if (original === decompressed) {
        console.log('Decompression verified: Original and decompressed files match.');
    } else {
        console.error('Decompression failed: Files do not match.');
    }
}

compressFile();
