import { React, useEffect , useState} from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Table } from 'antd';
import { deleteAProcategory, getProcategories, resetState } from "../features/procategory/procategorySlice";
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

const Categorylist = () => {

  const [open, setOpen] = useState(false);
  const [procategoryId, setprocategoryId] = useState("");

  const showModal = (e) => {
    setOpen(true);
    setprocategoryId(e);
  };
  // console.log(brandId);

  const hideModal = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getProcategories());
  }, []);

  const productcategoryState = useSelector((state) => state.procategory.procategories);
  const data1 = [];
  for (let i = 0; i < productcategoryState.length; i++) {
    data1.push({
      key: i +1,
      title: productcategoryState[i].title,
      action: 
      <>
      <Link 
        className="fs-5 text-danger"
        to={`/admin/category/${productcategoryState[i]._id}`}>
        <FaEdit />
      </Link>

      <button 
        className="ms-3 fs-5 text-danger bg-transparent border-0"
        onClick={()=> showModal(productcategoryState[i]._id)}
        >
        <MdDelete />
      </button>
      </>
    });
  }

  const deleteProCategory = (e) =>{
    dispatch(deleteAProcategory(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getProcategories());
    }, 100);
  }


    return(
        <>
           <div>
                <h3 className="mb-4 title">
                    Product Categories
                </h3>
                <div>
                    <Table 
                        columns={columns} 
                        dataSource={data1} 
                    />
                    <CustomModel 
                      title="Are you sure you want to delete this product category ?"
                      open = {open}
                      hideModal = {hideModal}
                      performAction = {()=> {deleteProCategory(procategoryId)}}
                    />
                </div>
           </div>

        </>
    )
};

export default Categorylist;