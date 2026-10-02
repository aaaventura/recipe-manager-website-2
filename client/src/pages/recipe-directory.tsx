import { useEffect, useState } from "react"

import { NavLink } from "react-router-dom";

import { useRef } from "react";

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




type Category = {
  id: string;
  category_name: string;
}; 

export default function RecipeDirectory() {


    const [categories, setCategories] = useState<Category[] | null>(null);
    

    // get from database 
    useEffect(() => {
        
        // call api
        fetch("http://localhost:3000/category", {
        credentials: 'include',
        })
        //handling initial connection
        .then((res) => {
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            console.log("first response: ", res);
            return res.json();
        })
        //handling the json that's returned (database json)
        .then((res) => {

            
            setCategories(res);

        });//setting it to the setCategories
        
    }, []); 
   
    

    const [ isLoading, setIsLoading ] = useState(true);

    
    const [result, setResult] = useState<Recipe[]>([]);


    useEffect(() => {
        setIsLoading(true);
        fetch(`http://localhost:3000/recipes/all/get/?category=`)
            .then((res) => res.json())
            .then((data: Recipe[]) => {
                console.log("recipes:", data);
                setResult(data);
                console.log("printing recipes container: ", result);
            })
            .catch((err) => console.error(err))
            .finally(() => setIsLoading(false));
        }, []);


    const categoryFormRef = useRef(null);

    //gather categories. 
    // apply to usestate
    // .map to it. 

    const cateogryFilterSubmit = (e) => {
        setIsLoading(true);
        e.preventDefault();

        const formData = new FormData(categoryFormRef.current);
        // getAll returns all checked values with the same name
        const selected = formData.getAll('category');
        console.log('Selected:', selected);


        //must process selected into a single string that follows the query format.
        // map? can do map that continues to add? 

       const SelectedQuery = selected
            .map((s) => `category=${encodeURIComponent(s)}`)
            .join('&');


        fetch(`http://localhost:3000/recipes/all/get/?${SelectedQuery}`)
            .then((res) => res.json())
            .then((data: Recipe[]) => {
                console.log("recipes:", data);
                setResult(data);
                console.log("printing recipes container: ", result);
            })
            .catch((err) => console.error(err))
            .finally(() => setIsLoading(false));

    }




    //clear filters.
    // const clearFilters = 
    

    return(
        <>
            <p>welcome to the recipe directory</p>

            <div> 
                <form style={{ 
                    display: "flex",
                    justifyContent: "center"
                }}
                ref={categoryFormRef}
                onSubmit={cateogryFilterSubmit}
                >
                    {categories?.map((c) => (
                        <label key={c.id}>
                            <input type="checkbox" name="category" value={c.id} />
                            {c.category_name}
                        </label>
                    ))}
                    <button type="submit">filter!</button>
                </form>
            </div>

            <div> 
                {isLoading ? <h1>Loading page</h1> : null}
                {result.map((r) => (
                    <div key={r.id} 
                        style={{
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