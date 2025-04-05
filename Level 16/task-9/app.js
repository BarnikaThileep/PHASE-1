const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3003;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Serve the HTML form
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Contact Form</title>
            <link rel="stylesheet" href="style.css">
        </head>
        <body>
            <h2>Contact Form</h2>
            <form action="/submit" method="POST">
                <label>Name:</label>
                <input type="text" name="name" required><br>
                <label>Email:</label>
                <input type="email" name="email" required><br>
                <label>Message:</label>
                <textarea name="message" required></textarea><br>
                <button type="submit">Submit</button>
            </form>
        </body>
        </html>
    `);
});

// Handle form submission
app.post('/submit', (req, res) => {
    const { name, email, message } = req.body;
    
    // Validation
    if (!name || !email || !message) {
        return res.send("<h3>Error: All fields are required!</h3><a href='/'>Go back</a>");
    }
    
    // Success response
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Submission Successful</title>
            <link rel="stylesheet" href="style.css">
        </head>
        <body>
            <h2>Submission Successful</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong> ${message}</p>
            <a href="/">Go back</a>
        </body>
        </html>
    `);
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});