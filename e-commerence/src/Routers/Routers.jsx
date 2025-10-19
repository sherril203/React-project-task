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
import ProductInfo from '../Pages/Products/ProductInfo';
import Dashboard from '../Pages/Admin Page/Dashboard';
import AdminOrders from '../Pages/Admin Page/AdminOrders';
import Adminlogin from '../Pages/Admin Page/Adminlogin';
import AdminSign from '../Pages/Admin Page/AdminSign';
import AdminProfile from '../Pages/Admin Page/AdminProfile';
import AdminLayout from '../Pages/Admin Page/AdminLayout';
import AdminRouters from '../Pages/Admin Page/AdminRouters';
import Wishlist from '../Pages/Wishlist/Wishlist';
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
       <Route path="/product/:id" element={<ProductInfo/>} />

      <Route path="/user" element={<UserLayout/>}>
      <Route path="/user/dashboard" element={<User/>}/>
      <Route path="profile" element={<Profile/>}/>
      <Route path="cart" element={<Cart/>}/>
      <Route path="orders" element={<Orders/>} />
      <Route path="wishlist" element={<Wishlist/>}/>
      </Route>
       <Route path="/admin" element={
          <AdminRouters >
            <AdminLayout />
          </AdminRouters>}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="orders" element={<AdminOrders />} />
        </Route>

        <Route path="/admin/profile" element={<AdminProfile/>}/>
        <Route path="/adminlogin" element={<Adminlogin />} />
        <Route path="/adminRegister" element={<AdminSign />} />
   </Routes>
  )
}

export default Routers