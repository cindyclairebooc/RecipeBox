import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RecipeList from './RecipeList';
import Favorites from './Favorites';
import Layout from './Layout';
import { useState, useEffect } from "react";

export default function App() {
  const [favorites, setFavorites] = useState([]); //Array of favorite recipes
  const [recipes, setRecipes] = useState([]);

  // Loading recipes from recipes.json file on mount
useEffect(() => {
  fetch("/data/recipes.json")
    .then(res => res.json())
    .then(data => {
      setRecipes(Array.isArray(data.recipes) ? data.recipes : []);
    });
}, []);

  const router = createBrowserRouter([
      {
        path: "/",
        element: <Layout/>,
        children: [
          {
            path: "/",
            element: <RecipeList recipes={recipes} favorites={favorites} setFavorites={setFavorites}/>
          },
          {
            path: "/favorites",
            element: <Favorites favorites={favorites} setFavorites={setFavorites}/>
          }
        ]
      },
      {

      },
    ])

  return <RouterProvider router={router}/>
}
