
import { SignedIn, SignedOut, useAuth } from "@clerk/clerk-react"

import NoAccess from "../components/no-access"

import { useEffect, useState } from "react"

import { useUser } from '@clerk/clerk-react';

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

// type recipeCount


export default function ProfilePage() {

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

    

    
    console.log("printing out user id: " ,userData?.id);
    


    // recipes
    
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
                {/* dynamic variable container. */}


                {/* button to create a recipe as this user */}


            </SignedIn>
            

            <SignedOut> 
                <NoAccess />
            </SignedOut>
        </>
    )
}