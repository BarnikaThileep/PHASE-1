import React, { useState } from "react";
import "./App.css";

const products = [
  { id: 1, name: "Smartphone", imageUrl: "https://image01.realme.net/general/20230608/1686196034266e84391de43944a599cdec535212ef4f6.png?width=1440&height=1440&size=710277", price: 699 },
  { id: 2, name: "Laptop", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEcwgrrxDLu8dX0IkeQYGRtshsgXGQIgdEaA&s", price: 1199 },
  { id: 3, name: "Headphones", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsGOScceKjhuUFCzgoKycQP0ROsGEY59VBew&s", price: 199 },
  { id: 4, name: "Smartwatch", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdCjMR54ssJHuBAEM3eq8Dq_MiBnb5iAGJtw&s", price: 249 }
];

const Product = ({ product, addToCart }) => {
  return (
    <div className="product-card">
      <img src={product.imageUrl} alt={product.name} className="product-image" />
      <h3 className="product-name">{product.name}</h3>
      <p className="product-price">${product.price}</p>
      <button className="add-to-cart" onClick={() => addToCart(product)}>Add to Cart</button>
    </div>
  );
};

const ProductListing = () => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  return (
    <div className="product-listing-container">
      <header className="header">
        <h1>E-commerce Store</h1>
        <div className="cart">🛒 Cart: {cart.length}</div>
      </header>
      <div className="product-list">
        {products.map((product) => (
          <Product key={product.id} product={product} addToCart={addToCart} />
        ))}
      </div>
    </div>
  );
};

export default ProductListing;
