import React, { useState } from 'react'
import ProductCard from './ProductCard'
import LoadingSpinner from './LoadingSpinner'
import { useDispatch, useSelector } from 'react-redux'
import { changeFilter, selectProuduct } from '../Store.js/Product/productsSlice'
import Pagination from './Pagination'
import { Link } from 'react-router-dom'
import ErrorMessage from './ErrorMessage'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'


const ProductGrid = () => {
    const { status, products, totalItems, sort } = useSelector(selectProuduct)
    const [sortOptions, setSortOptions] = useState(false)
    const dispatch = useDispatch()
    const handleClick = (e) => {
        dispatch(changeFilter({ key: 'sort', value: e.target.name }))
        setSortOptions(!sortOptions)

    }



    if (status === 'loading') {
        return <div className='lg:col-span-9 lg:col-start-5 justify-center grid'><LoadingSpinner /></div>
    }

    if (status === 'error') {
        return <div className='lg:col-span-9 lg:col-start-5 '>
            <ErrorMessage />
        </div>
    }
    return (
        <div className='lg:col-span-9 lg:col-start-5 space-y-5'>
            <div className='p-6 shadow-sm bg-white shadow-gray-200 bg-slate-100 text-center sm:flex justify-between items-center space-y-2'>
                <h2 >Showing: {products.length} results from {totalItems}</h2>
                <div className='  space-x-3 flex items-center justify-center sm:justify-start  '>

                    <span>sort By</span>
                    <div className=' items-center justify-center flex'>
                        <div className='relative px-4'>
                            <button onClick={() => setSortOptions(!sortOptions)} className='py-2 flex px-2 bg-white text-gray-500 font-light border rounded-md'>
                                {sort === 'asc' ? 'price low to high' : 'price high to low'}
                            </button>

                            {sortOptions && <div className='top-11 absolute z-10 shadow-md shadow-gray-600 rounded-md bg-white p-3 space-y-2'>
                                <input onClick={handleClick} name='asc' type='button' className='hover:text-black bg-white text-gray-500 font-light' value={'price low to high'} />
                                <input onClick={handleClick} name='desc' type='button' className='hover:text-black  bg-white text-gray-500 font-light' value={'price high to low'} />
                            </div>}

                        </div>
                        {sortOptions ? <button onClick={() => setSortOptions(false)}><FontAwesomeIcon icon={faChevronUp} /> </button> : <button onClick={() => setSortOptions(true)}><FontAwesomeIcon icon={faChevronDown} /></button>}
                    </div>


                </div>
            </div>
            <div className='  grid grid-cols-1 gap-4  md:grid-cols-2 xl:grid-cols-3    '>
                {products.map((item) => {
                    return <Link to={`/productOverview/${item._id}`} key={item._id}> <ProductCard
                        title={item.title}
                        price={item.price}
                        description={item.description}
                        category={item.category.name}
                        image={item.AdditionalImages[1]}
                        rating={item.rating}
                        discountPercentage={item.discountPercentage}

                    /></Link>

                })}
            </div>

            {/* pagination */}
            {products.length > 0 && <div>
                <Pagination />
            </div>
            }
        </div>
    )
}

export default ProductGrid
