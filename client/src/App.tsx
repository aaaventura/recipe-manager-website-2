import './App.css'

import { Header } from './components/header'
import { Routes, Route } from 'react-router-dom'


//importing the pages.
import Homepage from './pages/homepage'
import RecipeDirectory from './pages/recipe-directory'
import ProfilePage from './pages/profile'
import TestingClerkSupabase from './pages/clerksupabasetest'
import CreateRecipe from './pages/createRecipe'
import RecipePage from './pages/recipePage'

function App() {
  
  return (
    <>
      <Header />

      <div style={{
        background: 'green'
        }}>
        <Routes>
          <Route path='/' element={<Homepage />} />

          <Route path='/recipes' element={<RecipeDirectory />} />
          <Route path='/userdashboard' element={<ProfilePage /> } />
          <Route path='/clerksupabasetest' element={<TestingClerkSupabase/> } />
          <Route path='/createrecipe' element={<CreateRecipe />} />
          <Route path='/recipepage' element={<RecipePage/> } />

          {/* next ones to make:  user dashboard, recipe page, only recipes made by the user can be modified.*/}
        </Routes>

      </div>
      

      {/* footer area if needed? */}
      <footer style={{background:'blue'}}>
        <p>this is the footer</p>
      </footer>
    </>
    
  )
}

export default App
