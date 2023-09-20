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


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    // errorElement: <ErrorPage />,

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
        path: "productOverview",
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
      }

    ],
  },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    <RouterProvider router={router} />


  </React.StrictMode>,
)
