import { React, useEffect , useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import {AiOutlineEye } from "react-icons/ai";
import { Table } from 'antd';
import { deleteAEnquiry, getAEnquiry, getEnquiries, resetState, updateAEnquiry } from "../features/enquiries/enquiriesSlice";
import CustomModel from "../components/customModal";

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
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Mobile",
      dataIndex: "mobile",
    },
    {
      title: "Comment",
      dataIndex: "comment",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Action",
      dataIndex: "action",
    },
  ];
  

const Enquiries = () => {

  const [open, setOpen] = useState(false);
  const [enquiryId, setenquiryId] = useState("");

  const showModal = (e) => {
    setOpen(true);
    setenquiryId(e);
  };
  const hideModal = () => {
    setOpen(false);
  };


  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(resetState());
    dispatch(getEnquiries());
  }, []);

  const enquiriesState = useSelector ((state)=> state.enquiries.enquiries);
  const data1 = [];
  for (let i = 0; i < enquiriesState.length; i++) {
    data1.push({
      key: i+1,
      name: enquiriesState[i].name,
      email: enquiriesState[i].email,
      mobile : enquiriesState[i].mobile,
      comment: enquiriesState[i].comment,
      status: (
        <>
          <select 
          className="from-control form-select"
          name=""
          defaultValue={enquiriesState[i].status ? enquiriesState[i].status : "Submitted"}
          onChange={(e) => setEnquiryStatus(e.target.value, enquiriesState[i]._id)}

          >
              <option value="Submitted">
                  Submitted
              </option>
              <option value="Contacted">
                  Contacted
              </option>
              <option value="In prograss">
                  In prograss
              </option>
              <option value="Resolved">
                  Resolved
              </option>
          </select>    
        </>
      ),

      action: 
      <>
      <Link className="ms-3 fs-5 text-danger"
        to={`/admin/enquiry/${enquiriesState[i]._id}`}>
        <AiOutlineEye />
      </Link>

      <button 
          className="ms-3 fs-5 text-danger bg-transparent border-0"
          onClick={()=> showModal(enquiriesState[i]._id)}
          >
          <MdDelete />
      </button>
      </>
    });
  }

  const setEnquiryStatus = (e,i) => {
    console.log(e,i);
    const data = {id:i, enquiryData:e};
    dispatch(updateAEnquiry(data));
  }

  const deleteEnquiry = (e) =>{
    dispatch(deleteAEnquiry(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getEnquiries());
    }, 100);
  }


    return(
        <>
           <div>
                <h3 className="mb-4 title">
                    Enquiries
                </h3>
                <div>
                    <Table 
                    columns={columns} 
                    dataSource={data1} 
                    />
                </div>
                <CustomModel 
                  title="Are you sure you want to delete this enquiry?"
                  open = {open}
                  hideModal = {hideModal}
                  performAction = {()=> {deleteEnquiry(enquiryId)}}
                />
           </div>

        </>
    )
};

export default Enquiries;