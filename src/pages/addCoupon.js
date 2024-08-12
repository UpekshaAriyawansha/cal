import { React, useEffect, useState } from "react";
import Custominput from "../components/customInput";
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';
import { useNavigate, useLocation } from "react-router-dom";
import { useField, useFormik } from 'formik';
import * as Yup from 'yup';
import { createCoupon, getACoupon, resetState, updateACoupon } from "../features/coupon/couponSlice";

let schema = Yup.object().shape({
    name: Yup.string().required('Coupon Name is Required'),
    expired: Yup.date().required('Expired Date is Required'),
    discount: Yup.number().required('Discount is Required'),
  });

const AddCoupon = () => {

    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const getCouponId = location.pathname.split('/')[3];
    const newCoupon = useSelector ((state)=> state.coupon);
    const {isSuccess, isError, isLoading, createCoupons, couponName, couponDiscount, couponExpired, updateaCoupon, deleteCoupon} = newCoupon;

    // const changeDateFormet = (date) => {
    //     // const newDate = new Date(date).toLocaleDateString();
    //     const [month, day, year] = date.split('/');
    //     return [year, month, day].join('-');
    // };

    const changeDateFormet = (date) => {
        const newDate = new Date(date).toLocaleDateString();
        const [month, day, year] = newDate.split("/");
        return [year, month, day].join("-");
      };
    // console.log(changeDateFormet(couponExpired) )

    useEffect(()=> {
        if (getCouponId !== undefined){
            dispatch(getACoupon(getCouponId));
        }else{
            dispatch(resetState());
        }
    }, [getCouponId]);


    useEffect(()=>{
        if(isSuccess && createCoupons){
            toast.success('Coupon Added Successfully!');

        }
        
        // if(isSuccess && couponName && couponDiscount && couponExpired){
        //     toast.success('Coupon Updated Successfully!');
    // }
        
        if(isSuccess && updateaCoupon){
            toast.success('Coupon Updated Successfully!');
            navigate("../../admin/coupon-list");

        }if(isError && couponName && couponDiscount && couponExpired){
            toast.error('Something Went Wrong!');
        }
    },[isSuccess, isError, isLoading]);

    const formik = useFormik({
        enableReinitialize:true,
        initialValues: {
            name: couponName || "",
            expired: changeDateFormet(couponExpired) || "",
            // expired: couponExpired || "",
            discount: couponDiscount || "",
        },
        validationSchema:schema,
        onSubmit: (values) => {
            if(getCouponId !== undefined){
                const data = {id: getCouponId, couponData: values};
                dispatch(updateACoupon(data));
            } 

            dispatch(createCoupon(values));
            formik.resetForm();
            setTimeout(()=> {
                dispatch(resetState());
            }, 300);
        },
    });

    return(
        <>
            <div>
                <h3 className="mb-4 title">
                {getCouponId !== undefined ? "Edit" : "Add"} Coupon
                </h3>
                <div>
                    <form 
                        action=""
                        onSubmit={formik.handleSubmit}>
                            <Custominput 
                                type="text" 
                                label="Enter Coupon Name"
                                value={formik.values.name}
                                name="name"
                                onChange = {formik.handleChange("name")}
                                onBlur={formik.handleBlur("name")}
                            />
                            <div className="error">
                                {formik.touched.name && formik.errors.name}
                            </div> 

                            <Custominput 
                                type="date" 
                                label="Enter Expired Date"
                                value={formik.values.expired}
                                name="expired"
                                onChange = {formik.handleChange("expired")}
                                onBlur={formik.handleBlur("expired")}
                            />
                            <div className="error">
                                {formik.touched.expired && formik.errors.expired}
                            </div> 

                            <Custominput 
                                type="number" 
                                label="Enter Discount"
                                value={formik.values.discount}
                                name="discount"
                                onChange = {formik.handleChange("discount")}
                                onBlur={formik.handleBlur("discount")}
                            />
                            <div className="error">
                                {formik.touched.discount && formik.errors.discount}
                            </div> 

                            <button 
                            className="btn btn-success border-0 rounded-3 my-4"
                            type="submit">
                                {getCouponId !== undefined ? "Edit" : "Add"} Coupon
                            </button>

                    </form>
                </div>
            </div>
       

        </>
    )
};

export default AddCoupon;