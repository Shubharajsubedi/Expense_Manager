import React from 'react'
import {Link} from "react-router-dom"
import useLoginStore from '../store/LoginStore'

const NavbarUser = () => {
    const {loggedoutUser} = useLoginStore();
  return (
    <div className=' flex items-center justify-between px-8 py-4 bg-white border-b border-gray-200'>
        <div>
            <Link 
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

                <li className="relative group">

            
                <button className="text-gray-600 hover:text-purple-800 transition-colors duration-200">
                    Your Expenses
                </button>
                
                <div className="absolute left-0 top-full hidden group-hover:block pt-2 z-50">

                    <div className="w-40 bg-white border border-gray-200 rounded-lg shadow-lg">

                        <Link
                            to="/groceries"
                            className="block px-4 py-2 text-gray-600 hover:bg-purple-50 hover:text-purple-800"
                        >
                            Groceries
                        </Link>

                        <Link
                            to="/food"
                            className="block px-4 py-2 text-gray-600 hover:bg-purple-50 hover:text-purple-800"
                        >
                            Food
                        </Link>

                        <Link
                            to="/bills"
                            className="block px-4 py-2 text-gray-600 hover:bg-purple-50 hover:text-purple-800"
                        >
                            Bills
                        </Link>

                    </div>

                </div>

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
            

            <Link to={"/"}>
            <button onClick={() => loggedoutUser()}
            className= "px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors duration-200">
                Logout
            </button>
            
            </Link>
        </div>

    </div>
  )
}

export default NavbarUser