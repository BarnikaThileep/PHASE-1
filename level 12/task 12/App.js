const fs = require('fs');
const path = require('path');
const targetDirectory = path.join(__dirname, 'testDir');
function readDirectoryRecursive(dir) {
    try {
        const items = fs.readdirSync(dir);
        
        items.forEach(item => {
            const fullPath = path.join(dir, item);
            const stats = fs.statSync(fullPath);
            
            if (stats.isDirectory()) {
                console.log(`Directory: ${fullPath}`);
                readDirectoryRecursive(fullPath); 
            } else {
                console.log(`File: ${fullPath}`);
            }
        });
    } catch (err) {
        console.error('Error reading directory:', err);
    }
}
if (!fs.existsSync(targetDirectory)) {
    console.error('Target directory does not exist. Please create testDir with some files and subdirectories.');
    process.exit(1);
}

console.log(`Reading directory: ${targetDirectory}`);
readDirectoryRecursive(targetDirectory);
