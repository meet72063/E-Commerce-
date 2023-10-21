import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Landing from './Components/Landing.jsx'
import Products from './Pages/Products.jsx'
import ProductOverView from './Pages/ProductOverView.jsx'
import Cart from './Pages/Cart.jsx'
import SignUp from './Pages/SignUpPage.jsx'
import LoginPage from './Pages/LoginPage.jsx'
import { Provider } from 'react-redux'
import { store } from './Store.js/store.js'
import Success from './Pages/Success.jsx'
import CheckOutFailedPage from './Pages/CheckOutFailed.jsx'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,

    children: [
      {
        index: true,
        element: <Landing />
      },
      {
        path: "products",
        element: <Products />
      },
      {
        path: "/productOverview/:id",
        element: <ProductOverView />
      }, {
        path: "cart",
        element: <Cart />
      }, {
        path: 'login',
        element: <LoginPage />
      },
      {
        path: 'signUp',
        element: <SignUp />
      },
      {
        path: 'success',
        element: <Success />
      },
      {
        path: 'failed',
        element: <CheckOutFailedPage />
      },

    ],

  }
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>



  </React.StrictMode>,
)
