import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { PostUser } from '../api/APIUsers'
import useLoginStore from '../store/LoginStore'

const Register = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm()
  const { loggedinUser } = useLoginStore();

  const handleregister = async (data) => {
    try {
      const res = await PostUser(data)
      loggedinUser(res.data)
      alert("Registered successfully")
    } catch (error) {
      console.log(error)
    }
  }

  // Fixed the spelling typo from 'passwordVlaue' to 'passwordValue'
  const passwordValue = watch("password")

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit(handleregister)}
        className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Create an Account
        </h2>

        {/* Email */}
        <div className="mb-5">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            id="email"
            type="email"
            {...register("email", { required: "Email is required" })}
            placeholder="Enter your email"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.email && (
            <p className="mt-2 text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="mb-5">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <input
            id="password"
            type="password"
            {...register("password", {
              required: "Password required",
              minLength: {
                value: 5,
                message: "Password cannot be less than 5 characters.",
              },
            })}
            placeholder="Enter your password"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.password && (
            <p className="mt-2 text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="mb-5">
          <label htmlFor="confirmpassword" className="block text-sm font-medium text-gray-700 mb-2">
            Confirm Password
          </label>
          <input
            id="confirmpassword" // Changed 'id' from 'password' to 'confirmpassword'
            type="password"
            {...register("confirmpassword", {
              required: "Confirm Password required",
              validate: (value) =>
                value === passwordValue || "Passwords do not match" // Used the renamed variable
            })}
            placeholder="Confirm your password"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />

          {/* Added the missing error message layout block */}
          {errors.confirmpassword && (
            <p className="mt-2 text-sm text-red-500">
              {errors.confirmpassword.message}
            </p>
          )}
        </div>

        {/* Register Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Register
        </button>
      </form>
    </div>
  )
}

export default Register;
