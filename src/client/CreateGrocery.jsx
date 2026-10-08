
import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form"
import { deleteGrocery, GetGrocery, PostGrocery } from '../api/APIGrocery'
import useQuantityStore from '../store/QuantityStore'
import NavbarUser from '../components/NavbarUser'
import { Link, useSearchParams } from 'react-router-dom'


const CreateGrocery = () => {

    // --------------------------------------------------
    // Grocery state
    // This stores all grocery items coming from the API
    // --------------------------------------------------
    const [grocery, setGrocery] = useState([])


    // --------------------------------------------------
    // React Hook Form
    // register -> connects input with react-hook-form
    // handleSubmit -> handles form submission
    // reset -> clears the form
    // errors -> stores validation errors
    // --------------------------------------------------
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm()


    // --------------------------------------------------
    // Quantity Zustand store
    // quantity -> stores quantity of each grocery item
    // increament -> increases quantity
    // decreament -> decreases quantity
    // --------------------------------------------------
    const {
        quantity,
        increament,
        decreament
    } = useQuantityStore()


    // --------------------------------------------------
    // Search parameters
    //
    // Example URL:
    // http://localhost:5173/grocery?q=rice
    //
    // useSearchParams allows us to read and change
    // the ?q=rice part of the URL.
    // --------------------------------------------------
    const [searchParams, setSearchParams] = useSearchParams()


    // --------------------------------------------------
    // Get search query from URL
    //
    // If URL is:
    // ?q=rice
    //
    // query will contain:
    // "rice"
    //
    // If there is no q parameter:
    // query will be:
    // ""
    // --------------------------------------------------
    const query = searchParams.get("q") || ""


    // --------------------------------------------------
    // Search function
    //
    // data comes from react-hook-form.
    //
    // Example:
    //
    // data = {
    //     groceryitem: "rice"
    // }
    // --------------------------------------------------
    const handleSearch = (data) => {

        // Put the searched value into the URL
        setSearchParams({
            q: data.groceryitem
        })
    }


    // --------------------------------------------------
    // FILTER GROCERY DATA
    //
    // grocery = original API data
    //
    // filteredGrocery = only the items matching search
    //
    // Example:
    //
    // Search: rice
    //
    // Rice
    // Rice Flour
    //
    // will be displayed.
    // --------------------------------------------------
    const filteredGrocery = grocery.filter((gry) =>

        // Convert grocery name to lowercase
        // Convert search query to lowercase
        //
        // includes() checks whether the search text
        // exists inside the grocery name.
        gry.grocery
            .toLowerCase()
            .includes(query.toLowerCase())

    )


    // --------------------------------------------------
    // ADD GROCERY
    // --------------------------------------------------
    const onsubmit = async (data) => {

        try {

            // Send grocery data to API
            const res = await PostGrocery(data)

            // Add newly created grocery item
            // to existing grocery array
            setGrocery([
                ...grocery,
                res.data
            ])

            // Clear form after successful submission
            reset()

        } catch (error) {

            console.log(error)

        }
    }


    // --------------------------------------------------
    // GET ALL GROCERY
    //
    // This runs once when the component loads.
    // --------------------------------------------------
    useEffect(() => {

        const fetchGrocery = async () => {

            try {

                // Get grocery data from API
                const res = await GetGrocery()

                // Store API data in grocery state
                setGrocery(res.data)

            } catch (error) {

                console.log(error)

            }

        }


        // Call function
        fetchGrocery()

    }, [])


    // --------------------------------------------------
    // DELETE GROCERY
    // --------------------------------------------------
    const Handledelete = async (id) => {

        try {

            // Delete grocery from API
            const res = await deleteGrocery(id)

            console.log(res.data)

            // Remove deleted item from React state
            setGrocery(
                grocery.filter((gry) =>

                    gry.id !== id

                )
            )

        } catch (error) {

            console.log(error)

        }

    }


    // --------------------------------------------------
    // CALCULATE TOTAL SHOPPING PRICE
    //
    // reduce() goes through every grocery item
    // and adds:
    //
    // price * quantity
    //
    // Example:
    //
    // Rice = 100 x 2 = 200
    // Milk = 80 x 3 = 240
    //
    // Total = 440
    // --------------------------------------------------
    const TotalPrice = grocery.reduce((sum, item) => {

        return (
            sum +
            Number(item.price) *
            (quantity[item.id] || 1)
        )

    }, 0)


    // --------------------------------------------------
    // RETURN JSX
    // --------------------------------------------------
    return (

        <>

            {/* Navbar */}
            <NavbarUser />


            {/* --------------------------------------------------
                SEARCH SECTION
            -------------------------------------------------- */}
            <div className="p-6">

                <h2 className="text-xl font-bold mb-4">
                    Search Grocery
                </h2>


                {/* 
                    Search form

                    IMPORTANT:
                    We use react-hook-form here.

                    handleSubmit(handleSearch)
                    sends the form data to handleSearch.
                */}
                <form
                    onSubmit={handleSubmit(handleSearch)}
                    className="flex gap-3"
                >

                    <label
                        htmlFor="groceryitem"
                        className="flex items-center"
                    >
                        Grocery item:
                    </label>


                    {/* Search input */}
                    <input
                        id="groceryitem"
                        type="text"

                        /*
                            react-hook-form registers
                            this input.

                            The value will be available as:

                            data.groceryitem
                        */
                        {...register("groceryitem")}

                        placeholder="Enter grocery name"

                        className="border border-gray-300 rounded-lg px-4 py-2"
                    />


                    {/* Search button */}
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
                    >
                        Search
                    </button>


                    {/* Clear Search */}
                    <button
                        type="button"

                        /*
                            Remove q from URL.
                            This causes query to become "".

                            Therefore all grocery items
                            will appear again.
                        */
                        onClick={() => {

                            setSearchParams({})

                            reset()

                        }}

                        className="bg-gray-500 text-white px-5 py-2 rounded-lg hover:bg-gray-600"
                    >
                        Clear
                    </button>

                </form>


                {/* Show current search */}
                <p className="mt-4">

                    Search query:

                    <strong className="ml-2">
                        {query || "All groceries"}
                    </strong>

                </p>

            </div>



            {/* --------------------------------------------------
                MAIN GROCERY PAGE
            -------------------------------------------------- */}
            <div className="min-h-screen bg-gray-100 py-10 px-4">

                <div className="max-w-6xl mx-auto">


                    {/* --------------------------------------------------
                        PAGE HEADER
                    -------------------------------------------------- */}
                    <div className="mb-8 flex items-center justify-between">

                        <div>

                            <h1 className="text-3xl font-bold text-gray-800">
                                Grocery Manager
                            </h1>


                            <p className="text-gray-500 mt-2 mb-2 px-3 py-2">
                                Add your grocery items and manage your shopping list easily.
                            </p>

                        </div>


                        {/* --------------------------------------------------
                            FILTER DROPDOWN
                        -------------------------------------------------- */}
                        <ul>

                            <li className="relative group">

                                <button
                                    className="border-green-500 bg-green-600 rounded-lg px-4 py-2 hover:bg-gray-500 hover:text-green-500"
                                >
                                    Filter
                                </button>


                                <div className="absolute left-0 top-full hidden group-hover:block pt-2 z-50">

                                    <div className="w-40 bg-white border border-gray-200 rounded-lg shadow-lg">

                                        <Link
                                            to="/byprice"
                                            className="block px-4 py-2 text-gray-600 hover:bg-purple-50 hover:text-purple-800"
                                        >
                                            Price
                                        </Link>


                                        <Link
                                            to="/productname"
                                            className="block px-4 py-2 text-gray-600 hover:bg-purple-50 hover:text-purple-800"
                                        >
                                            Product Name
                                        </Link>

                                    </div>

                                </div>

                            </li>

                        </ul>

                    </div>



                    {/* --------------------------------------------------
                        ADD GROCERY FORM
                    -------------------------------------------------- */}
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

                                    /*
                                        Required validation
                                    */
                                    {...register("grocery", {
                                        required: true
                                    })}

                                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
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

                                        /*
                                            Minimum price
                                        */
                                        min: {

                                            value: 100,

                                            message:
                                                "You must purchase each item with Minimum amount: RS 100"

                                        },


                                        /*
                                            Maximum price
                                        */
                                        max: {

                                            value: 100000,

                                            message:
                                                "Your maximum limit is RS.100000"

                                        }

                                    })}

                                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                />


                                {/* Price validation error */}
                                {errors.price && (

                                    <p className="text-red-500 text-sm mt-2">

                                        {errors.price.message}

                                    </p>

                                )}

                            </div>



                            {/* Add button */}
                            <button
                                type="submit"
                                className="w-full md:w-auto px-7 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 active:scale-95 transition duration-200 shadow-sm"
                            >
                                + Add Grocery
                            </button>

                        </form>

                    </div>



                    {/* --------------------------------------------------
                        GROCERY TABLE
                    -------------------------------------------------- */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">


                        {/* Table Header */}
                        <div className="px-6 py-5 border-b border-gray-200">

                            <h2 className="text-xl font-semibold text-gray-800">
                                Grocery List
                            </h2>


                            <p className="text-sm text-gray-500 mt-1">
                                Manage your products and quantities.
                            </p>

                        </div>



                        {/* Table */}
                        <div className="overflow-x-auto">

                            <table className="w-full">


                                {/* --------------------------------------------------
                                    TABLE HEAD
                                -------------------------------------------------- */}
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



                                {/* --------------------------------------------------
                                    TABLE BODY
                                -------------------------------------------------- */}
                                <tbody className="divide-y divide-gray-100">


                                    {/*
                                        IMPORTANT PART

                                        We use filteredGrocery instead
                                        of grocery.

                                        grocery:
                                        -> contains ALL data

                                        filteredGrocery:
                                        -> contains only matching data
                                    */}
                                    {filteredGrocery.map((gry) => {


                                        // Get quantity of current product
                                        // Default quantity = 1
                                        const qnty = quantity[gry.id] || 1


                                        return (

                                            <tr
                                                key={gry.id}
                                                className="hover:bg-gray-50 transition"
                                            >


                                                {/* Product */}
                                                <td className="py-5 px-6">

                                                    <div className="flex items-center gap-3">

                                                        <div>

                                                            <p className="font-medium text-gray-800">
                                                                {gry.grocery}
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


                                                        {/* Decrease */}
                                                        <button
                                                            onClick={() => decreament(gry.id)}
                                                            className="w-8 h-8 rounded-l-lg border border-gray-300 bg-gray-50 hover:bg-gray-200 font-bold transition"
                                                        >
                                                            −
                                                        </button>


                                                        {/* Current quantity */}
                                                        <span className="w-10 h-8 flex items-center justify-center border-t border-b border-gray-300 font-medium text-gray-700 bg-white">

                                                            {qnty}

                                                        </span>


                                                        {/* Increase */}
                                                        <button
                                                            onClick={() => increament(gry.id)}
                                                            className="w-8 h-8 rounded-r-lg border border-gray-300 bg-gray-50 hover:bg-gray-200 font-bold transition"
                                                        >
                                                            +
                                                        </button>

                                                    </div>

                                                </td>



                                                {/* Total price */}
                                                <td className="py-5 px-6">

                                                    <span className="font-bold text-blue-600">

                                                        Rs. {gry.price * qnty}

                                                    </span>

                                                </td>



                                                {/* Delete */}
                                                <td className="py-5 px-6 text-center">

                                                    <button
                                                        onClick={() => {
                                                            Handledelete(gry.id)
                                                        }}

                                                        className="px-4 py-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 font-medium text-sm transition"
                                                    >
                                                        Delete
                                                    </button>

                                                </td>

                                            </tr>

                                        )

                                    })}


                                </tbody>

                            </table>

                        </div>



                        {/* --------------------------------------------------
                            NO RESULTS
                        -------------------------------------------------- */}
                        {filteredGrocery.length === 0 && (

                            <div className="py-12 text-center">

                                <div className="text-5xl mb-3">
                                    🛒
                                </div>


                                <h3 className="text-lg font-semibold text-gray-700">
                                    No groceries found
                                </h3>


                                <p className="text-gray-400 mt-1">

                                    {query
                                        ? `No grocery matches "${query}"`
                                        : "Add your first grocery item above."
                                    }

                                </p>

                            </div>

                        )}

                    </div>



                    {/* --------------------------------------------------
                        TOTAL SHOPPING PRICE
                    -------------------------------------------------- */}
                    <div className="mt-6 flex justify-end">

                        <div className="w-full md:w-80 bg-white rounded-2xl shadow-sm border border-gray-200 p-6">

                            <div className="flex justify-between items-center">

                                <div>

                                    <p className="text-sm text-gray-500">
                                        Total Shopping Price
                                    </p>


                                    <h2 className="text-2xl font-bold text-gray-800 mt-1">

                                        Rs. {TotalPrice}

                                    </h2>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </>

    )

}


export default CreateGrocery

