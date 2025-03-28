import React, { useState } from "react";
import "./App.css";

const recipesData = [
  {
    id: 1,
    title: "Pasta",
    imageUrl: "https://www.spicebangla.com/wp-content/uploads/2024/08/Spicy-Pasta-recipe-optimised-scaled.webp",
    ingredients: ["Pasta", "Eggs", "ChillyFlakes", "Cheese", "Black Pepper"],
    instructions: "Cook pasta, mix with eggs and cheese, add chillyflakes.",
  },
  {
    id: 2,
    title: "Chicken Curry",
    imageUrl: "https://www.foodandwine.com/thmb/8YAIANQTZnGpVWj2XgY0dYH1V4I=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/spicy-chicken-curry-FT-RECIPE0321-58f84fdf7b484e7f86894203eb7834e7.jpg",
    ingredients: ["Chicken", "Coconut Milk", "Curry Powder", "Garlic", "Onion"],
    instructions: "Sauté onion and garlic, add chicken and curry powder, pour in coconut milk and simmer.",
  },
  {
    id: 3,
    title: "Prawn fry",
    imageUrl: "https://www.gohealthyeverafter.com/wp-content/uploads/2023/02/Prawn-Masala-Fry-23-500x500.jpg",
    ingredients: ["Prawn", "Chilly", "Lemon", "Salt", "Pepper"],
    instructions: "Fry the prawn, mash with lemon, spread Chilly, season with salt and pepper.",
  },
];

const RecipeFinder = () => {
  const [recipes, setRecipes] = useState(
    recipesData.map((recipe) => ({ ...recipe, showDetails: false }))
  );
  const [searchTerm, setSearchTerm] = useState("");

  const toggleDetails = (id) => {
    setRecipes((prevRecipes) =>
      prevRecipes.map((recipe) =>
        recipe.id === id ? { ...recipe, showDetails: !recipe.showDetails } : recipe
      )
    );
  };

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    recipe.ingredients.some((ingredient) =>
      ingredient.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="recipe-finder-container">
      <h1>Recipe Finder</h1>
      <input
        type="text"
        placeholder="Search for a recipe..."
        className="search-input"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="recipe-list">
        {filteredRecipes.map((recipe) => (
          <div
            key={recipe.id}
            className="recipe-card"
            onClick={() => toggleDetails(recipe.id)}
          >
            <div className="recipe-row">
              <img src={recipe.imageUrl} alt={recipe.title} className="recipe-image" />
              <div className="recipe-info">
                <h3 className="recipe-title">{recipe.title}</h3>
                {recipe.showDetails && (
                  <div className="recipe-details">
                    <h4>Ingredients:</h4>
                    <ul className="ingredient-list">
                      {recipe.ingredients.map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                      ))}
                    </ul>
                    <h4>Instructions:</h4>
                    <p className="recipe-instructions">{recipe.instructions}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeFinder;
