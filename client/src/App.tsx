import './App.css'

import { Header } from './components/header'
import { Routes, Route } from 'react-router-dom'


//importing the pages.
import Homepage from './pages/homepage'
import RecipeDirectory from './pages/recipe-directory'
import ProfilePage from './pages/profile'



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
