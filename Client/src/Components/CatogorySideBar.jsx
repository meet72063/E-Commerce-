import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeFilter, fetchCategoriesAsync, selectProuduct } from '../Store.js/Product/productsSlice'
import { useNavigate } from 'react-router-dom'



const CatogorySideBar = ({ openSideBar, setOpenSideBar }) => {
    const { categories } = useSelector(selectProuduct)
    const dispatch = useDispatch()
    const navigate = useNavigate()


    useEffect(() => {
        dispatch(fetchCategoriesAsync())
    }, [])

    const handleClick = (e, item) => {
        navigate('/products')
        dispatch(changeFilter({ key: 'category', value: item }))
        dispatch(changeFilter({ key: 'minPrice', value: 0 }))
        dispatch(changeFilter({ key: 'maxPrice', value: 2000 }))
        dispatch(changeFilter({ key: 'brand', value: '' }))
        setOpenSideBar(false)

    }

    return (
        <div onClick={(e) => e.stopPropagation()} className={`fixed top-0 left-0 w-[60vw] sm:w-[40vw]  bg-gray-200 space-y-5 z-30 h-screen ${!openSideBar && '-translate-x-[60vw]'} ease-in-out transition-all duration-1000 p-5  border-[0.01px] border-gray-500  `}>
            <div className='mb-5 h-5 pb-8 flex justify-end border-b-gray-300 relative border-b-[0.01px]' >
                <button onClick={() => setOpenSideBar(false)} className='mr-2'>X</button>
            </div>
            <div className='p-3 text-xl '>
                <div className='font-semibold p-2'>
                    Shop By Categories
                </div>

                <div className='pb-52'>


                    {categories.map((item, index) => <div className='p-2  text-base hover:text-lg h-12 flex items-center font-thin hover:bg-white  hover:border-l-blue-600 hover:border-l-2 hover:text-red-300 ' key={index}>
                        <button onClick={(e) => handleClick(e, item)}>{item}</button>
                    </div>)}</div>

            </div>





        </div>
    )
}

export default CatogorySideBar
