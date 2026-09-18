


export default function ProfilePage() {

    /*
  feature bombing this whole thing before end of class.
  what is needed? 
  profile name. 
  profile details. 
  personal recipe database. just a dump i guess? no images yet.
  that's it. 

  divide them into two areas. page header that displays the user's name. 
  and then just a dynamic leaderboard style with links to a dynamic  list that is defined by who is logged in.
  along with that, add buttons to view, modify, and delete. and that should be it.
  preview could be 
  title:description preview (cuts off after a certain amount):edit:delete
  the whole object can be a nav references so that the user can click it. 
  *this can be reused for the recipe database page too.

  other details 
  make the naming convention consistent. dashboard and user and profile are goign to be confusing in the future
  research the clerk authentication and how to connect it to the user. 
    maybe, before we do this, we should figure out the storing of clerk id in database
    that part completely slipped my mind.
before we move on. map what clerk is actually doing in here right now. before we start trying to do weird things.

we're going to do the webhook method. 
that's also one of the reasons why we have to directly connect our database with clerk because the webhook is what triggers the database to create the user. 
IM LEARNING.

*/
    
    return(
        <>
            <h1>WELCOME!</h1>
            <p>welcome to the User Profile Page</p>
            <p>you are user *imput user email here*</p>
        </>
    )
}