const fs = require('fs');
const path = require('path');
const sourceDir = path.join(__dirname, 'source');
const targetDir = path.join(__dirname, 'target');
function syncDirectories(src, dest) {
    if (!fs.existsSync(src)) {
        console.error('Source directory does not exist.');
        process.exit(1);
    }
    if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
    }
    const srcFiles = new Set(fs.readdirSync(src));
    const destFiles = new Set(fs.readdirSync(dest));
    srcFiles.forEach(file => {
        const srcPath = path.join(src, file);
        const destPath = path.join(dest, file);
        const srcStat = fs.statSync(srcPath);
            if (!destFiles.has(file) || fs.statSync(destPath).mtime < srcStat.mtime) {
            fs.copyFileSync(srcPath, destPath);
            console.log(`Copied/Updated: ${file}`);
        }
    });
    destFiles.forEach(file => {
        if (!srcFiles.has(file)) {
            fs.unlinkSync(path.join(dest, file));
            console.log(`Deleted: ${file}`);
        }
    });

    console.log('Directory synchronization complete.');
}

syncDirectories(sourceDir, targetDir);
