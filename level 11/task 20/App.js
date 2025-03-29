function operateOnArray(arr, operation) {
    return arr.map(operation);
}
function double(num) {
    return num * 2;
}
function square(num) {
    return num * num;
}
function toString(num) {
    return num.toString();
}
const numbers = [1, 2, 3, 4, 5];
const doubledNumbers = operateOnArray(numbers, double);
const squaredNumbers = operateOnArray(numbers, square);
const stringNumbers = operateOnArray(numbers, toString);
console.log("Original array:", numbers);
console.log("Doubled numbers:", doubledNumbers);
console.log("Squared numbers:", squaredNumbers);
console.log("String numbers:", stringNumbers);
