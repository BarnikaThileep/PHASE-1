const fs = require('fs');
const path = require('path');
const csvFilePath = path.join(__dirname, 'data.csv');
const outputFilePath = path.join(__dirname, 'results.txt');
if (!fs.existsSync(csvFilePath)) {
    console.error('CSV file does not exist. Please create data.csv with some data.');
    process.exit(1);
}
fs.readFile(csvFilePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading CSV file:', err);
        return;
    }
    try {
        const lines = data.trim().split('\n');
        const headers = lines[0].split(',');
        const rows = lines.slice(1).map(line => line.split(',').map(Number));
        const columnSums = new Array(headers.length).fill(0);
        const rowCount = rows.length;
        rows.forEach(row => {
            row.forEach((value, index) => {
                columnSums[index] += value;
            });
        });
        const averages = columnSums.map(sum => (sum / rowCount).toFixed(2));
        const results = `Column Averages:\n${headers.map((h, i) => `${h}: ${averages[i]}`).join('\n')}`;
        fs.writeFile(outputFilePath, results, (err) => {
            if (err) {
                console.error('Error writing results file:', err);
                return;
            }
            console.log('Results written successfully to', outputFilePath);
        });
    } catch (parseError) {
        console.error('Error processing CSV data:', parseError);
    }
});
