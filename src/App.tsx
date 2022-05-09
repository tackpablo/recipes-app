import React, { useState, useEffect } from "react";
import "./App.css";
import { IRecipe } from "./IRecipe";
import RecipeComponent from "./RecipeComponent";

function App() {
  const [recipesFound, setRecipesFound] = useState<IRecipe[]>([]);
  const [recipeSearch, setRecipeSearch] = useState("");

  const searchForRecipes = async (query: String): Promise<IRecipe[]> => {
    const result = await fetch(`http://localhost:3001/?search=${query}`);
    return (await result.json()).results;
  };

  const search = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    console.log(form);
    const input = form.querySelector("#searchText") as HTMLInputElement;
    setRecipeSearch(input.value);
  };

  useEffect(() => {
    (async () => {
      const query = encodeURIComponent(recipeSearch);
      if (query) {
        const response = await searchForRecipes(query);
        setRecipesFound(response);
      }
    })();
  }, [recipeSearch]);

  return (
    <div className="App">
      <h1>Recipe Search App</h1>
      <form className="searchForm" onSubmit={(event) => search(event)}>
        <input id="searchText" type="text" />
        <button>Search</button>
      </form>
      {recipeSearch && <p>Results for {recipeSearch}...</p>}

      <div className="recipeContainer">
        {recipesFound.length &&
          recipesFound.map((recipe) => (
            <RecipeComponent
              key={recipe.href}
              recipe={recipe}
            ></RecipeComponent>
          ))}
      </div>
    </div>
  );
}

export default App;
