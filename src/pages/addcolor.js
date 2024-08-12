import { React, useEffect, useState } from "react";
import Custominput from "../components/customInput";
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';
import { createPath, useNavigate, useLocation } from "react-router-dom";
import { useField, useFormik } from 'formik';
import * as Yup from 'yup';
import { createColors, getAColor, resetState, updateAColor } from "../features/color/colorSlice";

let schema = Yup.object().shape({
    title: Yup.string().required('Product Color is Required'),
  });

const AddColor = () => {

    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const getColorId = location.pathname.split('/')[3];
    const newColor = useSelector(state => state.createColor);
    const { isSuccess, isError, isLoading, createColor, colorName, updateacolor } = newColor || {};

    useEffect(()=> {
        if (getColorId !== undefined){
            dispatch(getAColor(getColorId));
        }else{
            dispatch(resetState());
        }
    }, [getColorId]);


    useEffect(()=>{
        if(isSuccess && createColor){
            toast.success("Color Added Successfullly!");

        }if(isSuccess && updateacolor){
            toast.success('Color Updated Successfully!');
            navigate("../../admin/color-list");

        }if(isError){
            toast.error('Something Went Wrong!');
        }
    },[isSuccess, isError, isLoading]);

    const formik = useFormik({
        enableReinitialize:true,
        initialValues: {
            title: colorName || "",
        },
        validationSchema:schema,

        onSubmit: (values) => {
            if(getColorId !== undefined){
                const data = {id: getColorId, colorData: values};
                dispatch(updateAColor(data));
            } else {
                dispatch(createColors(values));
                formik.resetForm();
                setTimeout(()=> {
                    dispatch(resetState());
                }, 300);
            }
        },
    });


    return(
        <>
            <div>
                <h3 className="mb-4 title">
                {getColorId !== undefined ? "Edit" : "Add"} Color
                </h3>
                <div>
                    <form 
                    action=""
                    onSubmit={formik.handleSubmit}>
                    
                        <Custominput 
                            type="color"  
                            label="Enter Color"
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
                          {getColorId !== undefined ? "Edit" : "Add"} Color
                        </button>

                    </form>
                </div>
            </div>
       

        </>
    )
};

export default AddColor;