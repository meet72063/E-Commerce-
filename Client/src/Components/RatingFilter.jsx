import React, { useState } from 'react'
import { Rating } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { changeFilter, fetchProductAsync, selectProuduct } from '../Store.js/Product/productsSlice'

const RatingFilter = () => {
    const { rating, maxPrice, minPrice } = useSelector(selectProuduct)


    const dispatch = useDispatch()

    const handleChange = (e, newValue) => {
        dispatch(changeFilter({ key: 'rating', value: newValue }))
        dispatch(fetchProductAsync({ rating, maxPrice, minPrice, pageNumber: 1 }))

    }
    return (
        <div className='h-24 border-[0.1px] shadow-sm shadow-gray-200 rounded-md bg-white p-3 space-y-1'>
            <div className='h-[40%] bg-slate-300 flex items-center pl-8'>
                <h2 className='text-xl font-semibold '>Rating</h2>

            </div>
            <div className='flex items-center px-8 h-[60%]'>

                <Rating
                    onChange={handleChange}
                    value={rating}
                    size="lg"
                    direction="horizontal"
                    defaultValue={1}
                />

                <span className='font-semibold text-md mx-3'>
                    upto {rating}.0
                </span>


            </div>
        </div>
    )
}

export default RatingFilter
