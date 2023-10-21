import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeFilter, selectProuduct } from '../Store.js/Product/productsSlice'
import { useNavigate } from 'react-router-dom'



const Brands = ({ onClick }) => {
    const { brands } = useSelector(selectProuduct)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleClick = (e, item) => {
        navigate('/products')
        dispatch(changeFilter({ key: 'category', value: "" }))
        dispatch(changeFilter({ key: 'minPrice', value: 0 }))
        dispatch(changeFilter({ key: 'maxPrice', value: 2000 }))
        dispatch(changeFilter({ key: 'brand', value: item }))
        onClick()
    }


    return (
        <div className='bg-white h-30 shadow-md rounded-sm p-5  shadow-gray-700 w-[70vw] sm:w-[50vw] md:w-[50vw]  absolute top-8 -left-5 md:left-10 lg:-translate-x-[200px]  xl:-translate-x-[680px] z-10' on>
            <button className='absolute top-8 md:right-10 right-5  hover:text-red-600  font-bold    ' onClick={() => onClick()}>X</button>
            <div className='text-center mb-3 p-2 space-y-2'>
                <div className='md:flex justify-between  md:pr-20'>
                    <h1 className='font-thin text-lg '>Show By Brands</h1>
                    <hr />
                </div>
                <hr />

            </div>

            <div className='grid grid-cols-2 lg:grid-cols-3 justify-center gap-3 mb-2'>

                {brands.slice(0, 9).map((item, index) => {
                    return <p className=' border p-2 sm:p-3 cursor-pointer text-gray-700 hover:text-red-300   font-roboto text-xs sm:text-base  ' key={index}>
                        <button onClick={(e) => handleClick(e, item)} className='text-left'>{item}</button>
                    </p>
                })}




            </div>
        </div>
    )
}

export default Brands
