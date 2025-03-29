function divideNumbers(a, b) {
    if (b === 0) {
        throw new Error("Cannot divide by zero"); 
    }
    return a / b;
}
function testDivision(a, b) {
    try {
        let result = divideNumbers(a, b);
        console.log(`Result of ${a} / ${b}: ${result}`);
    } catch (error) {
        console.log("Error:", error.message);
    } finally {
        console.log("Division operation attempted.\n"); 
    }
}
testDivision(10, 2); 
testDivision(15, 3);  
testDivision(8, 0);   
testDivision(20, 5);  
