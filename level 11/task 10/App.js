
let firstName = "Barnika";  
let lastName = "Thileepkumar";  
let age = 20;  
let introduction = `My name is ${firstName} ${lastName} and I am ${age} years old.`;
let multiLineString = `
Hello, my name is ${firstName}.
In five years, I will be ${age + 5} years old.
`;
let ageMessage = `${age >= 18 ? "You are an adult." : "You are a minor."}`;
console.log(introduction);
console.log(multiLineString);
console.log(ageMessage);
