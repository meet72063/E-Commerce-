import { useEffect, useState } from "react";
import CatogorySideBar from "./Components/CatogorySideBar";
import Footer from "./Components/Footer";
import Navbar from "./Components/Nav";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { cartSync, getCartAsync, selectCart } from "./Store.js/cart/cartSlice";
import { selectUser, setUser } from "./Store.js/auth/userSlice";
import { fetchBrandsAsync, fetchCategoriesAsync, fetchProductAsync, selectProuduct } from "./Store.js/Product/productsSlice";
import Notification from "./Components/Notification";








export default function App() {
  const [openSideBar, setOpenSideBar] = useState(false)
  const { batchingProduct } = useSelector(selectCart)
  const { user } = useSelector(selectUser)
  const { minPrice, maxPrice, rating, sort, category, brand } = useSelector(selectProuduct)

  const dispatch = useDispatch()


  useEffect(() => {

    //fill  userData from data stored in localStorage on render
    dispatch(setUser())
    //fetch categories and  Brands on initial render
    dispatch(fetchCategoriesAsync())
    dispatch(fetchBrandsAsync())
  }, [])




  //fetch user cart from database on initial on render
  useEffect(() => {
    if (user?._id) {
      dispatch(getCartAsync(user._id))
    }
  }, [user?._id])


  //add batched cart to database after 2 changes
  useEffect(() => {
    if (batchingProduct.length > 1 && user) {
      dispatch(cartSync({ batchingProduct, userId: user._id }))
    }
  }, [batchingProduct.length])

  useEffect(() => {
    dispatch(fetchProductAsync({ minPrice, maxPrice, rating, pageNumber: 1, sort, category, brand }))
  }, [minPrice, maxPrice, rating, sort, category, brand])

  return (
    <div className='min-h-screen flex flex-col'  >
      <Notification />

      <CatogorySideBar {...{ openSideBar, setOpenSideBar }} />
      <Navbar {...{ openSideBar, setOpenSideBar }} />
      <div className="bg-gray-100 flex-grow">

        <Outlet />
      </div>

      <div>

      </div>
      <Footer />
    </div>
  )
}