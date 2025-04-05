const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 7000;

// Ensure the 'uploads' directory exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    }
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extName = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = allowedTypes.test(file.mimetype);
    if (extName && mimeType) {
        cb(null, true);
    } else {
        cb(new Error('Only images (JPEG, PNG, GIF) are allowed!'), false);
    }
};

const upload = multer({ storage, fileFilter });

// Serve static files (CSS, uploaded images)
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));

// Upload form
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>File Upload</title>
            <link rel="stylesheet" href="styles.css">
        </head>
        <body>
            <div class="container">
                <h1>Upload an Image</h1>
                <form action="/upload" method="POST" enctype="multipart/form-data">
                    <input type="file" name="image" required>
                    <button type="submit">Upload</button>
                </form>
            </div>
        </body>
        </html>
    `);
});

// Handle file upload
app.post('/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.send(`<h2>Error: No file uploaded or invalid file type!</h2>`);
    }
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Upload Success</title>
            <link rel="stylesheet" href="styles.css">
        </head>
        <body>
            <div class="container">
                <h1>Upload Successful!</h1>
                <p>File Name: ${req.file.filename}</p>
                <img src="/uploads/${req.file.filename}" width="300">
                <br><br>
                <a href="/">Upload Another</a>
            </div>
        </body>
        </html>
    `);
});

// Global error handler
app.use((err, req, res, next) => {
    res.status(500).send(`<h2>Error: ${err.message}</h2>`);
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
