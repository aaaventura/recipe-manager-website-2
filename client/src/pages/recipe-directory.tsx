import { useEffect, useState } from "react"

import { NavLink } from "react-router-dom";

interface Recipe {
  id: string;
  user_id: string;
  title: string;
  created_at: string;
  updated_at: string;
}


export default function RecipeDirectory() {

    
    const [result, setResult] = useState<Recipe[]>([]);


    useEffect(() => {
        fetch(`http://localhost:3000/get-all-recipes`)
            .then((res) => res.json())
            .then((data: Recipe[]) => {
                console.log("recipes:", data);
                setResult(data);
                console.log("printing recipes container: ", result);
            })
            .catch((err) => console.error(err));
        }, []);
    

    return(
        <>
            <p>welcome to the recipe directory</p>
            <div> 
                {result.map((r) => (
                    <div style={{
                        background: 'purple',
                        padding: '10px',
                        margin: '15px'}}>
                        <NavLink to={"/recipepage"}><h1>Title: {r.title}</h1></NavLink>
                    </div>
                ))}
            </div>
        </>
    )
}