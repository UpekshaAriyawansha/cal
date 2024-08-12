import { React, useEffect , useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from 'react-toastify';
import { Link } from "react-router-dom";
import { getAEnquiry, resetState, updateAEnquiry } from "../features/enquiries/enquiriesSlice";
import { IoIosArrowRoundBack } from "react-icons/io";

const Viewenquiry = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const getEnquiryId = location.pathname.split('/')[3];
    const enquiryState = useSelector((state) => state.enquiries);
    const {enquiryName, enquiryEmail, enquiryMobile, enquiryComment, enquiryStatus} = enquiryState;
   
    useEffect(() => {
        dispatch (getAEnquiry(getEnquiryId));
    },[getEnquiryId]);

    const goBack = () => {
        navigate(-1);
    }


    const setEnquiryStatus = (e,i) => {
        console.log(e,i);
        const data = {id:i, enquiryData:e};
        dispatch(updateAEnquiry(data));
        dispatch(resetState());
        setTimeout(() => {
            dispatch (getAEnquiry(getEnquiryId));
        }, 100);
      };

    return(
        <>
           <div>
                <div className="d-flex justify-content-between align-items-center">
                    <h3 className="mb-4 title">
                        View Enquiry
                    </h3>
                    <button 
                        className="bg-transpatent border-0 fs-6 mb-0 d-flex align-items-center gap-1"
                        onClick={goBack}>
                            <IoIosArrowRoundBack className="fs-6" /> Go Back
                    </button>
                </div>
                
                <div className="mt-5 bg-white p-4 rounded-3 d-flex gap-3 flex-column">
                    <div className="d-flex align-items-center gap-3">
                        <h5 className="mb-0">
                            Name :
                        </h5>
                        <p className="mb-0">
                            {enquiryName}
                        </p>
                    </div>

                    <div className="d-flex align-items-center gap-3">
                        <h5 className="mb-0">
                            Email :
                        </h5>
                        <p className="mb-0">
                            <a href={`mailto:{enquiryEmail}`}>{enquiryEmail}</a>
                        </p>
                    </div>

                    <div className="d-flex align-items-center gap-3">
                        <h5 className="mb-0">
                            Mobile No :
                        </h5>
                        <p className="mb-0">
                            <a href={`tel:+94${enquiryMobile}`}>{enquiryMobile}</a>
                        </p>
                    </div>

                    <div className="d-flex align-items-center gap-3">
                        <h5 className="mb-0">
                            Comment :
                        </h5>
                        <p className="mb-0">
                            {enquiryComment}
                        </p>
                    </div>

                    <div className="d-flex align-items-center gap-3">
                        <h5 className="mb-0">
                            Status :
                        </h5>
                        <p className="mb-0">
                            {enquiryStatus}
                        </p>
                    </div>

                    <div className="d-flex align-items-center gap-3">
                        <h5 className="mb-0">
                            Change Status :
                        </h5>
                        <div>
                            <select 
                                className="from-control form-select"
                                name=""
                                defaultValue={enquiryStatus? enquiryStatus: "Submitted"}
                                onChange={(e) => setEnquiryStatus(e.target.value, getEnquiryId)}
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
                        </div>
                    </div>
  

                </div>
           </div>

        </>
    )
};

export default Viewenquiry;