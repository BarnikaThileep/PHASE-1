const express = require('express');

const app = express();
const PORT = 3002;

// Middleware to parse JSON requests
app.use(express.json());

// In-memory database (Array)
let products = [
    { id: 1, name: "Laptop", price: 1000, description: "High-performance laptop" },
    { id: 2, name: "Phone", price: 500, description: "Latest smartphone model" }
];

// 📌 GET /products - List all products
app.get('/products', (req, res) => {
    res.json(products);
});

// 📌 GET /products/:id - Get a specific product by ID
app.get('/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const product = products.find(p => p.id === productId);

    if (!product) return res.status(404).json({ message: "Product not found" });

    res.json(product);
});

// 📌 POST /products - Create a new product
app.post('/products', (req, res) => {
    const { name, price, description } = req.body;

    if (!name || !price || !description) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const newProduct = {
        id: products.length ? products[products.length - 1].id + 1 : 1,
        name,
        price,
        description
    };

    products.push(newProduct);
    res.status(201).json(newProduct);
});

// 📌 PUT /products/:id - Update a product
app.put('/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const { name, price, description } = req.body;

    const product = products.find(p => p.id === productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    product.name = name || product.name;
    product.price = price || product.price;
    product.description = description || product.description;

    res.json(product);
});

// 📌 DELETE /products/:id - Delete a product
app.delete('/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const productIndex = products.findIndex(p => p.id === productId);

    if (productIndex === -1) return res.status(404).json({ message: "Product not found" });

    products.splice(productIndex, 1);
    res.status(204).send(); // No content
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
