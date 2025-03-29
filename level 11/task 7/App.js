
let favoriteFoods = ["Pizza", "Burger", "Pasta", "Sushi", "Lazaniya"];


favoriteFoods.push("Ice Cream");


favoriteFoods.shift();
let arrayLength = favoriteFoods.length;

let sushiIndex = favoriteFoods.indexOf("Sushi");


let slicedFoods = favoriteFoods.slice(1, 4);


console.log("Original Array after modifications:", favoriteFoods);
console.log("Length of the Array:", arrayLength);
console.log("Index of 'Sushi':", sushiIndex);
console.log("Sliced Array (index 1 to 3):", slicedFoods);
