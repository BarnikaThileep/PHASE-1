import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ProductList from ";
import ProductDetail from ";
import "./App.css"; 

const App = () => {
  return (
    <Router>
      <div className="container">
        <nav>
          <ul>
            <li><Link to="/products">Products</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductDetail />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
import { Link } from "react-router-dom";

const products = [
  { id: 1, name: "Laptop", description: "High-performance laptop with SSD." },
  { id: 2, name: "Smartphone", description: "Latest model smartphone with 5G." },
  { id: 3, name: "Headphones", description: "Noise-canceling wireless headphones." }
];

const ProductList = () => {
  return (
    <div>
      <h2>Product List</h2>
      <ul className="product-list">
        {products.map(product => (
          <li key={product.id}>
            <Link to={`/products/${product.id}`}>{product.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;


productdetails.jsx
import { useParams } from "react-router-dom";

const products = [
  { id: 1, name: "Laptop", description: "High-performance laptop with SSD." },
  { id: 2, name: "Smartphone", description: "Latest model smartphone with 5G." },
  { id: 3, name: "Headphones", description: "Noise-canceling wireless headphones." }
];

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find(p => p.id === parseInt(id));

  if (!product) {
    return <h2>Product not found!</h2>;
  }

  return (
    <div>
      <h2>{product.name}</h2>
      <p>{product.description}</p>
    </div>
  );
};

export default ProductDetail;
