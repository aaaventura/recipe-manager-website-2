import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'

import { Header } from './components/header'
import { SignedIn } from '@clerk/clerk-react'

function App() {
  // function here to GET the data from api
  // create a variable (json) to hold database data
  // call function 
  // apply data to variable 
  // parse it in signed in? or here?

  return (
    <>
      <Header />
      <SignedIn>
        {/* apply your table here in html. figure out later. */}
        <div>THIS IS WORKING. the content for the signed in user.</div>
      </SignedIn>
    </>
  )
}

export default App
