import { SignedIn, SignedOut, UserButton, SignInButton, SignUpButton } from "@clerk/clerk-react";



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
            </SignedIn>

        </header>
       
    )
}