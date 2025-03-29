const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const algorithm = 'aes-256-cbc';

function getKey(password) {
    return crypto.createHash('sha256').update(password).digest('base64').substr(0, 32);
}

function encryptFile(inputPath, outputPath, password) {
    const key = getKey(password);
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    const input = fs.createReadStream(inputPath);
    const output = fs.createWriteStream(outputPath);
    
    output.write(iv);
    input.pipe(cipher).pipe(output);
    
    output.on('finish', () => console.log(`File encrypted successfully: ${outputPath}`));
}

function decryptFile(inputPath, outputPath, password) {
    const key = getKey(password);
    const input = fs.createReadStream(inputPath);
    const output = fs.createWriteStream(outputPath);
    
    let iv = Buffer.alloc(16);
    input.read(16);
    input.once('readable', () => {
        iv = input.read(16);
        const decipher = crypto.createDecipheriv(algorithm, key, iv);
        input.pipe(decipher).pipe(output);
    });
    
    output.on('finish', () => console.log(`File decrypted successfully: ${outputPath}`));
}

function promptUser(question) {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    return new Promise(resolve => rl.question(question, answer => { rl.close(); resolve(answer); }));
}

(async () => {
    const action = await promptUser("Enter 'encrypt' or 'decrypt': ");
    const filePath = await promptUser("Enter file path: ");
    const password = await promptUser("Enter password: ");
    const outputPath = await promptUser("Enter output file path: ");
    
    if (!fs.existsSync(filePath)) {
        console.error("File does not exist.");
        return;
    }
    
    if (action === 'encrypt') {
        encryptFile(filePath, outputPath, password);
    } else if (action === 'decrypt') {
        decryptFile(filePath, outputPath, password);
    } else {
        console.error("Invalid action.");
    }
})();
