import React, { useEffect, useState } from 'react'
import {useForm} from "react-hook-form"
import { deleteGrocery, GetGrocery, PostGrocery } from '../api/APIGrocery'
import useQuantityStore from '../store/QuantityStore'



const CreateGrocery = () => {
    const [grocery, setGrocery] = useState([])
    const {register, handleSubmit , reset,formState: {errors}} =useForm()
    const {quantity, increament, decreament} = useQuantityStore()
   

    const onsubmit = async(data) => {
      try {
        const res = await PostGrocery(data)
          setGrocery([...grocery,res.data])
          reset();
      } catch (error) {
       console.log(error) 
      }

    }

    useEffect(() => {
      const fetchGrocery = async() => {
        try {
          const res = await GetGrocery();
          setGrocery(res.data)
        } catch (error) {
          console.log(error)
        }

      }
      fetchGrocery()
     },[])

     const Handledelete = async(id) => {
      try {
        const res = await deleteGrocery(id)
        console.log(res.data)
        setGrocery(
          grocery.filter((gry) => (
          gry.id !== id 
          )))
        
      } catch (error) {
       console.log(error) 
      }

     }

     const TotalPrice = grocery.reduce((sum,item) => {
      
      return (sum + Number(item.price) * (quantity[item.id] || 1))
     },0)

     

    

  return (
    
  <div className="min-h-screen bg-gray-100 py-10 px-4">

    <div className="max-w-6xl mx-auto">

      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          🛒 Grocery Manager
        </h1>
        <p className="text-gray-500 mt-2">
          Add your grocery items and manage your shopping list easily.
        </p>
      </div>

      {/* Add Grocery Form */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">

        <h2 className="text-xl font-semibold text-gray-800 mb-5">
          Add Grocery Item
        </h2>

        <form
          onSubmit={handleSubmit(onsubmit)}
          className="grid grid-cols-1 md:grid-cols-3 gap-5 items-end"
        >

          {/* Grocery Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Name of Grocery
            </label>

            <input
              type="text"
              placeholder="e.g. Rice, Milk, Apple"
              {...register("grocery", { required: true })}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 
              focus:outline-none focus:ring-2 focus:ring-blue-500 
              focus:border-blue-500 transition"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Price
            </label>

            <input
              type="number"
              placeholder="Enter price"
              {...register("price", {
                required: true,
                min: {
                  value: 100,
                  message:
                    "You must purchase each item with Minimum amount: RS 100",
                },
                max: {
                  value: 100000,
                  message: "Your maximum limit is RS.100000",
                },
              })}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 
              focus:outline-none focus:ring-2 focus:ring-blue-500 
              focus:border-blue-500 transition"
            />

            {errors.price && (
              <p className="text-red-500 text-sm mt-2">
                {errors.price.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full md:w-auto px-7 py-3 rounded-xl 
            bg-blue-600 text-white font-semibold 
            hover:bg-blue-700 active:scale-95 
            transition duration-200 shadow-sm"
          >
            + Add Grocery
          </button>

        </form>
      </div>

      {/* Grocery Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">

        {/* Table Header */}
        <div className="px-6 py-5 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">
            🧺 Grocery List
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Manage your products and quantities.
          </p>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">
                  Product
                </th>

                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">
                  Unit Price
                </th>

                <th className="text-center py-4 px-6 text-sm font-semibold text-gray-600">
                  Quantity
                </th>

                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">
                  Total
                </th>

                <th className="text-center py-4 px-6 text-sm font-semibold text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">

              {grocery && grocery.map((gry) => {

                const qnty = quantity[gry.id] || 1;

                return (
                  <tr
                    key={gry.id}
                    className="hover:bg-gray-50 transition"
                  >

                    {/* Product */}
                    <td className="py-5 px-6">
                      <div className="flex items-center gap-3">

                        <div className="w-10 h-10 rounded-full bg-blue-100 
                        flex items-center justify-center">
                          🛍️
                        </div>

                        <div>
                          <p className="font-medium text-gray-800">
                            {gry.grocery}
                          </p>

                          <p className="text-xs text-gray-400">
                            Grocery item
                          </p>
                        </div>

                      </div>
                    </td>

                    {/* Unit Price */}
                    <td className="py-5 px-6">
                      <span className="font-medium text-gray-700">
                        Rs. {gry.price}
                      </span>
                    </td>

                    {/* Quantity */}
                    <td className="py-5 px-6">

                      <div className="flex items-center justify-center">

                        <button
                          onClick={() => decreament(gry.id)}
                          className="w-8 h-8 rounded-l-lg border 
                          border-gray-300 bg-gray-50 
                          hover:bg-gray-200 font-bold transition"
                        >
                          −
                        </button>

                        <span className="w-10 h-8 flex items-center 
                        justify-center border-t border-b border-gray-300 
                        font-medium text-gray-700 bg-white">
                          {qnty}
                        </span>

                        <button
                          onClick={() => increament(gry.id)}
                          className="w-8 h-8 rounded-r-lg border 
                          border-gray-300 bg-gray-50 
                          hover:bg-gray-200 font-bold transition"
                        >
                          +
                        </button>

                      </div>

                    </td>

                    {/* Total */}
                    <td className="py-5 px-6">
                      <span className="font-bold text-blue-600">
                        Rs. {gry.price * qnty}
                      </span>
                    </td>

                    {/* Delete */}
                    <td className="py-5 px-6 text-center">

                      <button
                        onClick={() => {
                          Handledelete(gry.id);
                        }}
                        className="px-4 py-2 rounded-lg 
                        bg-red-50 text-red-600 
                        hover:bg-red-100 
                        font-medium text-sm transition"
                      >
                        🗑 Delete
                      </button>

                    </td>

                  </tr>
                );
              })}

            </tbody>

          </table>

        </div>

        {/* Empty State */}
        {(!grocery || grocery.length === 0) && (
          <div className="py-12 text-center">

            <div className="text-5xl mb-3">
              🛒
            </div>

            <h3 className="text-lg font-semibold text-gray-700">
              No groceries yet
            </h3>

            <p className="text-gray-400 mt-1">
              Add your first grocery item above.
            </p>

          </div>
        )}

      </div>

      {/* Total Price Card */}
      <div className="mt-6 flex justify-end">

        <div className="w-full md:w-80 bg-white rounded-2xl 
        shadow-sm border border-gray-200 p-6">

          <div className="flex justify-between items-center">

            <div>
              <p className="text-sm text-gray-500">
                Total Shopping Price
              </p>

              <h2 className="text-2xl font-bold text-gray-800 mt-1">
                Rs. {TotalPrice}
              </h2>
            </div>

            <div className="w-12 h-12 rounded-full bg-green-100 
            flex items-center justify-center text-xl">
              💰
            </div>

          </div>

        </div>

      </div>

    </div>

  </div>


  )
}

export default CreateGrocery