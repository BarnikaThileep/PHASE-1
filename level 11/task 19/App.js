function factorial(n) {
    if (n < 0) {
        throw new Error("Factorial is not defined for negative numbers");
    }
    if (n === 0 || n === 1) {
        return 1;
    }
    return n * factorial(n - 1);
}
const testNumbers = [10, 7, 4, 1, -3];

testNumbers.forEach(num => {
    try {
        console.log(`Factorial of ${num}:`, factorial(num));
    } catch (error) {
        console.log(`Error for input ${num}:`, error.message);
    }
});
