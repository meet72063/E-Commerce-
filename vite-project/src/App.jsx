import { useState } from "react";
import CatogorySideBar from "./Components/CatogorySideBar";
import Footer from "./Components/Footer";
import Landing from "./Components/Landing";
import Navbar from "./Components/Nav";
import { Outlet } from "react-router-dom";





export default function App() {
  const [openSideBar, setOpenSideBar] = useState(false)



  return (
    <div className='min-h-screen flex flex-col'  >
      <CatogorySideBar {...{ openSideBar, setOpenSideBar }} />
      <Navbar {...{ openSideBar, setOpenSideBar }} />
      <div className="bg-gray-100 flex-grow">
        <div className="sm:px-28 p-8 ">
          <Outlet />
        </div>
      </div>


      <Footer />

    </div>
  )
}