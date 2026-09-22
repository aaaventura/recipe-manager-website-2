import { SignedIn, SignedOut } from "@clerk/clerk-react"
import { use, useState } from "react"

export default function CreateRecipe() {

    
    const [directionInput, setDirectionInput] = useState('');
    const [directions, setDirections] = useState([]);

    const [ingredientInput, setIngredientInput] = useState('');
    const [ingredients, setIngredients] = useState([]);

    const [categoryList, setCategoryList] = useState ([]); // for database
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
    // need to fill the container. does this even need to be a usestate? it's not changing.
    // maybe we can just defined it outside. as its own const.
    // grab categories from database.
    // if already applied, return.

    // apply it to a use state array object. 

    // where i last ended off.
    
    

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







                        <form> 
                            <label>Categories</label>

                            <select>
                                <option>one</option>
                                <option>one</option>
                                <option>one</option>
                                <option>one</option>

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




                        <ul style={{
                            margin: '0px 100px',
                            background: 'gray',
                        }}>
                            <li>categories lists?</li>
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