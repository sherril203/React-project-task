import React from 'react'
import { Routes, Route } from "react-router";
import Homepage from '../Pages/Home/Homepage';
import Login from '../Pages/UserAuthention/Login';
import SignUp from '../Pages/UserAuthention/SignUp';
import Products from '../Pages/Products/Products';
import Contact from '../Pages/Contact/Contact';
import Profile from '../Pages/user/Profile';
import UserLayout from '../Pages/user/UserLayout';
import User from '../Pages/user/User';
import Cart from '../Pages/Cart/Cart';
import Purchase from '../Pages/Buy products/Purchase';
import Success from '../Pages/Buy products/Success';
import Confirmation from '../Pages/Buy products/Confirmation';
import Orders from '../Pages/Orders/Orders';
const Routers = () => {
  return (
   <Routes>
    <Route path="/" element={<Homepage/>}/>
    <Route path="/contact" element={<Contact/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/Signup" element={<SignUp/>}/>
    <Route path="/products" element={<Products/>} />
    <Route path="/purchase" element={<Purchase/>} />
      <Route path="/confirm" element={<Confirmation/>} />
      
      <Route path="/success" element={<Success/>} />
      <Route path="/user" element={<UserLayout/>}>
      <Route path="/user/dashboard" element={<User/>}/>
      <Route path="profile" element={<Profile/>}/>
      <Route path="cart" element={<Cart/>}/>
      <Route path="orders" element={<Orders/>} />
      </Route>
   </Routes>
  )
}

export default Routers