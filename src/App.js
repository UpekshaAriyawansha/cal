import './App.css';
import React from "react";

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from './pages/login';
import Resetpassword from './pages/resetPassword';
import Forgotpassword from './pages/forgotpassword';
import Mainlayout from './components/mainLayout';
import Dashboard from './pages/dashboard';
import Enquiries from './pages/enquiries';
import Bloglist from './pages/bloglist';
import Blogcategorylist from './pages/blogcategorylist';
import Orders from './pages/orders';
import Customers from './pages/customers';
import Colorlist from './pages/colorlist';
import Categorylist from './pages/categorylist';
import Brandlist from './pages/brandlist';
import Productlist from './pages/productlist';
import Addblog from './pages/addblog';
import AddblogCategorylist from './pages/addblogcategorylist';
import AddColor from './pages/addcolor';
import AddCategory from './pages/addcategory';
import AddBrand from './pages/addbrand';
import AddProduct from './pages/addproduct';
import AddCoupon from './pages/addCoupon';
import Couponlist from './pages/couponlist';
import Viewenquiry from './pages/ViewEnquiry';
import Vieworder from './pages/ViewOder';


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/reset-password' element={<Resetpassword/>}/>
        <Route path='/forgot-password' element={<Forgotpassword/>}/>
        <Route path='/admin' element={<Mainlayout/>}>
            <Route index element={<Dashboard/>}/>
            <Route path='enquiries' element={<Enquiries/>}/>
            <Route path='enquiry/:id' element={<Viewenquiry/>}/>
            <Route path='blog-list' element={<Bloglist/>}/>
            <Route path='blogs' element={<Addblog/>}/>
            <Route path='blogs/:id' element={<Addblog/>}/>
            <Route path='coupon-list' element={<Couponlist/>}/>
            {/* git add */}
            <Route path='coupon' element={<AddCoupon/>}/>
            <Route path='coupon/:id' element={<AddCoupon/>}/>
            <Route path='blog-category' element={<AddblogCategorylist/>}/>
            <Route path='blog-category/:id' element={<AddblogCategorylist/>}/>
            <Route path='blog-category-list' element={<Blogcategorylist/>}/>
            <Route path='orders' element={<Orders/>}/>
            <Route path='customers' element={<Customers/>}/>
            <Route path='color-list' element={<Colorlist/>}/>
            <Route path='color' element={<AddColor/>}/>
            <Route path='color/:id' element={<AddColor/>}/>
            <Route path='category-list' element={<Categorylist/>}/>
            <Route path='category' element={<AddCategory/>}/>
            <Route path='category/:id' element={<AddCategory/>}/>
            <Route path='brand-list' element={<Brandlist/>}/>
            <Route path='brand' element={<AddBrand/>}/>
            <Route path='brand/:id' element={<AddBrand/>}/>
            <Route path='product-list' element={<Productlist/>}/>
            <Route path='product' element={<AddProduct/>}/>
            <Route path='orders' element={<Orders/>}/>
            <Route path='orders/:id' element={<Vieworder/>}/>
        </Route>

      </Routes>
    </Router>
  );
}

export default App;
