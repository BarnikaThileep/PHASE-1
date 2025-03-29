import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useSearchParams } from "react-router-dom";
import "./styles.css"; // Import CSS

const items = [
  { id: 1, name: "Laptop", category: "Electronics", price: 1000 },
  { id: 2, name: "Smartphone", category: "Electronics", price: 700 },
  { id: 3, name: "Shoes", category: "Fashion", price: 100 },
  { id: 4, name: "Jacket", category: "Fashion", price: 150 },
  { id: 5, name: "Headphones", category: "Electronics", price: 200 },
];

const SearchComponent = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get("q") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "");
  const [price, setPrice] = useState(searchParams.get("price") || "");

  useEffect(() => {
    const params = {};
    if (searchTerm) params.q = searchTerm;
    if (category) params.category = category;
    if (price) params.price = price;
    setSearchParams(params);
  }, [searchTerm, category, price, setSearchParams]);

  const filteredItems = items.filter((item) => {
    return (
      (!searchTerm || item.name.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (!category || item.category === category) &&
      (!price || item.price <= Number(price))
    );
  });

  return (
    <div className="container">
      <h1>Search Products</h1>
      <div className="search-form">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">All Categories</option>
          <option value="Electronics">Electronics</option>
          <option value="Fashion">Fashion</option>
        </select>
        <input
          type="number"
          placeholder="Max Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
      <ul className="product-list">
        {filteredItems.map((item) => (
          <li key={item.id} className="product-item">
            {item.name} - ${item.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SearchComponent />} />
      </Routes>
    </Router>
  );
}

export default App;
