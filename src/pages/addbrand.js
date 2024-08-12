import { React, useEffect, useState } from "react";
import Custominput from "../components/customInput";
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';
import { useNavigate, useLocation } from "react-router-dom";
import { useField, useFormik } from 'formik';
import * as Yup from 'yup';
import { createBrand, getABrand, resetState, updateABrand } from "../features/brand/brandSlice";

let schema = Yup.object().shape({
    title: Yup.string().required('Brand Name is Required'),
  });

const AddBrand = () => {

    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const getBrandId = location.pathname.split('/')[3];
    // console.log(getBrandId);
    const newBrand = useSelector ((state)=> state.brand);
    const {isSuccess, isError, isLoading, createBrands, brandName, updateaBrand} = newBrand;

    useEffect(()=> {
        if (getBrandId !== undefined){
            dispatch(getABrand(getBrandId));
            // formik.values.title = brandName;
        }else{
            dispatch(resetState());
        }
    }, [getBrandId]);

    useEffect(()=>{
        if(isSuccess && createBrands){
            toast.success('Brand Added Successfully!');
        
        }if(isSuccess && updateaBrand){
            toast.success('Brand Updated Successfully!');
            navigate("../../admin/brand-list");

        }if(isError){
            toast.error('Something Went Wrong!');
        }
    },[isSuccess, isError, isLoading]);

    const formik = useFormik({
        enableReinitialize:true,
        initialValues: {
            title: brandName ||"",
        },
        validationSchema:schema,
        
        onSubmit: (values) => {
            if(getBrandId !== undefined){
                const data = {id: getBrandId, brandData: values};
                dispatch(updateABrand(data));
            } else {
                dispatch(createBrand(values));
                formik.resetForm();
                setTimeout(()=> {
                    dispatch(resetState());
                }, 300);
            }
            // alert(JSON.stringify(values));
        },
    });

    return(
        <>
            <div>
                <h3 className="mb-4 title">
                    {getBrandId !== undefined ? "Edit" : "Add"} Brand
                </h3>
                <div>
                    <form 
                        action=""
                        onSubmit={formik.handleSubmit}>
                            <Custominput 
                                type="text" 
                                label="Enter Brand"
                                value={formik.values.title}
                                name="title"
                                onChange = {formik.handleChange("title")}
                                onBlur={formik.handleBlur("title")}
                        />
                        <div className="error">
                            {formik.touched.title && formik.errors.title}
                        </div> 

                        <button 
                          className="btn btn-success border-0 rounded-3 my-4"
                          type="submit">
                          {getBrandId !== undefined ? "Edit" : "Add"} Brand
                        </button>

                    </form>
                </div>
            </div>
       

        </>
    )
};

export default AddBrand;