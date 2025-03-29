
let person = {
    name: "Barnika",       
    age: 20,                
    city: "Sathy",       
    hobbies: ["Dancing", "Playing", "Traveling"], 
    
    
    greet: function() {
        return `Hello, my name is ${this.name}!`;
    }
};


console.log("Name:", person.name);
console.log("Age:", person.age);
console.log("City:", person.city);
console.log("Hobbies:", person.hobbies.join(", "));


person.job = "FullStack Developer";


person.age = 20; 


console.log("Greeting:", person.greet());


console.log("Updated Object:", person);
