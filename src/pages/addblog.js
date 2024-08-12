import { React, useEffect, useState } from "react";
import Custominput from "../components/customInput";
// import { InboxOutlined } from '@ant-design/icons';
import Dropzone from 'react-dropzone';
import { DeleteImg, uploadImg } from "../features/upload/uploadSlice";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
// import { useDispatch, useSelector } from "react-redux";
import { useField, useFormik } from 'formik';
import * as Yup from 'yup';
import { createBlog, getABlog, resetState, updateABlog } from "../features/blogs/blogSlice";
import { useNavigate, useLocation } from "react-router-dom";
import { getBlogcategories } from "../features/blogcategory/blogcategorySlice";



let schema = Yup.object().shape({
  title: Yup.string().required('Title is Required'),
  description: Yup.string().required('Description is Required'),
  blogcategory: Yup.string().required('Category is Required'),
});


const Addblog = () => {

    // const [description, setDescription] = useState();
    // const handleDescription = (e) => {
    //     console.log(e);
    // };
    
    const dispatch = useDispatch();
    const location = useLocation();
    const getBlogId = location.pathname.split('/')[3];
    const navigate = useNavigate();

    useEffect(()=> {
        if (getBlogId !== undefined){
            dispatch(getABlog(getBlogId));
            images.push(blogImage)
        }else{
            dispatch(resetState());
        }
    }, [getBlogId]);

    useEffect(()=> {
        dispatch(resetState());
        dispatch(getBlogcategories());
    },[]);

    const [images, setImages] = useState([]); 
    const [description, setDescription] = useState();


    const imageState = useSelector ((state)=> state.upload.images);
    const blogcategoryState = useSelector((state) => state.blogcategory.bcategories);
    const blogState = useSelector((state) => state.blogs);

    // const newBlog = useSelector ((state)=> state.product);
    const {isSuccess, isError, isLoading, createblogs, updateaBlog, blogName, blogDescription, blogCategory, blogImage} = blogState;
    useEffect(()=>{
        if(isSuccess && createblogs){
            toast.success('Blog Added Successfully!');

        }if(isSuccess && updateaBlog){
            toast.success('Blog Updated Successfully!');
                navigate("../../admin/blog-list");
        
        }if(isError){
            toast.error('Something Went Wrong!');
        }
    },[isSuccess, isError, isLoading]);

    const img = [];
    imageState.forEach((i) => {
        img.push({
            public_id: i.public_id,
            url:i.url,
        });
    });

    useEffect(()=> {
        formik.values.images = img;
    },[blogImage]);

    const formik = useFormik({
        enableReinitialize:true,
        initialValues: {
            title: blogName || '',
            description: blogDescription || '',
            procategory: blogCategory || '',
            images: '',
        },
        validationSchema:schema,
        onSubmit: (values) => {
            if(getBlogId !== undefined){
                const data = {id: getBlogId, blogData: values};
                dispatch(updateABlog(data));
                dispatch(resetState());
            } else {
                dispatch(createBlog(values));
                formik.resetForm();
                setTimeout(()=> {
                    dispatch(resetState());
                }, 300);
            }
        },
    });
    
    
    const handleDescription = (e) => {
        setDescription(e);
        // console.log(e);
    };


    return(
        <>
           <div>
                <h3 className="mb-4 title">
                {getBlogId !== undefined ? "Edit" : "Add"} Blog
                </h3>

                <div>
                    <form 
                    action=""
                    onSubmit={formik.handleSubmit}
                    >
                      <div className="mt-4">
                        <Custominput 
                          type="text" 
                          label="Enter Blog Title"
                          name="title"
                          value={formik.values.title}
                            onChange = {formik.handleChange("title")}
                            onBlur={formik.handleBlur("title")}/>
                      </div>  
                      <div className="error">
                            {formik.touched.title && formik.errors.title}
                        </div>

                      <select 
                      id="" 
                      className="form-control py-3 mb-3 mt-3"
                      value={formik.values.blogcategory}
                      name="blogcategory"
                      onChange = {formik.handleChange("blogcategory")}
                      onBlur={formik.handleBlur("blogcategory")}
                      >
                          <option value="">Select Blog Category</option>
                            {blogcategoryState.map((i,j)=>{
                                        return(
                                            <option key={j} value={i.title}>
                                                {i.title}
                                            </option>
                                        );
                                })}

                      </select>
                      <div className="error">
                            {formik.touched.blogcategory && formik.errors.blogcategory}
                        </div>

                        <ReactQuill 
                        className="mt-3"
                          theme="snow" 
                          value={formik.values.description}
                            name="description"
                            onChange = {formik.handleChange("description")}
                            // defaultValue = {formik.values.description}
                          // value={description} 
                          // onChange={(evt) => {
                          //   handleDescription(evt.target.value);
                          //   }} 
                        />
                        <div className="error">
                            {formik.touched.description && formik.errors.description}
                        </div>

                        <div className="bg-white border-1 p-5 text-center mt-3">
                            <Dropzone 
                                onDrop={(acceptedFiles)=> dispatch(uploadImg(acceptedFiles))}
                            >
                                {({getRootProps, getInputProps}) => (
                                    <section>
                                        <div
                                            {...getRootProps({
                                            className: 'dropzone',
                                            onDrop: event => event.stopPropagation()
                                            })}
                                        >
                                            <input {...getInputProps()} />
                                            <p>Drag 'n' drop some files here, or click to select files</p>
                                        </div>
                                    </section>
                                )}
                            </Dropzone>
                        </div>

                        <div className="showimages d-flex flex-wrap gap-3">
                            {
                                imageState?.map((i,j)=>{
                                    return (
                                        <div 
                                            className="position-relative " 
                                            key={j}
                                        >
                                            <button 
                                                className="btn-close position-absolute"
                                                type="button"
                                                style={{top:"8px", right:"8px"}}
                                                onClick={()=> dispatch(DeleteImg(i.public_id))}
                                            >
                                            </button>
                                            <img className="mt-3" src={i.url} alt="" width={200} height={200}/>
                                        </div>
                                    );
                                })
                            }
                        </div>

                        <button 
                          className="btn btn-success border-0 rounded-3 my-4"
                          type="submit">
                             {getBlogId !== undefined ? "Edit" : "Add"} Blog
                        </button>
                    </form>
                </div>
           </div>

        </>
    )
};

export default Addblog;