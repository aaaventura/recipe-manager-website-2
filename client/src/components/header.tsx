import { useAuth, SignedIn, SignedOut, UserButton, SignInButton, SignUpButton } from "@clerk/clerk-react";
import { NavLink } from "react-router-dom";
import { useState } from "react";


const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;



export function Header(){
    const { sessionClaims } = useAuth();

/*
    testing gathering clerk token first.


*/
    const email = sessionClaims?.email;



    return(
        <header style={{
            display: "flex",
            justifyContent: 'center',
            background: 'red',
        }}> 
            
            <SignedOut>
                <SignInButton />

                <SignUpButton />
                
            </SignedOut>
            

            <SignedIn>
                <UserButton />

                {/* we'll have the navigation buttons here */}
                <nav>
                    <NavLink to={"/"}> HOME </NavLink>
                    <NavLink to={"/recipes"}>RECIPES</NavLink>
                    <NavLink to={"/userdashboard"}>USER</NavLink>
                </nav>
            </SignedIn>

            <p>Your user email: {email ?? "NOT LOGGED IN"} </p>

        </header>
       
    )
}