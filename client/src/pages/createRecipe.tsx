import { SignedIn, SignedOut } from "@clerk/clerk-react"
import { useState } from "react"

export default function CreateRecipe() {


    
    
    

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
                        }}>
                            <label>directions</label>
                            <input></input>
                            <button type="submit">Submit</button>
                        </form>
                        <form style={{
                            margin: '0px 100px',
                            background: 'gray',
                        }}>
                            <label>ingredients</label>
                            <input></input>
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
                        <ul style={{
                            margin: '0px 100px',
                            background: 'gray',
                        }}>
                            <li>directions item?</li>
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