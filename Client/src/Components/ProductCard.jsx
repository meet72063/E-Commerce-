import React from 'react'
import { Rating } from '@mui/material'

const ProductCard = ({ title, price, image, rating, discountPercentage }) => {


    return (
        <div className='   sm:h-[400px] h-[450px]  shadow-sm shadow-gray-500 bg-white '>
            <img src={image} alt=""
                className='w-full h-[60%]' />
            <div className='h-[40%] p-5 pt-2 pb-5 '>
                <div className='h-[60%] grid items-center '>

                    <div>
                        {/* name of Brand */}
                        <h2 className='text-xl text-blue-500 '> {title}</h2>
                        {/* category name */}

                    </div>
                </div>

                {/* price */}
                <div className='flex justify-between items-center text-lg font-semibold h-[40%]' >
                    <div>
                        <h2 className='line-through text-gray-600 text-md '>${price}</h2>
                        <h2>${Math.round(price - (price * discountPercentage) / 100)}</h2>

                    </div>

                    <div className='flex items-center space-x-1'>
                        <Rating value={Math.round(rating)} readOnly />
                    </div>
                </div>

            </div>

        </div>
    )
}

export default ProductCard
