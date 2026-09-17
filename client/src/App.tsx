import { useEffect, useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'

import { Header } from './components/header'
import { SignedIn } from '@clerk/clerk-react'



type Category = {
  id: string;
  category_name: string;
};



function App() {
  // usestate, of course to avoid rapid loading
  const [categories, setCategories] = useState<Category[] | null>(null);
  const [error, setError] = useState<string | null>(null);



  console.log("render, categories =", categories);

  // // function here to GET the data from api
  useEffect(() => {

    // call api
    fetch("http://localhost:3000/category-get", {
      credentials: 'include',
    })
    //handling initial connection
    .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
    //handling the json that's returned (database json)
    .then((res) => {
      
      setCategories(res);
    });//setting it to the setCategories
    
  }, []);
  


  return (
    <>
      <Header />
      <SignedIn>
        {/* apply your table here in html. figure out later. */}
        <div>THIS IS WORKING. the content for the signed in user.</div>
        <div style={{ padding: 24 }}>
      <h1>Categories</h1>

      {!categories && <p>Loading…</p>}
      {error && <p>Error: {error}</p>}
      {categories && categories.length === 0 && <p>No categories found.</p>}
      {categories && categories.length > 0 && (
        <ul>
          {categories.map((c) => (
            <li key={c.id}>{c.category_name}</li>
          ))}
        </ul>
      )}
    </div>
      </SignedIn>
    </>
  )
}

export default App
