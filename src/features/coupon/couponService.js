import axios from "axios";
import { base_url } from "../../utills/base_url";
import {config} from "../../utills/axiosconfig";


const getCoupon = async () => {
    const response = await axios.get (`${base_url}coupon/`,config);
  
    return response.data;
};

const createCoupon = async (coupon) => {
    const response = await axios.post(`${base_url}coupon/`, coupon, config);
  
    return response.data;
  };

const getaCoupon = async (id) => {
    const response = await axios.get (`${base_url}coupon/${id}`, config);
  
    return response.data;
};

const updateCoupon = async (coupon) => {
    const response = await axios.put(`${base_url}coupon/${coupon.id}`, 
    {
        name:coupon.couponData.name,
        expired:coupon.couponData.expired,        
        discount:coupon.couponData.discount,
    },
     config);
  
    return response.data;
};

const deleteaCoupon = async (id) => {
    const response = await axios.delete (`${base_url}coupon/${id}`, config);
  
    return response.data;
};

const couponService = {
    getCoupon,
    createCoupon,
    getaCoupon,
    updateCoupon,
    deleteaCoupon,
};
export default couponService;