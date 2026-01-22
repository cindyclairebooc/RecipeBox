import { Input } from "@/components/ui/input";
import {Card,CardContent,} from "@/components/ui/card";
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle,} from "@/components/ui/dialog";
import { useState } from 'react';

export default function RecipeList({ recipes, favorites, setFavorites }) {
  const [open, setOpen] = useState(false);  //For opening the modal to view full recipe details
  const [selectedRecipe, setSelectedRecipe] = useState(null); //For displaying a specific recipe when clicked
  const [search, setSearch] = useState("");


  // Filter recipe/ingredient based on search
  const filteredRecipes = Array.isArray(recipes)
    ? recipes.filter(recipe =>
        recipe.title.toLowerCase().includes(search.toLowerCase()) ||
        recipe.ingredients.some(i =>
          i.toLowerCase().includes(search.toLowerCase())
        )
      )
    : [];

  // Favorites toggle function
  const toggleFavorite = (recipe) => {
    setFavorites(prev => {
      if (prev.find(r => r.id === recipe.id)) {
        return prev.filter(r => r.id !== recipe.id);
      } else {
        return [...prev, recipe]
      }
    })
  }


  return (
    <>
      <div>
        <h1 className="text-3xl font-bold">Recipes</h1>

        {/* Search bar */}
        <div className='mb-8 flex justify-center'>
          <Input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-100"
          />
        </div>

        {/* Display recipe list in cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecipes.length > 0 ? (
            filteredRecipes.map((recipe) => (
              <Card
                key={recipe.id}
                onClick={() => {
                  setSelectedRecipe(recipe);
                  setOpen(true);
                }}
                className="cursor-pointer transition hover:shadow-md"
              >
                <CardContent className="p-0">
                  
                  {/* Image */}
                  <div className="relative">
                    <img
                      src={recipe.image}
                      alt={recipe.title}
                      className="w-full h-40 object-cover rounded-t-md"
                    />

                    {/* Category badge */}
                    <div className="absolute top-2 left-2 bg-primary/80 text-white text-xs font-medium px-2 py-0.5 rounded-full">
                      {recipe.category}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4 flex items-start justify-between gap-2">
                    {/* Left content */}
                    <div className="space-y-1">
                      <h3 className="text-base font-semibold leading-tight">
                        {recipe.title}
                      </h3>

                      <p className="text-sm text-muted-foreground">
                        {recipe.cookingTime} mins
                      </p>
                    </div>

                    {/* Favorite button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(recipe);
                      }}
                      className="text-xl shrink-0"
                    >
                      {favorites.find(r => r.id === recipe.id) ? "💗" : "🤍"}
                    </button>
                  </div>


                </CardContent>
              </Card>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">No recipes found</p>
          )}
        </div>
      </div>

      {/* Modal to view full recipe details */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md">
          {selectedRecipe && (
            <>
              <DialogHeader>
                <DialogTitle className="text-lg font-semibold">
                  {selectedRecipe.title}
                </DialogTitle>
              </DialogHeader>

              <div className="no-scrollbar max-h-[60vh] overflow-y-auto space-y-4">
                
                {/* Image */}
                <img
                  src={selectedRecipe.image}
                  className="w-full h-40 object-cover rounded-md"
                  alt={selectedRecipe.title}
                />

                {/* Ingredients */}
                <div>
                  <h3 className="text-sm font-medium mb-1">Ingredients</h3>
                  <ul className="list-disc list-inside text-sm space-y-1">
                    {selectedRecipe.ingredients.map((ingredient, index) => (
                      <li key={index}>{ingredient}</li>
                    ))}
                  </ul>
                </div>

                {/* Instructions */}
                <div>
                  <h3 className="text-sm font-medium mb-1">Instructions</h3>
                  <ol className="list-decimal list-inside text-sm space-y-1">
                    {selectedRecipe.instructions.map((instruction, index) => (
                      <li key={index}>{instruction}</li>
                    ))}
                  </ol>
                </div>

                <p className="text-xs text-muted-foreground">
                  Servings: {selectedRecipe.servings}
                </p>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
