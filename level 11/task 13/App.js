
const product = {
    name: "Mouse",
    price: 29.99,
    category: "Electronics",
    inStock: true
};
const { name, price, category, inStock } = product;
console.log("Product Name:", name);
console.log("Price:", price);
console.log("Category:", category);
console.log("In Stock:", inStock);
const getProductDetails = ({ name, price, category, inStock }) => {
    return `Product: ${name}\nCategory: ${category}\nPrice: $${price}\nAvailability: ${inStock ? "In Stock" : "Out of Stock"}`;
};
console.log("\nProduct Details:");
console.log(getProductDetails(product));
