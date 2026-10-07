import React from 'react'
import Navbar from './Navbar'

const LandingPage = () => {
  return (
    <div>
        <Navbar/>

        <div className='flex text-center gap-8'>
          <div className=' w-full max-w-md p-8 mt-4 rounded-xl shadow-md text-center py-20'>
            <h2 className='text-4xl font-bold text-gray-800'>
              Manage Your Expenses with Us.</h2>
          <p className='mt-4 text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt vero placeat, tempora sapiente aliquid temporibus, labore,
             quia reprehenderit necessitatibus cumque nihil magni expedita optio ullam facilis saepe incidunt. Deleniti, earum.</p>
          </div>

          <div className='  w-full max-w-md p-8 mt-4 rounded-xl shadow-md py-20 text-center'>
            <h2 className='text-4xl font-bold '>What we can do for you.</h2>
          <p className='mt-4'>Lorem ipsum dolor sit amet consectetur adipisicing elit.
             Sunt vero placeat, tempora sapiente aliquid temporibus, labore,
             quia reprehenderit necessitatibus cumque nihil magni expedita optio ullam facilis saepe incidunt. Deleniti, earum.</p>
          </div>
          
          <div className='  w-full max-w-md p-8 mt-4 rounded-xl shadow-md py-20 text-center'>
            <h2 className='text-4xl font-bold '>What we can do for you.</h2>
          <p className='mt-4'>Lorem ipsum dolor sit amet consectetur adipisicing elit.
             Sunt vero placeat, tempora sapiente aliquid temporibus, labore,
             quia reprehenderit necessitatibus cumque nihil magni expedita optio ullam facilis saepe incidunt. Deleniti, earum.</p>
          </div>
          

        </div>
    </div>
  )
}

export default LandingPage