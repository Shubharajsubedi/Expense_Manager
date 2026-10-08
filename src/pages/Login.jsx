import React from 'react'
import { useForm } from 'react-hook-form'
import { GetUser } from '../api/APIUsers';
import useLoginStore from '../store/LoginStore';
import {useNavigate} from "react-router-dom"


const Login = () => {

    const {handleSubmit,register,required,formState:{errors}}= useForm();
    const {loggedinUser} = useLoginStore();
    const navigate = useNavigate()

    const handleLogin = async(data) => {
        try {
            const res = await GetUser()
            const allusers= res.data

            const matchusers = allusers.find((usr) => 
            usr.password === data.password && usr.email === data.email)

            if (matchusers) {
               loggedinUser(matchusers)
                navigate("/user")
            }else{
                alert("Enter Correct Password or Email.")
            }
            

            
        } catch (error) {
          console.log(error)  
        }
    }


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-3">
  <form
    onSubmit={handleSubmit(handleLogin)}
    className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg"
  >
    <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
      Login
    </h2>

    {/* Username */}
    <div className="mb-5">
      <label
        htmlFor="username"
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        Username
      </label>

      <input
        id="username"
        type="text"
        {...register("username", {
          required: "Username Required",
          minLength: {
            value: 3,
            message: "Username cannot be less than 3 characters",
          },
        })}
        placeholder="Enter your username"
        className="w-full px-4 py-3 border border-gray-300 rounded-lg
                   focus:outline-none focus:ring-2 focus:ring-blue-500
                   focus:border-blue-500"
      />

      {errors.username && (
        <p className="mt-2 text-sm text-red-500">
          {errors.username.message}
        </p>
      )}
    </div>

    {/* Email */}
    <div className="mb-5">
      <label
        htmlFor="email"
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        Email
      </label>

      <input
        id="email"
        type="email"
        {...register("email", {
          required: "Email is required",
        })}
        placeholder="Enter your email"
        className="w-full px-4 py-3 border border-gray-300 rounded-lg
                   focus:outline-none focus:ring-2 focus:ring-blue-500
                   focus:border-blue-500"
      />

      {errors.email && (
        <p className="mt-2 text-sm text-red-500">
          {errors.email.message}
        </p>
      )}
    </div>

    {/* Password */}
    <div className="mb-6">
      <label
        htmlFor="password"
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        Password
      </label>

      <input
        id="password"
        type="password"
        {...register("password", {
          required: "Password is required",
        })}
        placeholder="Enter your password"
        className="w-full px-4 py-3 border border-gray-300 rounded-lg
                   focus:outline-none focus:ring-2 focus:ring-blue-500
                   focus:border-blue-500"
      />

      {errors.password && (
        <p className="mt-2 text-sm text-red-500">
          {errors.password.message}
        </p>
      )}
    </div>

    {/* Login Button */}
    <button
      type="submit"
      className="w-full bg-blue-600 text-white py-3 rounded-lg
                 font-semibold hover:bg-blue-700 transition duration-200
                 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      Login
    </button>
  </form>
</div>
  )
}

export default Login