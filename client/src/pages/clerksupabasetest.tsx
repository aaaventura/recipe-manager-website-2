import { createClient } from '@supabase/supabase-js';
import { useAuth, useUser } from '@clerk/clerk-react';
import { useEffect } from 'react';





const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;





export default function TestingClerkSupabase (){

    const { getToken } = useAuth();
    const { user, isLoaded } = useUser();

    const { sessionClaims } = useAuth();

    // testing gathering clerk token first.
    const first_name = sessionClaims?.first_name;
    const last_name = sessionClaims?.last_name;
    const username = sessionClaims?.username;
    const email = sessionClaims?.email;


    // lots of information, but it works. we'll see how we see this on monday. build other features afterwards.
    

    //using those clerk data to input into supabase?
    useEffect(() => {
        if (!isLoaded || !user) return;

        //before we push, understand what hte hell happened here. 
        // why do we need this to be a function? lets just run it outside? no. 
        // at least try to understand the code or something like.
        async function ensureUserRow() {
            const supabase = createClient(
            supabaseUrl,
            supabaseAnonKey,
            { accessToken: async () => (await getToken()) ?? null }
            );

            //row checker; query with supabase library and checks if excists.
            const { data: existing, error: selectError } = await supabase.from('User') //supabase built in methods
                .select('clerk_id') 
                .eq('clerk_id', user.id) // translation: FROM User SELECT clerk_id WHERE clerk_id = user.id
                .maybeSingle();

            // check for error first
            if (selectError) {
            console.error('Check failed:', selectError);
            return;
            }

            // existing = supabase container of stuff
            if (existing) {
            console.log('User already in database');
            return;
            }

            // if it doesn't exist, use supabase to create it. 
            const { data, error } = await supabase.from('User').insert({
            clerk_id: user.id,
            email: user.primaryEmailAddress?.emailAddress ?? null,
            first_name: user.firstName ?? null,
            last_name: user.lastName ?? null,
            username: user.username ?? null,
            updated_at: new Date().toISOString(),
            created_at: new Date().toISOString(),
            });

            if (error) console.error('Insert failed:', error);
            else console.log('User created:', data);
        }

        ensureUserRow();
    }, [isLoaded, user, getToken]);


    
    return(
        <>
            <p>Your first name: {first_name ?? "NOT LOGGED IN"}</p>
            <p>Your Last Name: {last_name ?? "NOT LOGGED IN"} </p>
            <p>Your Username: {username ?? "NOT LOGGED IN"}</p>
            <p>Your user email: {email ?? "NOT LOGGED IN"} </p>

        </>
    )
}