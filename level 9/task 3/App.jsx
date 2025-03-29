import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, useParams } from "react-router-dom";
import "./App.css";

const products = [
  { id: 1, name: "iPhone 15", description: "Latest Apple smartphone with A16 chip." },
  { id: 2, name: "Samsung Galaxy S23", description: "Flagship Android phone with a powerful camera." },
  { id: 3, name: "MacBook Pro", description: "Powerful laptop for professionals and creators." },
];

const Home = () => (
  <div>
    <h1>Welcome to Our Store</h1>
    <p>Find the best products at the best prices.</p>
    <img src="https://t3.ftcdn.net/jpg/02/41/43/18/360_F_241431868_8DFQpCcmpEPVG0UvopdztOAd4a6Rqsoo.jpg" alt="Shopping" />
  </div>
);

const ProductList = () => (
  <div>
    <h1>Our Products</h1>
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          <Link to={`/products/${product.id}`}>{product.name}</Link>
        </li>
      ))}
    </ul>
  </div>
);

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));

  if (!product) return <h2>Product Not Found</h2>;

  return (
    <div>
      <h2>{product.name}</h2>
      <p>{product.description}</p>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/:id" element={<ProductDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
