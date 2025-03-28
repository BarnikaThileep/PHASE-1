import React from "react";
import { BrowserRouter as Router, Route, Routes, Link, useParams } from "react-router-dom";
import "./App.css";

const blogPosts = [
  { id: "1", title: "Understanding React Hooks", shortDescription: "A quick guide to React Hooks.", content: "React Hooks allow functional components to use state and other React features without writing a class." },
  { id: "2", title: "JavaScript ES6 Features", shortDescription: "An overview of modern JavaScript features.", content: "ES6 introduced new syntax and features such as arrow functions, template literals, destructuring, and more." },
  { id: "3", title: "CSS Grid vs. Flexbox", shortDescription: "When to use CSS Grid and Flexbox.", content: "CSS Grid is best for 2D layouts, while Flexbox is more suited for 1D layouts." }
];

const Home = () => {
  return (
    <div className="blog-container">
      <h1>Blog</h1>
      <ul className="blog-list">
        {blogPosts.map(post => (
          <li key={post.id} className="blog-item">
            <Link to={`/post/${post.id}`} className="blog-title">{post.title}</Link>
            <p className="blog-summary">{post.shortDescription}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

const BlogPost = () => {
  const { id } = useParams();
  const post = blogPosts.find(p => p.id === id);

  if (!post) {
    return <h2>404 - Post Not Found</h2>;
  }

  return (
    <div className="blog-post-container">
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <Link to="/" className="back-link">Back to Home</Link>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post/:id" element={<BlogPost />} />
        <Route path="*" element={<h2>404 - Page Not Found</h2>} />
      </Routes>
    </Router>
  );
};

export default App;
