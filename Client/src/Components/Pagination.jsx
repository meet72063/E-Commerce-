import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProductAsync, selectProuduct } from '../Store.js/Product/productsSlice'

const Pagination = () => {
    const { pages, pageNumber, rating, maxPrice, minPrice, sort, category, brand } = useSelector(selectProuduct)
    const dispatch = useDispatch()
    const handlePage = (pageNumber) => {
        if (pageNumber > 0) {
            dispatch(fetchProductAsync({ minPrice, maxPrice, rating, pageNumber, sort, category, brand }))
        }
    }


    return (
        <div className='flex justify-center items-center gap-4 p-2 border'>
            <button className='px-4 py-3 bg-purple-900 text-white rounded-md disabled:bg-purple-200' disabled={Number(pageNumber) === 1} onClick={() => handlePage(Number(pageNumber) - 1)}>
                PREV
            </button>
            <span className='text-center tex-lg font-semibold'>
                page {pageNumber} out of {pages}
            </span>

            <button className='px-4 py-3 bg-purple-900 text-white rounded-md disabled:bg-purple-200 ' disabled={Number(pageNumber) === pages} onClick={() => handlePage(Number(pageNumber) + 1)}>
                NEXT
            </button>
        </div>
    )
}

export default Pagination
