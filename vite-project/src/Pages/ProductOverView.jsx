import React, { useState } from 'react'
import { DefaultRating } from '../Components/Rating';
import { Input, Rating, Textarea } from '@material-tailwind/react';
import { SliderCustomStyles } from '../Components/Slider'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBagShopping, faArrowAltCircleDown, faArrowCircleDown, faCircleDown } from '@fortawesome/free-solid-svg-icons';

const ProductOverView = () => {

    const [value, setValue] = useState(1);
    const [recommendationOptions, setRecommendationOptions] = useState(false)
    const [recommend, setRecommend] = useState('Yes')



    const handleDecrement = () => {

        if (Number(value) <= 1) {
            setValue(1)
            return
        }

        setValue(Number(value) - 1)
    }

    return (
        <div className='space-y-16'>

            <div className='grid md:grid-cols-5 gap-x-5 space-y-8 md:space-y-0 '>
                {/* product image */}
                <div className='md:col-span-2 shadow-md shadow-gray-400  space-y-5 p-5 bg-white  '>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_mOrgdq2iyXBxy9rniyPDxA8Fbgozo17n-Q&usqp=CAU" alt="" className='w-full h-full' />

                </div>


                {/* product  description price quantity*/}
                <div className='md:col-span-3 md:col-start-3 shadow-md shadow-gray-400 bg-white p-5 space-y-5'>
                    <div>
                        <h2 className='text-2xl font-bold text-blue-600'>Converse All Star</h2>
                        <h3>converse-shoes</h3>
                    </div>
                    <hr />
                    <div>
                        See More From Converse
                    </div>
                    <div>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente, quisquam!
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora, quam ratione. Unde debitis perferendis expedita minus cupiditate ad alias magnam.
                    </div>

                    <div className='font-bold text-2xl '>
                        $40
                    </div>

                    <div className='space-y-2 '>
                        <h2>Quantity</h2>
                        <div className='flex space-x-3'>
                            <div className='h-10 w-full border-[0.01px] border-gray-300 flex items-center px-2' >{value}</div>

                            <button className='bg-gray-300 px-3 text-lg' onClick={() => setValue(Number(value) + 1)}>+</button>
                            <button className='bg-gray-300 px-3 text-lg' onClick={handleDecrement}>-</button>
                        </div>


                    </div>

                    <button className=' border-[0.01px] sm:shadow-md shadow-gray-400 space-x-3 text-center border-gray-300 flex  px-10 p-3 items-center rounded-md active:bg-blue-700 hover:bg-blue-300 acitve:text-white'>
                        <FontAwesomeIcon icon={faBagShopping} /> <span>Add to Bag</span>
                    </button>
                </div>
            </div>


            <div className='grid lg:grid-cols-5 gap-x-5 space-y-8  md:space-y-0 '>
                {/* ratings overview*/}
                <div className='lg:col-span-2  '>
                    <div className='shadow-md shadow-gray-400 p-5 space-y-5 bg-white'>
                        <div className='space-y-2'>
                            <h1 className='font-semibold text-lg'>Rating</h1>
                            <DefaultRating />
                        </div>

                        <div className='border-2 border-gray-200'>

                        </div>
                        {/* 5 Star */}
                        <div className='space-x-2 flex items-center'>
                            <div className=''>
                                5 Star
                            </div>
                            <div className='grow'>
                                <SliderCustomStyles />
                            </div>
                            <div className=''>
                                50%
                            </div>

                        </div>
                        {/* 4 Star */}
                        <div className='space-x-2 flex items-center'>
                            <div className='flex'>
                                4 Star
                            </div>
                            <div className='grow'>
                                <SliderCustomStyles />
                            </div>
                            <div className=''>
                                50%
                            </div>

                        </div>
                        {/* 3 star */}
                        <div className='space-x-2 flex items-center'>
                            <div className='flex'>
                                3 Star
                            </div>
                            <div className='grow'>
                                <SliderCustomStyles />
                            </div>
                            <div className=''>
                                50%
                            </div>

                        </div>
                    </div>

                </div>

                {/* reviews of the product*/}

                <div className='lg:col-span-3 lg:col-start-3 space-y-4 '>
                    {/* Review 1 */}
                    <div className='shadow-sm shadow-gray-300 p-5 flex space-x-5  bg-white'>
                        <div className='items-center flex'>
                            <div className='rounded-3xl bg-blue-gray-600 w-12 h-12'>

                            </div>
                        </div>

                        <div className='grow space-y-1'>
                            <h2 className='text-lg font-semibold'>Good Brand </h2>
                            <h3 className='text-md font-body'>Wednesday, Sep 1, 2021</h3>
                            <div className='font-light text-gray-700'>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, dolorem.
                            </div>

                        </div>

                        <div>
                            <Rating />
                        </div>

                    </div>
                    {/* Review 2 */}
                    <div className='shadow-sm shadow-gray-300 p-5 flex space-x-5 bg-white  '>
                        <div className='items-center flex'>
                            <div className='rounded-3xl bg-blue-gray-600 w-12 h-12'>

                            </div>
                        </div>

                        <div className='grow space-y-1'>
                            <h2 className='text-lg font-semibold'>Good Brand </h2>
                            <h3 className='text-md font-body'>Wednesday, Sep 1, 2021</h3>
                            <div className='font-light text-gray-700'>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, dolorem.
                            </div>

                        </div>

                        <div>
                            <Rating />
                        </div>

                    </div>

                    <div className='shadow-sm shadow-gray-400 p-5 space-y-5 bg-white'>
                        <div>
                            <h1 className='text-lg font-semibold text-gray-800'>Add Review</h1>
                        </div>



                        <Textarea color="gray" label="Write your review here" />

                        <div className='space-y-2'>
                            <h2>Rating</h2>
                            <Rating />
                        </div>

                        <div className='space-y-2 '>
                            <h2>will your recommend this product?</h2>
                            <div>
                                <div className='h-10 w-full border-[0.01px] border-gray-300 flex items-center px-2  justify-between' >
                                    <h2>{recommend}</h2>
                                    <button onClick={() => setRecommendationOptions(!recommendationOptions)}> <FontAwesomeIcon icon={faCircleDown} /></button>
                                </div>
                                {recommendationOptions && <div className=' border-[0.01px] border-gray-300 mb-2 flex-col flex  ' onMouseLeave={() => setRecommendationOptions(!recommendationOptions)}>
                                    <button className={`text-left hover:bg-gray-300 p-2 ${recommend === 'Yes' && 'bg-gray-100'}`} onClick={() => {
                                        setRecommendationOptions(!recommendationOptions)
                                        setRecommend('Yes')
                                    }}>Yes</button>
                                    <button className={`text-left hover:bg-gray-300 p-2 ${recommend === 'No' && 'bg-gray-100'}`} onClick={() => {
                                        setRecommendationOptions(!recommendationOptions)
                                        setRecommend('No')

                                    }}>No</button>
                                </div>}
                            </div>

                            <button className=' border-[0.01px]  space-x-3 text-center border-gray-400 flex  px-10 p-3 items-center rounded-md active:bg-gray-100 ' >
                                Publish Review
                            </button>

                        </div>


                    </div>

                </div>




            </div>



        </div>
    )
}

export default ProductOverView
