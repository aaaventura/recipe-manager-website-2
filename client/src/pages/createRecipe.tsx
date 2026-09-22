import { SignedIn, SignedOut } from "@clerk/clerk-react"
import { use, useState } from "react"

export default function CreateRecipe() {

    
    const [directionInput, setDirectionInput] = useState('');
    const [directions, setDirections] = useState([]);
    

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



    // remove ingredients
    // delete directions
    

    
    

    return(
        <>
            <SignedIn >
                <h1>welcome to creating your recipe.</h1>
                <div id="recipe-inbox">

                    <div style={{ 
                        display: 'flex', 
                        justifyContent: 'center',
                    }}>




                        {/* we're going to focus on the directions first, then copy the pattern to the others. */}

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
                        >
                            <label>ingredients</label>
                            <input
                                placeholder="Enter your Recipe" 
                            ></input>
                            <button type="submit">Submit</button>
                        </form>







                        <form> 
                            <label>Categories</label>
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






                        <ul style={{
                            margin: '0px 100px',
                            background: 'gray',
                        }}>
                            <li>ingredient lists?</li>
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