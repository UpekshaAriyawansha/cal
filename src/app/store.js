import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import customerReducer from "../features/customers/customerSlice";
import productReducer from "../features/product/productSlice";
import brandReducer from "../features/brand/brandSlice";
import blogReducer from "../features/blogs/blogSlice";
import procategoryReducer from "../features/procategory/procategorySlice";
import blogcategoryReducer from "../features/blogcategory/blogcategorySlice";
import colorReducer from "../features/color/colorSlice";
import enquiriesReducer from "../features/enquiries/enquiriesSlice";
import uploadReducer from "../features/upload/uploadSlice";
import couponReducer from "../features/coupon/couponSlice";


export const store = configureStore ({
    reducer:{
        auth: authReducer,
        customer: customerReducer,
        product: productReducer,
        brand: brandReducer,
        blogs: blogReducer,
        procategory: procategoryReducer,
        blogcategory: blogcategoryReducer,
        colors: colorReducer,
        enquiries: enquiriesReducer,
        upload: uploadReducer,
        coupon: couponReducer,
    },
});
