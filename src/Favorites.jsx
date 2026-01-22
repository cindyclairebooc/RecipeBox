import {Card,CardContent,} from "@/components/ui/card";
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle,} from "@/components/ui/dialog";
import { useState } from 'react';

export default function Favorites({favorites, setFavorites}) {
const [open, setOpen] = useState(false);  //For opening the modal to view full recipe details
const [selectedRecipe, setSelectedRecipe] = useState(null); //For displaying a specific recipe when clicked

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
    <div>
      <h2 className="text-3xl font-bold mb-6">Favorites</h2>
      <div>
        {favorites.length === 0 ? (
          <>
            <p className="text-lg font-medium text-muted-foreground">
              No favorites yet!
            </p>
            <p className="text-sm text-muted-foreground">
              Add some recipes you love by clicking the 💗 button.
            </p>
          </>
        ): (

        <div className="grid grid-cols-3 gap-4">
          {favorites.map((recipe) => (
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
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-40 object-cover rounded-t-md"
              />

              {/* Content */}
              <div className="p-4 flex items-start justify-between gap-2">
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
          ))}  
        </div>
        )}

      </div>

      {/* Modal to view full recipe details */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg">
          {selectedRecipe && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedRecipe.title}</DialogTitle>
              </DialogHeader>

              <div className="no-scrollbar -mx-4 max-h-[50vh] overflow-y-auto px-4">
                <img
                  src={selectedRecipe.image}
                  className='w-full h-50 object-cover'
                />

                {/* Displays ingredients list */}
                <h3>Ingredients</h3>
                <ul>
                  {selectedRecipe.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>

                {/* Displays instructions */}
                <h3>Instructions</h3>
                <ol className='list-decimal list-inside'>
                  {selectedRecipe.instructions.map((instruction, index) => (
                    <li key={index}>{instruction}</li>
                  ))}
                </ol>

                <p>{selectedRecipe.servings} mins</p>
              </div>
            </>
          )}

        </DialogContent>
      </Dialog>
    </div>
  )
}
