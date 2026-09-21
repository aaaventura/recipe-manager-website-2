




import { useAuth } from '@clerk/clerk-react';




export default function TestingClerkSupabase (){



    const { sessionClaims } = useAuth();

    // testing gathering clerk token first.
    const first_name = sessionClaims?.first_name;
    const last_name = sessionClaims?.last_name;
    const username = sessionClaims?.username;
    const email = sessionClaims?.email;



    
    return(
        <>
            <p>Your first name: {first_name ?? "NOT LOGGED IN"}</p>
            <p>Your Last Name: {last_name ?? "NOT LOGGED IN"} </p>
            <p>Your Username: {username ?? "NOT LOGGED IN"}</p>
            <p>Your user email: {email ?? "NOT LOGGED IN"} </p>

        </>
    )
}