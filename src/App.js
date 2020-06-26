import React, { useState, useEffect } from "react";
import "./App.css";
import Recipe from "./Recipe";

function App() {
  const APP_ID = "5b0763c8";
  const APP_KEY = "65de5c5d263a0ac40576a96722bc576b";

  const [loader, setLoader] = useState(true);
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("chicken");

  useEffect(() => {
    getRecipes();
  }, [query]);

  const getRecipes = async () => {
    try {
      const res = await fetch(
        `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
      );
      const data = await res.json();
      setLoader(false);
      setRecipes(data.hits);
    } catch (rejectedValue) {
      console.log("Some Error in Fetching");
    }
  };

  const updateSearch = (e) => {
    setSearch(e.target.value);
  };

  const getSearch = (e) => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
    console.log("btn clicked");
    setLoader(true);
  };

  return (
    <div className="App">
      <form className="search-form" onSubmit={getSearch}>
        <input
          type="text"
          className="search-bar"
          value={search}
          onChange={updateSearch}
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>
      {loader ? (
        <h1 style={{ textAlign: "center" }}>Loading...</h1>
      ) : (
        <div className="recipes">
          {recipes.map((recipe) => (
            <Recipe
              key={recipe.recipe.label}
              title={recipe.recipe.label}
              calorie={recipe.recipe.calories}
              img={recipe.recipe.image}
              ingredient={recipe.recipe.ingredients}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
