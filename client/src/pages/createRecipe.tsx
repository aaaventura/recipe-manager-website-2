import { SignedIn, SignedOut } from "@clerk/clerk-react"
import { useEffect, useState } from "react"



type Category = {
  id: string;
  category_name: string;
}; 


export default function CreateRecipe() {

    
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
    
    

    return(
        <>
            <SignedIn >
                <h1>welcome to creating your recipe.</h1>
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

            </SignedIn>

            <SignedOut >

                <h1>Unable to access.</h1>

            </SignedOut>
            
        </>
        
        
    )

}