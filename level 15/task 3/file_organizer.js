const fs = require('fs');
const path = require('path');

const categories = {
    Images: ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg'],
    Documents: ['pdf', 'doc', 'docx', 'txt', 'ppt', 'pptx', 'xls', 'xlsx'],
    Videos: ['mp4', 'mkv', 'avi', 'mov', 'wmv'],
    Audio: ['mp3', 'wav', 'aac', 'flac'],
    Archives: ['zip', 'rar', 'tar', 'gz'],
    Code: ['js', 'html', 'css', 'py', 'java', 'cpp', 'c', 'php'],
    Others: []
};

function getCategory(ext) {
    ext = ext.replace('.', '').toLowerCase();
    for (const category in categories) {
        if (categories[category].includes(ext)) {
            return category;
        }
    }
    return 'Others';
}

function organizeFiles(directory) {
    if (!fs.existsSync(directory)) {
        console.error('Directory does not exist');
        return;
    }

    fs.readdir(directory, (err, files) => {
        if (err) {
            console.error('Error reading directory:', err);
            return;
        }

        files.forEach(file => {
            const filePath = path.join(directory, file);
            fs.stat(filePath, (err, stats) => {
                if (err) {
                    console.error('Error getting file stats:', err);
                    return;
                }

                if (stats.isFile()) {
                    const ext = path.extname(file);
                    const category = getCategory(ext);
                    const categoryPath = path.join(directory, category);

                    if (!fs.existsSync(categoryPath)) {
                        fs.mkdirSync(categoryPath);
                    }

                    const newFilePath = path.join(categoryPath, file);
                    fs.rename(filePath, newFilePath, err => {
                        if (err) {
                            console.error(`Error moving file ${file}:`, err);
                        } else {
                            console.log(`${file} -> ${category}/`);
                        }
                    });
                }
            });
        });
    });
}


const targetDirectory = process.argv[2] || path.resolve('./test_directory');
organizeFiles(targetDirectory);
