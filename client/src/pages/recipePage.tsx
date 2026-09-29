
import { useParams } from "react-router-dom";

import { useEffect } from "react";

import { useState } from "react";




type Recipe = {
  id: string;
  title: string;
  user: {
    first_name: string;
    last_name: string;
    username: string;
  };
  directions: {
    id: string;
    recipe_step: number;
    description: string;
  }[];
  ingredients: {
    id: string;
    ingredient: string;
    description: string;
  }[];
  categories: {
    id: string;
    category: { id: string; name: string };
  }[];
};




export default function RecipePage() {
    const [recipe, setRecipe] = useState<Recipe | null>(null);

    


      const { id } = useParams();   // id = "0845dac3-df70-4ab5-a4ed-72067ef217e3"



      useEffect(() => {
        if (!id) return; 

        console.log("calling recipes called!")
        // fetch data.
        fetch(`http://localhost:3000/getrecipepage/${id}`)
        .then((res) => res.json())
        .then((data: Recipe) => {
            console.log("full recipe: ", data);
            setRecipe(data);
        })
        }, [id])





        useEffect(() => {
            console.log("recipe state updated:", );
        }, [recipe]);


    return (
        <>
            <h1> Recipe Title </h1>
            <h3>{recipe?.title}</h3>
            <h2>created by: {recipe?.user.first_name} {recipe?.user.last_name} </h2>

            <div>
                <h4>categories</h4>
                <ul>
                    {recipe?.categories.map(cat => (
                        <li key={cat.id}>{cat.category.category_name}</li>
                    ))}        
                </ul>
                    
            </div>
            


           <div style={{
            display: 'flex',
            justifyContent: 'center',
           }}>
                <ul style={{
                    margin: '20px'
                }}>
                    <label>instructions</label>
                    {recipe?.directions.map(dir => (
                        <li key={dir.id}>{dir.description}</li>
                    ))}   
                </ul>

                <ul>
                    <label>ingredients</label>
                    {recipe?.ingredients.map(ing => (
                        <li key={ing.id}>{ing.ingredient}</li>
                    ))}   
                </ul>
           </div>
           

            
        </>
    )
        
}