
let sumEven = 0;
console.log("Even numbers from 2 to 20:");
for (let i = 2; i <= 20; i++) {
    
    if (i % 2 === 0) {
        console.log(i);
        sumEven += i;   
    }
}
console.log("Sum of even numbers:", sumEven);
