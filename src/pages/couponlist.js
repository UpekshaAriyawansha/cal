import { React, useEffect , useState} from "react";
import { Table } from 'antd';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { deleteACoupon, getCoupons, resetState } from "../features/coupon/couponSlice";
import CustomModel from "../components/customModal";


const columns = [
    {
      title: "SNo",
      dataIndex: "key",
    },
    {
      title: "Coupon Name",
      dataIndex: "name",
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
        title: "Discount",
        dataIndex: "discount",
        sorter: (a, b) => a.discount - b.discount,
      },
      {
        title: "Expired Date",
        dataIndex: "expired",
        sorter: (a, b) => a.name.length - b.name.length,
      },
    {
      title: "Action",
      dataIndex: "action",
    },
  ];

const Couponlist = () => {

  const [open, setOpen] = useState(false);
  const [couponId, setcouponId] = useState("");

  const showModal = (e) => {
    setOpen(true);
    setcouponId(e);
  };
  // console.log(brandId);

  const hideModal = () => {
    setOpen(false);
  };


  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getCoupons());
  }, []);

  const couponState = useSelector((state) => state.coupon.coupons);
  const data1 = [];
  for (let i = 0; i < couponState.length; i++) {
    data1.push({
      key: i +1,
      name: couponState[i].name,
      expired: new Date(couponState[i].expired).toLocaleString(),
      discount: couponState[i].discount,
      action: 
      <>
      <Link 
        className="fs-5 text-danger"
        to={`/admin/coupon/${couponState[i]._id}`}>
        <FaEdit />
      </Link>

      <button 
        className="ms-3 fs-5 text-danger bg-transparent border-0"
        onClick={()=> showModal(couponState[i]._id)}
        >
        <MdDelete />
      </button>
      </>
    });
  }

  const deleteCoupons = (e) =>{
    dispatch(deleteACoupon(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getCoupons());
    }, 100);
  }
  
  
    return(
        <>
           <div>
                <h3 className="mb-4 title">
                    Coupon List
                </h3>
                <div>
                    <Table 
                        columns={columns} 
                        dataSource={data1} 
                    />
                </div>
                <CustomModel 
                  title="Are you sure you want to delete this coupon?"
                  open = {open}
                  hideModal = {hideModal}
                  performAction = {()=> {deleteCoupons(couponId)}}
                />
           </div>

        </>
    )
};


export default Couponlist;