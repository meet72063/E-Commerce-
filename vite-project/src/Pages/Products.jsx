import React from 'react'
import ProductCard from '../Components/ProductCard'
import { Link } from 'react-router-dom'

const Products = () => {
  return (
    <div className='lg:grid lg:grid-cols-12 gap-10 space-y-5'>


      <div className='space-y-5 lg:col-span-4 py-5'>
        {/* price filter */}
        <div className='h-24 border-[0.1px] shadow-sm shadow-gray-200 rounded-md bg-white'>
          <div className='h-[40%] bg-slate-300 flex items-center pl-8'>
            Price
          </div>
          <div className='flex items-center px-8 h-[60%]'>
            <input type="range" step='10' className='w-full' />
          </div>
        </div>

        {/* Rating  filter */}
        <div className='h-24 border-[0.1px] shadow-sm shadow-gray-200 rounded-md bg-white'>
          <div className='h-[40%] bg-slate-300 flex items-center pl-8'>
            Rating
          </div>
          <div className='flex items-center px-8 h-[60%]'>
            <input type="range" step='10' className='w-full' />
          </div>
        </div>
      </div>



      <div className='lg:col-span-9 lg:col-start-5 space-y-5'>
        <div className='p-6 shadow-sm bg-white shadow-gray-200 bg-slate-100 text-center sm:flex justify-between items-center space-y-2'>
          <h2 >Showing: 10 results from 30</h2>
          <div className='space-x-3 flex items-center justify-center sm:justify-start '>

            <span>sort By</span>
            <div className='py-2 px-4 bg-white text-gray-500 font-light' >price high to low</div>
          </div>
        </div>
        <div className='  grid grid-cols-1 gap-3  sm:grid-cols-2 xl:grid-cols-3   place-items-center '>
          <Link to='/productOverview'> <ProductCard /></Link>
          <Link to='/productOverview'> <ProductCard /></Link>
          <Link to='/productOverview'> <ProductCard /></Link>
          <Link to='/productOverview'> <ProductCard /></Link>
          <Link to='/productOverview'> <ProductCard /></Link>
          <Link to='/productOverview'> <ProductCard /></Link>
          <Link to='/productOverview'> <ProductCard /></Link>
          <Link to='/productOverview'> <ProductCard /></Link>
          <Link to='/productOverview'> <ProductCard /></Link>


        </div>

        {/* pagination */}
        <div>
          pagination will come here
        </div>

      </div>



    </div>
  )
}

export default Products
