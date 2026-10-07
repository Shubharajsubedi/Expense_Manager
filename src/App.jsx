import React from 'react'
import {BrowserRouter as Router, Routes , Route} from "react-router-dom"
import CreateGrocery from './client/CreateGrocery'
import LandingPage from './pages/LandingPage'


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element ={<LandingPage/>}/>
        <Route path='/creategrocery' element={<CreateGrocery/>}/>
      </Routes>
    </Router>
    
  )
}

export default App