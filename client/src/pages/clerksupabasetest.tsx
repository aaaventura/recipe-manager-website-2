
import { useAuth } from "@clerk/clerk-react";



const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;





export default function TestingClerkSupabase (){

    const { sessionClaims } = useAuth();

    // testing gathering clerk token first.
    const first_name = sessionClaims?.first_name;
    const last_name = sessionClaims?.last_name;
    const username = sessionClaims?.username;
    const email = sessionClaims?.email;


    //using those clerk data to input into supabase?



    
    return(
        <>
            <p>Your first name: {first_name ?? "NOT LOGGED IN"}</p>
            <p>Your Last Name: {last_name ?? "NOT LOGGED IN"} </p>
            <p>Your Username: {username ?? "NOT LOGGED IN"}</p>
            <p>Your user email: {email ?? "NOT LOGGED IN"} </p>

        </>
    )
}