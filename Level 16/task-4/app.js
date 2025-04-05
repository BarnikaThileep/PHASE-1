const express = require('express');
const path = require('path');

const app = express();
const PORT = 2000;

// Serve static files (CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Route for homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route to handle dynamic user ID
app.get('/users/:id', (req, res) => {
    const userId = req.params.id;
    res.json({ message: `User ID: ${userId}` });
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
