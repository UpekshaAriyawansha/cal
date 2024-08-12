import { React, useEffect, useState } from "react";
import Custominput from "../components/customInput";
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';
import { createPath, useNavigate, useLocation } from "react-router-dom";
import { useField, useFormik } from 'formik';
import * as Yup from 'yup';
import { createProcategories, getAProcategory, resetState, updateAProcategory } from "../features/procategory/procategorySlice";

let schema = Yup.object().shape({
    title: Yup.string().required('Product Category is Required'),
  });


const AddCategory = () => {
  
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const getCategoryId = location.pathname.split('/')[3];
    const newProcategory = useSelector(state => state.createcategory);
    const { isSuccess, isError, isLoading, createcategory, categoryName, updateacategory} = newProcategory || {};

    useEffect(()=> {
        if (getCategoryId !== undefined){
            dispatch(getAProcategory(getCategoryId));
            // formik.values.title = brandName;
        }else{
            dispatch(resetState());
        }
    }, [getCategoryId]);

    useEffect(()=>{
        if(isSuccess && createcategory){
            toast.success('Product Category Added Successfully!');
        
        }if(isSuccess && updateacategory){
            toast.success('Product Category Updated Successfully!');
            navigate("../../admin/category-list");

        }if(isError){
            toast.error('Something Went Wrong!');
        }
    },[isSuccess, isError, isLoading]);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            title: categoryName || "",
        },
        validationSchema:schema,

        onSubmit: (values) => {
            if(getCategoryId !== undefined){
                const data = {id: getCategoryId, categoryData: values};
                dispatch(updateAProcategory(data));
                dispatch(resetState());
            } else {
                dispatch(createProcategories(values));
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
                    {getCategoryId !== undefined ? "Edit" : "Add"} Product Category
                </h3>
                <div>
                    <form 
                    action=""
                    onSubmit={formik.handleSubmit}>
                       <Custominput 
                            type="text" 
                            label="Enter Category"
                            value={formik.values.title}
                            name="title"
                            onChange = {formik.handleChange("title")}
                            onBlur={formik.handleBlur("title")}/>

                        <div className="error">
                            {formik.touched.title && formik.errors.title}
                        </div>
                         
                        <button 
                          className="btn btn-success border-0 rounded-3 my-4"
                          type="submit">
                            {getCategoryId !== undefined ? "Edit" : "Add"} Product Category
                        </button>

                    </form>
                </div>
            </div>
       

        </>
    )
};

export default AddCategory;