import React from 'react'
import {Link} from "react-router-dom"

const Navbar = () => {
  return (
    <div className=' flex items-center justify-between px-8 py-4 bg-white border-b border-gray-200'>
        <div>
            <Link to={"/"}
            className='text-2xl font-bold text-green-600'>
                Expense Manager
            </Link>
        </div>

        <div >
            <ul className='flex items-center gap-8'>
                <li>
                    <Link to={"/home"}
                    className='text-gray-600 hover:text-purple-800 transition-colors duration-200'>
                    Home
                    </Link>
                </li>

                <li>
                    <Link to={"/aboutus"}
                    className='text-gray-600 hover:text-purple-800 transition-colors duration-200'>
                    About Us
                    </Link>
                </li>

                <li>
                    <Link to={"contactus"}
                    className='text-gray-600 hover:text-purple-800 transition-colors duration-200'>
                    Contact Us
                    </Link>
                </li>

                <li>
                    <Link to={"/feedback"}
                    className='text-gray-600 hover:text-purple-800 transition-colors duration-200'>
                    FeedBack 
                    </Link>
                </li>
            </ul>
        </div>


        <div className='flex items-center gap-4'>
            <Link to={"/register"}>
                <button className="px-4 py-2 text-purple-700 border-indigo-700 rounded-lg hover:bg-indigo-50 transition-colors duration-200">
                    Register
                </button>
            </Link>

            <Link to={"/login"}>
            <button className= "px-4 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors duration-200">
                Login
            </button>
            
            </Link>
        </div>

    </div>
  )
}

export default Navbar