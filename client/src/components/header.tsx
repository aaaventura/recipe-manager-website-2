import { SignedIn, SignedOut, UserButton, SignInButton, SignUpButton } from "@clerk/clerk-react";
import { NavLink } from "react-router-dom";



export function Header(){
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
            <SignedIn >

            </SignedIn>

            <SignedIn>
                <UserButton />

                {/* we'll have the navigation buttons here */}
                <nav>
                    <NavLink to={"/"}> HOME </NavLink>
                    <NavLink to={"/recipes"}>RECIPES</NavLink>
                </nav>
            </SignedIn>

        </header>
       
    )
}