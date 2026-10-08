import React from 'react'
import {BrowserRouter as Router, Routes , Route} from "react-router-dom"
import CreateGrocery from './client/CreateGrocery'
import LandingPage from './pages/LandingPage'
import Register from './pages/Register'
import Login from './pages/Login'
import Userdashboard from './client/Userdashboard'
import Salary from './client/Salary'


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element ={<LandingPage/>}/>
        <Route path='/register' element = {<Register/>}/>
        <Route path='/login' element = {<Login/>}/>
        <Route path='/user' element = {<Userdashboard/>}/>
        <Route path='/groceries' element={<CreateGrocery/>}/>
        <Route path='/salary' element ={<Salary/>}/>
      </Routes>
    </Router>
    
  )
}

export default App