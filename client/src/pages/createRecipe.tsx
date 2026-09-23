import { SignedIn, SignedOut } from "@clerk/clerk-react"
import { useEffect, useState } from "react"

import { useUser, useAuth} from '@clerk/clerk-react';



type Category = {
  id: string;
  category_name: string;
}; 



type Recipe = {
    user_clerk_id: string;
    title: string;
    directions: string[];
    ingredients: string[];
    categories: string[];
};

export default function CreateRecipe() {

    const { user } = useUser();
    

    
    const [directionInput, setDirectionInput] = useState('');
    const [directions, setDirections] = useState([]);

    const [ingredientInput, setIngredientInput] = useState('');
    const [ingredients, setIngredients] = useState([]);

    const [categories, setCategories] = useState<Category[] | null>(null);

    const [category, setCategory] = useState(''); // for chosen
    const [selectedCategoryList, setSelectedCategoryList] = useState ([]); // for containing selected.


    // adding direction to the form.
    const handleDirectionsSubmit = (e) => {
        e.preventDefault();
        if(!directionInput.trim()) return;
        console.log("direction submit activated: ", directionInput);

        setDirections((prev) => [...prev, directionInput.trim()]);

        
        setDirectionInput('');

        console.log("The updated list: ", directions);
    }



    // delete directions
    const handleDeleteDirection = (e) => {
        console.log("called for deletion: ", e);

        // in the directions array. filder, reference order, delete order. 
        setDirections(prev => prev.filter((_, i) => i != e));
    }






    //add ingredients

    const handleIngredientSubmit = (e) => {
         e.preventDefault();
         if(!ingredientInput.trim()) return;
        console.log("inputting ingredient! here is your ingredient: ", ingredientInput);
        
        setIngredients((prev) => [...prev, ingredientInput.trim()]);

        setIngredientInput('');
        console.log("The updated list: ", ingredients);

    }

    // remove ingredients
    const handleDeleteIngredient = (e) => {
        console.log("called for deletion: ", e);

        // in the directions array. filder, reference order, delete order. 
        setIngredients(prev => prev.filter((_, i) => i != e));
    }
    




    // get from database 
    useEffect(() => {
        
        // call api
        fetch("http://localhost:3000/category-get", {
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
   


    // onsubmit.
    const handleCategorySubmit = (e) => {
        e.preventDefault();
        if(!category.trim()) return;
        if (selectedCategoryList.includes(category.trim())) return;

        console.log("triggered handleCategorySubmit");

        console.log("ashdasdhasdhsadhasdhashassahda: ", category);

        setSelectedCategoryList((prev) => [...prev, category.trim()]);


        setCategory('');

    }

    // delete category.
    const handleDeleteCategory = (e) => {
        console.log("called for deletion: ", e);

        setSelectedCategoryList(prev => prev.filter((_, i) => i != e));
    }
    
    
    const [recipeTitle, setRecipeTitle] = useState('');



    const { getToken } = useAuth();
    // handle full recipe submit.
    const handleRecipeSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {

        // if anything is empty, then we return.
        // if (!recipeTitle || !directions || !ingredients || !selectedCategoryList) return;

        if (!recipeTitle.trim()) return;
        if (directions.length === 0) return;
        if (ingredients.length === 0) return;
        if (selectedCategoryList.length === 0) return;

        const token = await getToken();

        console.log("recipe submit triggered!");
        console.log("this is the title: ", recipeTitle);
        console.log("this is the directiosn: ", directions);
        console.log("this is the ingredients: ", ingredients);
        console.log("here are the categories: ", selectedCategoryList);
        
        //process payload.

        const recipe: Recipe = {
            user_clerk_id: user.id,
            title: recipeTitle.trim(),
            directions,
            ingredients,
            categories: selectedCategoryList,
        };

        console.log("recipe payload log: ", recipe);


        console.log(">>> about to call fetch");

        fetch("http://localhost:3000/create-recipe", {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`  
                    },
            body: JSON.stringify(recipe),
        })
        .then((res) => {
            console.log(res);
            if (!res.ok) throw new Error('HTTP ${res.status}');
            return res.json();
        })
        .then((data) => {
            console.log("saved: ", data);
        })
        .catch((err) => {
            console.error('save failed: ', err);
        })


        // if successful, process to the next page.


        // if unsuccessful, do not push
    }

    // take all values. 

    // process into a json package 

    // perform push. 

    // all thep processing into supabas will be done in express. 



    return(
        <>
            <SignedIn >
                <h1>welcome to creating your recipe.</h1>
                <div>
                    <label>Recipe title:</label>
                    <input placeholder="Recipe Title." onChange={(e) => setRecipeTitle(e.target.value)}></input>
                </div>

                <div id="recipe-inbox">

                    <div style={{ 
                        display: 'flex', 
                        justifyContent: 'center',
                    }}>


                        <form style={{
                            margin: '0px 100px',
                            background: 'gray',
                        }}
                        onSubmit={handleDirectionsSubmit} 
                        >
                            <label>directions</label>
                            <input placeholder="Enter your Directions"
                                value={directionInput}
                                onChange={(e) => setDirectionInput(e.target.value)}
                            ></input>
                            <button type="submit">Submit</button>
                        </form>




                        <form style={{
                            margin: '0px 100px',
                            background: 'gray',
                        }}
                        onSubmit={handleIngredientSubmit}
                        >
                            <label>ingredients</label>
                            <input
                                placeholder="Enter your Recipe" 
                                value={ingredientInput}
                                onChange={(e) => setIngredientInput(e.target.value)}
                            ></input>
                            <button type="submit">Submit</button>
                        </form>







                        <form style={{
                            margin: '0px 100px',
                            background: 'gray',
                        }}
                        onSubmit={handleCategorySubmit}
                        
                        > 
                            <label>Categories</label>

                            <select
                                onChange={(e) => setCategory(e.target.value)}
                                value={category}
                            >
                                <option value="" disabled>-- Choose --</option>
                                {!categories && <p>Loading…</p>}
                                {categories && categories.length === 0 && <p>No categories found.</p>}
                                {categories && categories.length > 0 && (
                                <ul>
                                    {categories.map((i) => (
                                    <option key={i.id} value={i.category_name}>
                                        {i.category_name}
                                    </option>
                                    ))}
                                </ul>
                                )}
                            
                            </select>
                            
                            {/* dropdown titled categories with react references to change and manipulate categories. */}
                            <button type="submit">Submit</button>
                        </form>
                    </div>

                    <div style={{ 
                        display: 'flex', 
                        justifyContent: 'center',
                    }}>



                        {/* directions listing container */}
                        <ul style={{
                            margin: '0px 100px',
                            background: 'gray',
                        }}>
                            <label>directions item?</label>
                            {directions.map((item, i) => (
                            
                                <li key={i}> 
                                    {item}

                                    <button type="button" onClick={() => handleDeleteDirection(i)} >✕</button> 
                                    {/*  */} 
                                    <p>Index: {i}</p>
                                </li>
                                    
                            ))}
                            
                        </ul>




                        
                        {/* ingredients container */}
                        <ul style={{
                            margin: '0px 100px',
                            background: 'gray',
                        }}>
                            <label>ingredient lists?</label>
                            {ingredients.map((item, i) => (
                                <li key={i}>
                                    {item}
                                    <button type="button" onClick={() => handleDeleteIngredient(i)} >✕</button> 
                                    <p>Index: {i}</p>
                                </li>
                            ))
                            }
                        </ul>



                        {/* categories containers. */}
                        <ul style={{
                            margin: '0px 100px',
                            background: 'gray',
                        }}>
                            <label>Categories</label>
                            {selectedCategoryList.map((item, i) => (
                                <li key={i}>
                                    {item}
                                    <button type="button" onClick={() => handleDeleteCategory(i)} >✕</button> 

                                </li>
                            ))}
                        </ul>

                    </div>

                </div>

                <div>
                    <button type="button" onClick={() => handleRecipeSubmit()}>Complete Recipe!</button>
                </div>

            </SignedIn>

            <SignedOut >

                <h1>Unable to access.</h1>

            </SignedOut>
            
        </>
        
        
    )

}