const fs = require('fs');
const path = require('path');

const dirPath = __dirname;

fs.readdir(dirPath, (err, files) => {
    if (err) {
        console.error('Error reading directory:', err);
        return;
    }
    
    files.forEach(file => {
        const filePath = path.join(dirPath, file);
        const isDirectory = fs.statSync(filePath).isDirectory();
        
        console.log(`${isDirectory ? '[DIR] ' : '[FILE]'} ${file}`);
    });
});
