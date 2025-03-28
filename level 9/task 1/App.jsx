import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from ".
import About from ".
import Contact from ".
import "./App.css"; 

const App = () => {
  return (
    <Router>
      <div className="container">
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;


Home.jsx
const Home = () => {
  return (
    <div>
      <h2>Home Page</h2>
      <p>Welcome to the home page!</p>
    </div>
  );
};

export default Home;


about.jsx
const About = () => {
  return (
    <div>
      <h2>About Page</h2>
      <p>Learn more about us here.</p>
    </div>
  );
};

export default About;


contact.jsx
const Contact = () => {
  return (
    <div>
      <h2>Contact Page</h2>
      <p>Get in touch with us.</p>
    </div>
  );
};

export default Contact;
