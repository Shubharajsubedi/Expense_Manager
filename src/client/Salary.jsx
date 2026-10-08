import React from 'react'

const Salary = () => {
  return (
   
    <div className='flex items-center justify-center min-h-screen bg-gray-900 px-10'>
      
      
      <div className='bg-gray-800 p-5 rounded-3xl shadow-xl border-8 border-gray-800
                      transform transition-all duration-300 ease-out
                      hover:-translate-y-2 hover:shadow-2xl hover:shadow-green-500/20 hover:border-green-500/50
                      animate-fade-in-up max-w-xl text-center'>
        
        <h2 className='text-4xl text-green-400 font-bold mb-6'>
          Your Remuneration.
        </h2>
        
        <p className='text-2xl text-white break-all font-semibold'>
          Bank Balance: <span className='text-green-300'>RS 1,000,000,000,000,000,000.</span>
        </p>
        
      </div>
    </div>
  )
}

export default Salary
