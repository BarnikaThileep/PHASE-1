const fs = require('fs');
const path = require('path');
const os = require('os');
const tempDirPrefix = path.join(os.tmpdir(), 'tempDir-');
fs.mkdtemp(tempDirPrefix, (err, tempDir) => {
    if (err) {
        console.error('Error creating temporary directory:', err);
        return;
    }
    console.log('Temporary directory created:', tempDir);
    const files = ['file1.txt', 'file2.txt', 'file3.txt'];
    files.forEach((file, index) => {
        const filePath = path.join(tempDir, file);
        const content = `This is file ${index + 1}`;
        fs.writeFile(filePath, content, (err) => {
            if (err) {
                console.error(`Error writing to file ${filePath}:`, err);
                return;
            }
            console.log('File created:', filePath);
        });
    });
});
