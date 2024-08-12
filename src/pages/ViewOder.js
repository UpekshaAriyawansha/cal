import { React, useEffect , useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from 'react-toastify';
import { Link } from "react-router-dom";
import { getAEnquiry, resetState, updateAEnquiry } from "../features/enquiries/enquiriesSlice";
import { IoIosArrowRoundBack } from "react-icons/io";
import { getOrderByUser } from "../features/auth/authSlice";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Table } from 'antd';

const columns = [
    {
      title: "SNo",
      dataIndex: "key",
    },
    {
      title: "Product Name",
      dataIndex: "name",
    },
    {
        title: "Brand",
        dataIndex: "brand",
      },
    {
        title: "Count",
        dataIndex: "count",
      },
    {
      title: "Color",
      dataIndex: "color",
    },
    {
      title: "Amount",
      dataIndex: "amount",
    },
    {
      title: "Date",
      dataIndex: "date",
    },
    {
      title: "Action",
      dataIndex: "action",
    },
  ];

const Vieworder = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const userId = location.pathname.split('/')[3];

    useEffect(() => {
        dispatch (getOrderByUser(userId));
    },[]);

    const ordersState = useSelector((state) => state.auth.orderbyuser[0].products);
    console.log(ordersState);

    const goBack = () => {
        navigate(-1);
    }

    const data1 = [];
    for (let i = 0; i < ordersState.length; i++) {
        data1.push({
        key: i+1,
        name: ordersState[i].product.title,
        brand: ordersState[i].product.brand,
        count: ordersState[i].product.count,
        amount: ordersState[i].product.price,
        color: ordersState[i].product.color,
        date: ordersState[i].product.createdAt,
        action: 
            <>
            <Link className="fs-5 text-danger"
                to="/">
                <FaEdit />
            </Link>

            <Link className="ms-3 fs-5 text-danger"
                to="/">
                <MdDelete />
            </Link>
            </>
    });
  }




    return(
        <>
           <div>
                <div className="d-flex justify-content-between align-items-center">
                    <h3 className="mb-4 title">
                        View User Order
                    </h3>
                    <button 
                        className="bg-transpatent border-0 fs-6 mb-0 d-flex align-items-center gap-1"
                        onClick={goBack}>
                            <IoIosArrowRoundBack className="fs-6" /> Go Back
                    </button>
                </div>
                <div>
                    <Table 
                        columns={columns} 
                        dataSource={data1} 
                    />
                </div>
                
           </div>

        </>
    )
};

export default Vieworder;