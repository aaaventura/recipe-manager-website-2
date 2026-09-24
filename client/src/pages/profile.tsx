
import { SignedIn, SignedOut, useAuth } from "@clerk/clerk-react"

import NoAccess from "../components/no-access"

import { useEffect, useState } from "react"

import { useUser } from '@clerk/clerk-react';
import { NavLink } from "react-router-dom";

const server = import.meta.env.SERVER_ORIGIN;



type UserRow = {
  id: string;
  clerk_id: string;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  created_at: string;
  updated_at: string;
};

interface Recipe {
  id: string;
  user_id: string;
  title: string;
  created_at: string;
  updated_at: string;
}

export default function ProfilePage() {


    const [recipes, setRecipes] = useState<Recipe[]>([]);

    const [ clerkId, setClerkId ] = useState<string | {
       id: string;
       clerk_id: string;
       first_name: string;
       last_name: string;
       username: string;
       email: string;
       created_at: Date;
       updated_at: Date;
    }>(null);
    const [userData, setUserData] = useState<UserRow | null>(null);

    const { user, isLoaded } = useUser();
    


    // grabbing user varaible from user api. 
    useEffect(() => {
        if (!isLoaded || !user) return; // wait for clerk. if not loaded skip.
        

        // call api
        fetch(`http://localhost:3000/user-get?clerk_id=${user.id}`, {
            credentials: 'include',
        })
        // handling initial hit.
        .then((res) => {// error handling

            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            return res.json();
        })
        .then((res) => {//state update
            //setting the variable with the response
            setUserData(res);        
        })

        console.log("only happen one");
        
    }, [isLoaded, user?.id])



    console.log("printing recipes container: ", recipes);


    
    console.log("printing out user id: " ,userData?.id);
    


    // recipes
    useEffect(() => {
        if (!isLoaded || !user) return;

        fetch(`http://localhost:3000/get-user-recipes?clerk_id=${user.id}`)
            .then((res) => res.json())
            .then((data: Recipe[]) => {
                console.log("recipes:", data);
                setRecipes(data);
                console.log("printing recipes container: ", recipes);
            })
            .catch((err) => console.error(err));
        }, [isLoaded, user?.id]);

    return(
        <>
            <SignedIn>
                <h1>WELCOME!</h1>
                <p>welcome to the User Profile Page</p>
                <p>you are user *imput user email here*</p>


                <h1>Here is your Username</h1>
                { userData?.username ?? "nothing" }

 
                <h1>Here is your Email</h1>
                { userData?.email ?? "nothing" }


                <h1>Recipe count: </h1>
                <h3>{recipes.length}</h3>
        
                <h1>Recipes!</h1>
                <div>
                    {recipes.map((recipe) => (
                        <div key={recipe.id}>

                            <NavLink to={"/recipepage"}><h2>{recipe.title}</h2></NavLink>

                        </div>
                    ))}
                </div>
                


                {/* button to create a recipe as this user */}
                <NavLink to={"/createrecipe"}> Create Recipe *test only*</NavLink>


            </SignedIn>
            

            <SignedOut> 
                <NoAccess />
            </SignedOut>
        </>
    )
}