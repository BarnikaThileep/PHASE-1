const fs = require('fs');
const path = require('path');
const fileToDelete = path.join(__dirname, 'testFile.txt');
if (!fs.existsSync(fileToDelete)) {
    console.error('File does not exist. Nothing to delete.');
    process.exit(1);
}
fs.unlink(fileToDelete, (err) => {
    if (err) {
        console.error('Error deleting file:', err);
        return;
    }
    console.log('File deleted successfully:', fileToDelete);
});
