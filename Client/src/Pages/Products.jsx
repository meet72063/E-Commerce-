import PriceFilter from '../Components/PriceFilter'
import RatingFilter from '../Components/RatingFilter'
import ProductGrid from '../Components/ProductGrid'
import { useDispatch, useSelector } from 'react-redux'
import { changeFilter, clearFilters, selectProuduct } from '../Store.js/Product/productsSlice'







const Products = () => {

  const { category, brand } = useSelector(selectProuduct)
  const dispatch = useDispatch()

  const handleClearFilters = () => {
    dispatch(clearFilters())
  }
  return (
    <div className="sm:px-28 p-8 ">
      <div className='lg:grid lg:grid-cols-12 gap-10 space-y-5'>


        <div className='space-y-5 lg:col-span-4 py-5'>
          {/* price filter */}
          <PriceFilter />

          {/* Rating  filter */}
          <RatingFilter />
          {category && <div className=' border shadow-sm shadow-gray-200 rounded-md bg-white p-4 flex justify-between'>
            <div className='flex space-x-5 justify-center items-center px-4'>
              <h2 className='text-lg font-semibold'>Category:</h2>
              <p className='font-thin text-red-400 text-lg'> {category} </p>
            </div>

            <button onClick={() => dispatch(changeFilter({ key: 'category', value: '' }))}>X</button>

          </div>}
          {brand && <div className=' border shadow-sm shadow-gray-200 rounded-md bg-white p-4 flex justify-between'>
            <div className='flex space-x-5 justify-center items-center px-4'>
              <h2 className='text-lg font-semibold'>Brand:</h2>
              <p className='font-thin text-red-400 text-lg'> {brand} </p>
            </div>

            <button onClick={() => dispatch(changeFilter({ key: 'brand', value: '' }))}>X</button>

          </div>}

          <button className='p-4 text-md bg-red-300 text-white font-semibold w-full rounded-md ' onClick={handleClearFilters}>Clear Filters</button>
        </div>
        <ProductGrid />
      </div></div>
  )
}


export default Products




