import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faArrowRotateForward, faTrash } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux'
import { decreaseQuantity, increaseQuanity, removeFromCart, selectCart } from '../Store.js/cart/cartSlice'
import { Link } from 'react-router-dom'

const CartItem = ({ title, image, price, quantity, _id }) => {

    const dispatch = useDispatch()
    return (
        <>
            <tr className='border-b'>
                <td className=" p-2 ">
                    <div className=' grid  md:grid-cols-9 grid-cols-1 gap-3 xl:gap-8 '>
                        <Link to={`/productOverview/${_id}`} className='sm:col-span-4'>
                            <div ><img src={image} alt=""
                                className='h-28 md:h-44 w-full rounded-xl   ' /></div></Link>
                        <h2 className='font-semibold text-sm sm:text-lg text-center text-blue-300  pt-2 '>
                            <Link to={`/productOverview/${_id}`} >  {title}</Link>
                        </h2>
                    </div>
                </td>
                <td className=" p-2 ">$ {price}</td>
                <td className=" p-2">
                    <div className='flex space-x-5 items-center'>
                        <h2>{quantity}</h2>
                        <div className='md:flex-row flex md:gap-2 space-y-2 md:space-y-0 flex-col'>
                            <button className='bg-gray-300 px-3 text-lg' onClick={() => dispatch(increaseQuanity({ _id, quantity }))}>+</button>
                            <button className='bg-gray-300 px-3 text-lg' onClick={() => dispatch(decreaseQuantity({ _id, quantity }))}>-</button>
                        </div>


                    </div>
                </td>
                <td className=" ">$ {quantity * price}</td>
                <td className=" p-2 pl-5"><button onClick={() => dispatch(removeFromCart({ _id }))}><FontAwesomeIcon icon={faTrash} /></button></td>

            </tr>

        </>
    )
}

export default CartItem
