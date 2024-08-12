import { React, useEffect , useState} from "react";
import { Table } from 'antd';
import { Link } from "react-router-dom";
import { useDispatch, useSelector, } from "react-redux";
import { deleteABrand, getBrands, resetState } from "../features/brand/brandSlice";
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
      sorter: (a, b) => a.title.length - b.title.length,

    },
    {
      title: "Action",
      dataIndex: "action",
    },
  ];

const Brandlist = () => {

  const [open, setOpen] = useState(false);
  const [brandId, setbrandId] = useState("");

  const showModal = (e) => {
    setOpen(true);
    setbrandId(e);
  };
  // console.log(brandId);

  const hideModal = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getBrands());
  }, []);

  const brandState = useSelector((state) => state.brand.brands);
  const data1 = [];
  for (let i = 0; i < brandState.length; i++) {
    data1.push({
      key: i +1,
      title: brandState[i].title,
      action: 
        <>
        <Link 
          className="fs-5 text-danger"
          to={`/admin/brand/${brandState[i]._id}`}>
          <FaEdit />
        </Link>

        <button 
          className="ms-3 fs-5 text-danger bg-transparent border-0"
          onClick={()=> showModal(brandState[i]._id)}
          >
          <MdDelete />
        </button>
        </>
    });  
  }

  const deleteBrand = (e) =>{
    dispatch(deleteABrand(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getBrands());
    }, 100);
  }
  
    return(
        <>
           <div>
                <h3 className="mb-4 title">
                    Brand List
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
                  performAction = {()=> {deleteBrand(brandId)}}
                />
           </div>

        </>
    );
};

export default Brandlist;