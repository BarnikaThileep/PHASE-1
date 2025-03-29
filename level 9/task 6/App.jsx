import React, { useState, useMemo, useCallback } from "react";

const findPrimes = (limit) => {
  console.log("Calculating prime numbers...");
  const primes = [];
  for (let num = 2; num <= limit; num++) {
    let isPrime = true;
    for (let i = 2; i * i <= num; i++) {
      if (num % i === 0) {
        isPrime = false;
        break;
      }
    }
    if (isPrime) primes.push(num);
  }
  return primes;
};


const ChildComponent = React.memo(({ onClick }) => {
  console.log("Rendering ChildComponent");
  return <button onClick={onClick}>Increment Counter</button>;
});

const App = () => {
  const [count, setCount] = useState(0);
  const [limit, setLimit] = useState(10000);


  const primeNumbers = useMemo(() => findPrimes(limit), [limit]);

  
  const incrementCounter = useCallback(() => {
    setCount((prev) => prev + 1);
  }, []);

  return (
    <div>
      <h2>Optimized Prime Number Finder</h2>
      <p>Counter: {count}</p>
      <ChildComponent onClick={incrementCounter} />
      <p>Finding primes up to: {limit}</p>
      <button onClick={() => setLimit((prev) => prev + 1000)}>Increase Limit</button>
      <p>Number of primes found: {primeNumbers.length}</p>
    </div>
  );
};

export default App;
