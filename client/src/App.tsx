import './App.css'

import { Header } from './components/header'
import { Routes, Route } from 'react-router-dom'


//importing the pages.
import Homepage from './pages/homepage'
import RecipeDirectory from './pages/recipe-directory'



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
          {/* next ones to make:  */}
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
