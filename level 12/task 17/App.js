const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const algorithm = 'aes-256-cbc';
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);
const inputFile = path.join(__dirname, 'sensitive.txt');
const encryptedFile = path.join(__dirname, 'sensitive.enc');
const decryptedFile = path.join(__dirname, 'sensitive.dec.txt');
function encryptFile() {
    if (!fs.existsSync(inputFile)) {
        console.error('Input file does not exist. Please create sensitive.txt with some data.');
        process.exit(1);
    }
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    const input = fs.createReadStream(inputFile);
    const output = fs.createWriteStream(encryptedFile);
    input.pipe(cipher).pipe(output);
    output.on('finish', () => {
        console.log('File encrypted successfully.');
        decryptFile();
    });
}
function decryptFile() {
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    const input = fs.createReadStream(encryptedFile);
    const output = fs.createWriteStream(decryptedFile);
    
    input.pipe(decipher).pipe(output);
    
    output.on('finish', () => {
        console.log('File decrypted successfully.');
        verifyDecryption();
    });
}

function verifyDecryption() {
    const original = fs.readFileSync(inputFile, 'utf8');
    const decrypted = fs.readFileSync(decryptedFile, 'utf8');
    
    if (original === decrypted) {
        console.log('Decryption verified: Original and decrypted files match.');
    } else {
        console.error('Decryption failed: Files do not match.');
    }
}

encryptFile();
