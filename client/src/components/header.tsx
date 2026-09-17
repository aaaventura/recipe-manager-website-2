import { SignedIn, SignedOut, UserButton, SignInButton, SignUpButton } from "@clerk/clerk-react";



export function Header(){
    return(
        <>
        <SignedOut>
            <SignInButton />

            <SignUpButton />
        </SignedOut>

        <SignedIn>
            <UserButton />
            <h1>SIGNED IN USER</h1>
        </SignedIn>
        </>
    )
}