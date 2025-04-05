const express = require('express');
const path = require('path');
const app = express();
const PORT = 4000;

// Users data
const users = [
    { id: 1, name: 'Barnika', email: 'barni@example.com' },
    { id: 2, name: 'Santhiya', email: 'sandy@example.com' },
    { id: 3, name: 'Abidha', email: 'abi@example.com' }
];

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// API route to get users
app.get('/api/users', (req, res) => {
    res.json(users);
});

// Serve the HTML page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
