import axios from "axios";
import { base_url } from "../../utills/base_url";
import {config} from "../../utills/axiosconfig";

const getEnquiries = async () => {
    const response = await axios.get (`${base_url}enquiry/`);
  
    return response.data;
};

const getaEnquiry = async (id) => {
    const response = await axios.get (`${base_url}enquiry/${id}`, config);
  
    return response.data;
};

const updateEnquiry = async (enquiry) => {
    const response = await axios.put(`${base_url}enquiry/${enquiry.id}`, 
    {status:enquiry.enquiryData}, config);
  
    return response.data;
};

const deleteaEnquiry = async (id) => {
    const response = await axios.delete (`${base_url}enquiry/${id}`, config);
  
    return response.data;
};


const enquiriesService = {
    getEnquiries,
    getaEnquiry,
    updateEnquiry,
    deleteaEnquiry,
};
export default enquiriesService;