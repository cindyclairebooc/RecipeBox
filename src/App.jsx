import { useState, useEffect } from 'react'
import './App.css'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

function App() {
  const [recipes, setRecipes] = useState([]);
  const [open, setOpen] = useState(false);  //For opening the modal to view full recipe details
  const [selectedRecipe, setSelectedRecipe] = useState(null); //For displaying a specific recipe when clicked

  useEffect(() => {
    let url = "/data/recipes.json";
      fetch(url)
        .then(res => res.json())
        .then(data => {
          console.log(data)
          setRecipes(Array.isArray(data.recipes) ? data.recipes : [])
        })
    }, []);

  

  return (
    <>
      <div>
        <div className="grid grid-cols-3 gap-4">
          {recipes.map((recipe, index) => (
            <Card 
              key={index} 
              className="p-4" 
              onClick={() => {
                setSelectedRecipe(recipe)
                setOpen(true);
              }}
            >
              <CardContent>
                <img
                  src={recipe.image}
                  className='w-full h-50 object-cover'
                />
                <h3>{recipe.title}</h3>
                <p>{recipe.cookingTime} mins</p>
              </CardContent>
            </Card>
            ))}  
        </div>
      </div>

      {/* Modal to view full recipe details */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg">
          {selectedRecipe && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedRecipe.title}</DialogTitle>
                <DialogDescription>
                  This action cannot be undone. This will permanently delete your account
                  and remove your data from our servers.
                </DialogDescription>
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
    </>
  )
}

export default App
