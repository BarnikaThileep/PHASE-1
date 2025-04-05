const express = require('express');
const path = require('path');

const app = express();
const PORT = 5000;

// Serve static files (CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Route for homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route to handle search queries
app.get('/search', (req, res) => {
    const query = req.query.q || 'Nothing';
    const limit = req.query.limit ? parseInt(req.query.limit) : 5;

    res.json({ message: `Search for: ${query}, Limit: ${limit}` });
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
