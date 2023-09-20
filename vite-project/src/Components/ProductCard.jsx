import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

const ProductCard = () => {
    return (
        <div className='   sm:h-[400px] h-[450px] w-full shadow-sm shadow-gray-500 bg-white'>
            <img src="data:image/jpeg;base64,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" alt=""
                className='w-full h-[50%]' />
            <div className='h-[50%] p-5 py-2 '>
                <div className='h-[70%]  '>

                    <div>
                        {/* name of Brand */}
                        <h2 className='text-lg text-blue-500'> Name of the Brand</h2>
                        {/* category name */}
                        <h2> By Gucci</h2>
                    </div>
                    <div className='py-1'>
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quisquam, fugit.
                    </div>
                </div>

                {/* price */}
                <div className='flex justify-between items-center text-lg font-semibold h-[30%]'>
                    <div>
                        $13
                    </div>

                    <div className='flex items-center space-x-1'>
                        <h2>4</h2>
                        <FontAwesomeIcon icon={faStar} style={{ color: "yellow" }} />
                    </div>
                </div>

            </div>

        </div>
    )
}

export default ProductCard
