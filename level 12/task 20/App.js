const fs = require('fs');
const path = require('path');
const monitoredDir = path.join(__dirname, 'monitored');
const logFile = path.join(__dirname, 'fsWatcher.log');
if (!fs.existsSync(monitoredDir)) {
    fs.mkdirSync(monitoredDir, { recursive: true });
    console.log('Created monitored directory:', monitoredDir);
}
function logChange(message) {
    const timestamp = new Date().toISOString();
    const logEntry = `[${timestamp}] ${message}\n`;
    console.log(logEntry.trim());
    fs.appendFile(logFile, logEntry, (err) => {
        if (err) console.error('Error writing to log file:', err);
    });
}
fs.watch(monitoredDir, { recursive: true }, (eventType, filename) => {
    if (filename) {
        logChange(`File ${eventType}: ${filename}`);
    }
});
console.log(`Watching for changes in: ${monitoredDir}`);
