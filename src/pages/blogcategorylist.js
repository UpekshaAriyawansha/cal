import { React, useEffect , useState} from "react";
import { Table } from 'antd';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { deleteABlogCat, getBlogcategories, resetState } from "../features/blogcategory/blogcategorySlice";
import CustomModel from "../components/customModal";

const columns = [
    {
      title: "SNo",
      dataIndex: "key",
    },
    {
      title: "Title",
      dataIndex: "title",
      sorter: (a, b) => a.title.length - b.title.length,
    },
  
    {
      title: "Action",
      dataIndex: "action",
    },
  ];

const Blogcategorylist = () => {

  const [open, setOpen] = useState(false);
  const [blogCategoryId, setblogCategoryId] = useState("");

  const showModal = (e) => {
    setOpen(true);
    setblogCategoryId(e);
  };
  // console.log(brandId);

  const hideModal = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getBlogcategories());
  }, []);

  const blogcategoryState = useSelector((state) => state.blogcategory.bcategories);
  const data1 = [];
  for (let i = 0; i < blogcategoryState.length; i++) {
    data1.push({
      key: i +1,
      title: blogcategoryState[i].title,
      action: 
      <>
      <Link 
        className="fs-5 text-danger"
        to={`/admin/blog-category/${blogcategoryState[i]._id}`}>
        <FaEdit />
      </Link>

      <button 
        className="ms-3 fs-5 text-danger bg-transparent border-0"
        onClick={()=> showModal(blogcategoryState[i]._id)}
        >
        <MdDelete />
      </button>
      </>
    });
  }

  const deleteBlogCategory = (e) =>{
    dispatch(deleteABlogCat(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getBlogcategories());
    }, 100);
  }

    return(
        <>
           <div>
                <h3 className="mb-4 title">
                    Blogs Category List
                </h3>
                <div>
                    <Table 
                        columns={columns} 
                        dataSource={data1} 
                    />
                </div>
                <CustomModel 
                  title="Are you sure you want to delete this brand?"
                  open = {open}
                  hideModal = {hideModal}
                  performAction = {()=> {deleteBlogCategory(blogCategoryId)}}
                />
           </div>

        </>
    )
};

export default Blogcategorylist;