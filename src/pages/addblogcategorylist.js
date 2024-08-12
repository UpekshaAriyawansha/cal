import { React, useEffect, useState } from "react";
import Custominput from "../components/customInput";
import { useDispatch, useSelector} from "react-redux";
import { toast } from 'react-toastify';
import { createPath, useNavigate, useLocation} from "react-router-dom";
import { useField, useFormik } from 'formik';
import * as Yup from 'yup';
import { createBlogcategories, getABlogCat, resetState, updateABlogCat } from "../features/blogcategory/blogcategorySlice";

let schema = Yup.object().shape({
    title: Yup.string().required('Blog Category is Required'),
  });



const AddblogCategorylist = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const getBlogCatId = location.pathname.split("/")[3];
    const newBlogcategory = useSelector(state => state.createblogcategory);
    const { 
        isSuccess, 
        isError, 
        isLoading, 
        createblogcategory, 
        blogCatName,
        updatedBlogCategory 
    } = newBlogcategory|| {};


    useEffect(() => {
        if (getBlogCatId !== undefined) {
          dispatch(getABlogCat(getBlogCatId));
        } else {
          dispatch(resetState());
        }
      }, [getBlogCatId]);


    useEffect(()=>{
        if(isSuccess && createblogcategory){
            toast.success('Blog Category Added Successfully!');
        }
        if(isSuccess && updatedBlogCategory) {
            toast.success("Blog Category Updated Successfullly!");
            navigate("/admin/blog-category-list");
          }
        if(isError){
            toast.error('Something Went Wrong!');
        }
    },[isSuccess, isError, isLoading]);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            title: blogCatName || "",
        },
        validationSchema:schema,
        onSubmit: (values) => {
            // alert(JSON.stringify(values));    
            const data = { id: getBlogCatId, blogCatData: values };
            if (getBlogCatId !== undefined) {
              dispatch(updateABlogCat(data));
              dispatch(resetState());
            } else {
                dispatch(createBlogcategories(values));
                formik.resetForm();
                setTimeout(()=> {
                    navigate("../../admin/blog-category-list");
                }, 300);
            }
        },
    });

    return(
        <>
            <div>
                <h3 className="mb-4 title">
                    {/* Add Blog Category */}
                    {getBlogCatId !== undefined ? "Edit" : "Add"} Blog Category
                </h3>
                <div>
                    <form 
                    action=""
                    onSubmit={formik.handleSubmit}>
                    
                        <Custominput 
                            type="text" 
                            label="Enter Blog Category"
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
                          {getBlogCatId !== undefined ? "Edit" : "Add"} Blog Category
                        </button>

                    </form>
                </div>
            </div>
       

        </>
    )
};

export default AddblogCategorylist;