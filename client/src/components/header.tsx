import { SignedIn, SignedOut, UserButton, SignInButton, SignUpButton } from "@clerk/clerk-react";
import { NavLink } from "react-router-dom";

import { useAuth, useUser } from '@clerk/clerk-react';
import { createClient } from '@supabase/supabase-js';
import { useEffect } from 'react';






const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;




export function Header(){
    

    
    const { getToken } = useAuth();
    const { user, isLoaded } = useUser();


    
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
                    <NavLink to={"/clerksupabasetest"}>TEST</NavLink>
                </nav>
            </SignedIn>

           

        </header>
       
    )
}