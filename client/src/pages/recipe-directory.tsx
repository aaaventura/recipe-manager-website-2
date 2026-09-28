import { useEffect, useState } from "react"

import { NavLink } from "react-router-dom";

interface Recipe {
  id: string;
  user_id: string;
  title: string;
  created_at: string;
  updated_at: string;
  user: {
    first_name: string;
    last_name: string;
    username: string;
  };
}


export default function RecipeDirectory() {


    const [ isLoading, setIsLoading ] = useState(true);

    
    const [result, setResult] = useState<Recipe[]>([]);


    useEffect(() => {
        setIsLoading(true);
        fetch(`http://localhost:3000/get-all-recipes`)
            .then((res) => res.json())
            .then((data: Recipe[]) => {
                console.log("recipes:", data);
                setResult(data);
                console.log("printing recipes container: ", result);
            })
            .catch((err) => console.error(err))
            .finally(() => setIsLoading(false));
        }, []);
    

    return(
        <>
            <p>welcome to the recipe directory</p>

            

            <div> 
                {isLoading ? <h1>Loading page</h1> : null}
                {result.map((r) => (
                    <div style={{
                        background: 'purple',
                        padding: '10px',
                        margin: '15px'}}>
                        <NavLink to={`/recipepage/${r.id}`}><h1>Title: {r.title}</h1></NavLink>
                        <h3>{r.user.first_name} {r.user.last_name}</h3>
                    </div>
                ))}
            </div>
        </>
    )
}