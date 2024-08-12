import { React, useEffect, useState } from "react";
import Custominput from "../components/customInput";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useField, useFormik } from 'formik';
import * as Yup from 'yup';
import { InboxOutlined } from '@ant-design/icons';
import { UploadProps } from 'antd';
import { message, Upload } from 'antd';
import { getBrands } from "../features/brand/brandSlice";
import { getProcategories } from "../features/procategory/procategorySlice";
import { getColors } from "../features/color/colorSlice";
import Multiselect from "react-widgets/Multiselect";
import "react-widgets/styles.css";
// import { useField } from "formik";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";



import Dropzone from 'react-dropzone';



import { useDispatch, useSelector } from "react-redux";
import { DeleteImg, uploadImg } from "../features/upload/uploadSlice";
import { ToastContainer, toast } from 'react-toastify';
import { createProducts } from "../features/product/productSlice";



// const { Dragger } = Upload;
// const props = {
//   name: 'file',
//   multiple: true,
//   action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
//   onChange(info) {
//     const { status } = info.file;
//     if (status !== 'uploading') {
//       console.log(info.file, info.fileList);
//     }
//     if (status === 'done') {
//       message.success(`${info.file.name} file uploaded successfully.`);
//     } else if (status === 'error') {
//       message.error(`${info.file.name} file upload failed.`);
//     }
//   },
//   onDrop(e) {
//     console.log('Dropped files', e.dataTransfer.files);
//   },
// };



let schema = Yup.object().shape({
    title: Yup.string().required('Title is Required'),
    description: Yup.string().required('Description is Required'),
    price: Yup.number().required('Price is Required'),
    brand: Yup.string().required('Brand is Required'),
    procategory: Yup.string().required('Category is Required'),
    tags: Yup.string().required('Tags is Required'),
    quantity: Yup.number().required('Quantity is Required'),
    // color: Yup.array().required('Color is Required'),
    color: Yup
        .array()
        .min(1, "Pick at least one color")
        .required('Color is Required'),

  });


const AddProduct = () => {

    // const [field, state,{setValue,setTouched,setDisabled}] = useField('color');


    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [color, setColor] = useState([]); 
    const [images, setImages] = useState([]); 
    const [description, setDescription] = useState();



    useEffect(()=> {
        dispatch(getBrands());
        dispatch(getProcategories());
        dispatch(getColors());
    },[]);

    const brandState = useSelector((state)=> state.brand.brands);
    const procategoryState = useSelector((state) => state.procategory.procategories);
    const colorState = useSelector ((state)=> state.colors.colors);
    const imageState = useSelector ((state)=> state.upload.images);
    const newProduct = useSelector ((state)=> state.product);

    const {isSuccess, isError, isLoading, createProduct} = newProduct;
    useEffect(()=>{
        if(isSuccess && createProduct){
            toast.success('Product Added Successfully!');
        }if(isError){
            toast.error('Something Went Wrong!');
        }
    },[isSuccess, isError, isLoading]);

    // const colors = [];
    // colorState.forEach((i) => {
    //     colors.push({
    //         _id: i._id,
    //         color:i.title,
    //     });
    // });

    const coloropt = [];
    colorState.forEach((i) => {
    coloropt.push({
      label: i.title,
      value: i._id,
    });
  });

    const img = [];
    imageState.forEach((i) => {
        img.push({
            public_id: i.public_id,
            url:i.url,
        });
    });

    useEffect(()=> {
        formik.values.color = color ? color: "";
        formik.values.images = images;
    },[color,images]);

    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            price:'',
            brand:'',
            procategory:'',
            tags:'',
            color:'',
            quantity:'',
            images:'',
        },
        validationSchema:schema,
        onSubmit: (values) => {
            // alert(JSON.stringify(values));
            dispatch(createProducts(values));
            formik.resetForm();
            setColor(null);
            setTimeout(()=> {
                navigate("../../admin/product-list");
            }, 3000);
        },
    });
    
    
    const handleDescription = (e) => {
        setDescription(e);
        // console.log(e);
    };

    const handleColors = (e) => {
        setColor(e);
        // console.log(color);
      };

    return(
        <>
            <div>
                <h3 className="mb-4 title">
                    Add Product
                </h3>
                <div>
                    <form 
                        className="d-flex gap-3 flex-column"
                        onSubmit={formik.handleSubmit}
                    >

                        <Custominput 
                            type="text" 
                            label="Enter Product Title"
                            value={formik.values.title}
                            name="title"
                            onChange = {formik.handleChange("title")}
                            onBlur={formik.handleBlur("title")}
                        />
                        <div className="error">
                            {formik.touched.title && formik.errors.title}
                        </div>

                        <div className="">
                            <ReactQuill 
                            theme="snow" 
                            value={formik.values.description}
                            name="description"
                            onChange = {formik.handleChange("description")}
                            />
                        <div className="error">
                            {formik.touched.description && formik.errors.description}
                        </div>
                        </div>

                        <Custominput 
                            type="number" 
                            label="Enter Product Price" 
                            value={formik.values.price}
                            name="price"
                            onChange = {formik.handleChange("price")}
                            onBlur={formik.handleBlur("price")}
                        />
                        <div className="error">
                            {formik.touched.price && formik.errors.price}
                        </div>      
                             
                        <select 
                            className="form-control py-3 mb-3"
                            value={formik.values.brand}
                            name="brand"
                            onChange = {formik.handleChange("brand")}
                            onBlur={formik.handleBlur("brand")}
                        >
                          <option value=""> Select Brand </option>
                            {brandState.map((i,j)=>{
                                return(
                                    <option key={j} value={i.title}>
                                        {i.title}
                                    </option>
                                );
                          })}
                        </select>
                        <div className="error">
                            {formik.touched.brand && formik.errors.brand}
                        </div> 

                        <select 
                            className="form-control py-3 mb-3"
                            value={formik.values.procategory}
                            name="procategory"
                            onChange = {formik.handleChange("procategory")}
                            onBlur={formik.handleBlur("procategory")}
                        >
                          <option value=""> Select Category </option>
                            {procategoryState.map((i,j)=>{
                                    return(
                                        <option key={j} value={i.title}>
                                            {i.title}
                                        </option>
                                    );
                            })}
                        </select>
                        <div className="error">
                            {formik.touched.procategory && formik.errors.procategory}
                        </div>

                        <select 
                            className="form-control py-3 mb-3"
                            value={formik.values.tags}
                            name="tags"
                            onChange = {formik.handleChange("tags")}
                            onBlur={formik.handleBlur("tags")}
                        >
                            <option value="" disabled>Select Category</option>
                            <option value="featured">Featured</option>
                            <option value="popular">Popular</option>
                            <option value="special">Special</option>                                               
                        </select>
                        <div className="error">
                            {formik.touched.tags && formik.errors.tags}
                        </div>
                        
                        {/* <select name="" id="" className="form-control py-3 mb-3">
                          <option value="">Select Color</option>
                        </select> */}
                        
                        {/* <Multiselect
                            name="color"
                            dataKey="id"
                            textField="color"
                            data={colors}
                            value={formik.values.color.color}
                            onChange={(e)=> setColor(e) }
                            onBlur={formik.handleBlur("color")}
                        /> */}

                        <Select
                            mode="multiple"
                            allowClear
                            className="w-100"
                            placeholder="Select colors"
                            defaultValue={color}
                            onChange={(i) => handleColors(i)}
                            options={coloropt}
                        />
                        <div className="error">
                            {formik.touched.color && formik.errors._id}
                        </div>

                        <Custominput 
                            type="number" 
                            label="Enter Product Quantity"value={formik.values.quantity}
                            name="quantity"
                            onChange = {formik.handleChange("quantity")}
                            onBlur={formik.handleBlur("quantity")}
                        />
                        <div className="error">
                            {formik.touched.quantity && formik.errors.quantity}
                        </div>         

                        {/* <Dragger {...props}>
                            <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                            </p>
                            <p className="ant-upload-text">Click or drag file to this area to upload</p>
                            <p className="ant-upload-hint">
                            Support for a single or bulk upload. Strictly prohibited from uploading company data or other
                            banned files.
                            </p>
                        </Dragger> */}

                        <div className="bg-white border-1 p-5 text-center">
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
                                            <img src={i.url} alt="" width={200} height={200}/>
                                        </div>
                                    );
                                })
                            }
                        </div>
   
                        <button 
                          className="btn btn-success border-0 rounded-3 my-4"
                          type="submit">
                          Add Product
                        </button>

                    </form>
                </div>
            </div>
       

        </>
    )
};

export default AddProduct;