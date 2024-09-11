import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Homes from './Pages/Homes/Homes'
import Carts from './Pages/Carts/Carts'
import PlaceOrders from './Pages/PlaceOrders/PlaceOrders'
import Footer from './components/Footer/Footer'
import LoginPopup from './components/LoginPopup/LoginPopup'
import MyOrders from './Pages/MyOrders/MyOrders'




const App = () => {

  const [showLogin , setShowlogin] = useState(false)
  return (
    <>
    {showLogin?<LoginPopup setShowlogin={setShowlogin}/>:<></>}
    <div className='app'>
      <Navbar setShowlogin={setShowlogin}/>
      <Routes>
        <Route path='/' element={<Homes/>}/>
        <Route path='/cart' element={<Carts/>}/>
        <Route path='/order' element={<PlaceOrders/>}/>
       
        <Route path='/myorders' element={<MyOrders/>}/>
     


      </Routes>
    </div>
    <Footer/>

    </>

  )
}

export default App