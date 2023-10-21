import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { selectUser } from '../Store.js/auth/userSlice'
const url = import.meta.env.VITE_SERVER_URL

const Success = () => {
    const user = JSON.parse(localStorage.getItem('userData'))





    useEffect(() => {
        if (user) {
            localStorage.removeItem('cart')
            axios.patch(`${url}/api/user/cart`, { _id: user._id })
                .then((d) => console.log(d))
                .catch(err => console.log(err))
        }
    }, [])

    return (
        <div className='container grid place-content-center bg-purple-100 min-h-[70vh] min-w-full p-5'>

            <div className="bg-white p-8 rounded-lg shadow-md text-center">
                <h1 className=" text-3xl md:text-4xl font-semibold text-purple-600 mb-4">
                    Thank You for Your Purchase
                </h1>
                <p className="text-lg text-gray-700">
                    Your order has been successfully placed.
                </p>

                <Link to='/products' replace={true}>  <button className="mt-4 inline-block bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
                    Continue Shopping
                </button></Link>
            </div>



        </div>
    )
}

export default Success
