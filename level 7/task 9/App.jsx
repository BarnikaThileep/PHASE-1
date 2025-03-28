import React, { useEffect, useRef, useState } from "react";
import "./App.css";

const useIntersectionObserver = (callback, options = {}) => {
  const targetRef = useRef(null);

  useEffect(() => {
    if (!targetRef.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        callback();
      }
    }, options);

    observer.observe(targetRef.current);

    return () => observer.disconnect();
  }, [callback, options]);

  return targetRef;
};

const InfiniteScroll = () => {
  const [items, setItems] = useState(Array.from({ length: 10 }, (_, i) => i + 1));

  const loadMoreItems = () => {
    setTimeout(() => {
      setItems((prev) => [...prev, ...Array.from({ length: 10 }, (_, i) => prev.length + i + 1)]);
    }, 1000);
  };

  const loaderRef = useIntersectionObserver(loadMoreItems, { threshold: 1 });

  return (
    <div className="container">
      {items.map((item) => (
        <div key={item} className="item">
          Item {item}
        </div>
      ))}
      <div ref={loaderRef} className="loader">Loading...</div>
    </div>
  );
};

export default InfiniteScroll;
