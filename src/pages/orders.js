import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Table } from 'antd';
import { getOrders } from "../features/auth/authSlice";

const columns = [
    {
      title: "SNo",
      dataIndex: "key",
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Product",
      dataIndex: "product",
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

const Orders = () => {
  
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getOrders());
  }, []);
  const ordersState = useSelector ((state)=> state.auth.orders);
  // console.log(order);
  const data1 = [];
  for (let i = 0; i < ordersState.length; i++) {
    data1.push({
      key: i+1,
      name: ordersState[i].orderby.firstname,
      // product:ordersState[i].products.map((i,j)=> {
      //   return (
      //       <ul key={j}>
      //         <li>{i.product.title}</li>
      //       </ul>
      //   );
      // }),
      product: (
        <Link to={`/admin/orders/${ordersState[i].orderby._id}`}>
          View Orders
        </Link>
      ),
      amount: ordersState[i].paymentIntent.amount,
      date: new Date(ordersState[i].createdAt).toLocaleString(),
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
                <h3 className="mb-4 title">
                    Orders
                </h3>
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

export default Orders;