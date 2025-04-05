const express = require('express');
const path = require('path');
const app = express();
const port = 3005;

// Middleware to parse JSON
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Normal route
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Home</title>
            <link rel="stylesheet" href="styles.css">
        </head>
        <body>
            <h1>Welcome to the Express Server</h1>
           
        </body>
        </html>
    `);
});

// Route that manually throws an error
app.get('/error', (req, res, next) => {
    const error = new Error('Something went wrong!');
    error.status = 500;
    next(error);
});

// Route that accesses a non-existent resource
app.get('/not-found', (req, res, next) => {
    next(); // Passes control to the 404 handler
});

// Custom 404 middleware
app.use((req, res, next) => {
    res.status(404);
    if (req.accepts('html')) {
        res.send(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>404 Not Found</title>
                <link rel="stylesheet" href="styles.css">
            </head>
            <body>
                <div class="error-container">
                    <h2>404 - Page Not Found</h2>
                    <p>Sorry, the page you are looking for does not exist.</p>
                </div>
            </body>
            </html>
        `);
    } else if (req.accepts('json')) {
        res.json({ error: 'Not Found' });
    } else {
        res.type('txt').send('Not Found');
    }
});

// Global error handler middleware
app.use((err, req, res, next) => {
    const statusCode = err.status || 500;
    const response = {
        message: 'Something went wrong!',
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    };
    
    res.status(statusCode);
    
    if (req.accepts('html')) {
        res.send(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Error ${statusCode}</title>
                <link rel="stylesheet" href="styles.css">
            </head>
            <body>
                <div class="error-container">
                    <h2>Error ${statusCode}</h2>
                    <p>Something went wrong!</p>
                </div>
            </body>
            </html>
        `);
    } else {
        res.json(response);
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
