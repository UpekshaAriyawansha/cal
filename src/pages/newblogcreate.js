// import { React, useEffect, useState } from "react";
// import Custominput from "../components/customInput";
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
// // import { Stepper } from 'react-form-stepper';
// import { InboxOutlined } from '@ant-design/icons';
// import { UploadProps } from 'antd';
// import { message, Upload } from 'antd';


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

// const columns = [
//     {
//       title: "SNo",
//       dataIndex: "key",
//     },
//     {
//       title: "Name",
//       dataIndex: "name",
//     },
//     {
//       title: "Product",
//       dataIndex: "product",
//     },
//     {
//       title: "Status",
//       dataIndex: "staus",
//     },
//   ];
//   const data1 = [];
//   for (let i = 0; i < 46; i++) {
//     data1.push({
//       key: i,
//       name: `Edward King ${i}`,
//       product: 32,
//       staus: `London, Park Lane no. ${i}`,
//     });
//   }
  


// const Addblog = () => {

//     const [description, setDescription] = useState();
//     const handleDescription = (e) => {
//         console.log(e);
//     };


//     return(
//         <>
//            <div>
//                 <h3 className="mb-4 title">
//                     Add Blog
//                 </h3>

//                 {/* <Stepper
//                   steps={[
//                     { label: 'Add Blog Details' },
//                     { label: 'Upload Images' }, 
//                     { label: 'Finish' }
//                   ]}
//                   activeStep={1}
//                 /> */}

//                 <div>
//                     <form action="">

//                       <Dragger {...props}>
//                         <p className="ant-upload-drag-icon">
//                           <InboxOutlined />
//                         </p>
//                         <p className="ant-upload-text">Click or drag file to this area to upload</p>
//                         <p className="ant-upload-hint">
//                           Support for a single or bulk upload. Strictly prohibited from uploading company data or other
//                           banned files.
//                         </p>
//                       </Dragger>

//                       <div className="mt-4">
//                         <Custominput 
//                           type="text" 
//                           label="Enter Blog Title"/>
//                       </div>                        
//                       <select name="" id="" className="form-control py-3 mb-3">
//                           <option value="">Select Blog Category</option>

//                       </select>

//                         <ReactQuill 
//                           theme="snow" 
//                           value={description} 
//                           onChange={(evt) => {
//                             handleDescription(evt.target.value);
//                             }} 
//                         />

//                         <button 
//                           className="btn btn-success border-0 rounded-3 my-4"
//                           type="submit">
//                           Add Blog
//                         </button>
//                     </form>
//                 </div>
//            </div>

//         </>
//     )
// };

// export default Addblog;