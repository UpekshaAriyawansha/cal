import React, { useEffect, useState } from "react";
import { Table } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { deleteABlog, getBlogs, resetState } from "../features/blogs/blogSlice";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import CustomModel from "../components/customModal";

const columns = [
    {
      title: "SNo",
      dataIndex: "key",
    },
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Action",
      dataIndex: "action",
    },
  ];
  

const Bloglist = () => {

  
  const [open, setOpen] = useState(false);
  const [blogId, setblogId] = useState("");

  const showModal = (e) => {
    setOpen(true);
    setblogId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(resetState());
    dispatch(getBlogs());
  }, []);

  const getBlogState = useSelector ((state)=> state.blogs.blogs);
  const data1 = [];
  for (let i = 0; i < getBlogState.length; i++) {
    data1.push({
      key: i+1,
      title: getBlogState[i].title,
      category: getBlogState[i].category,
      action: 
      <>
        <Link 
          className="fs-5 text-danger"
          to={`/admin/blogs/${getBlogState[i]._id}`}>
          <FaEdit />
        </Link>

        <button 
          className="ms-3 fs-5 text-danger bg-transparent border-0"
          onClick={()=> showModal(getBlogState[i]._id)}
          >
          <MdDelete />
        </button>
        </>
    });
  }

  const deleteBlog = (e) =>{
    dispatch(deleteABlog(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getBlogs());
    }, 100);
  }
  

    return(
        <>
           <div>
                <h3 className="mb-4 title">
                    Blogs List
                </h3>
                <div>
                    <Table 
                        columns={columns} 
                        dataSource={data1} 
                    />
                </div>

                <CustomModel 
                  title="Are you sure you want to delete this blog?"
                  open = {open}
                  hideModal = {hideModal}
                  performAction = {()=> {deleteBlog(blogId)}}
                />
           </div>

        </>
    )
};

export default Bloglist;