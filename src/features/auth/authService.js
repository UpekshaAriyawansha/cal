import axios from "axios";
import { base_url } from "../../utills/base_url";
import {config} from "../../utills/axiosconfig";

// const getTokenFromLocalStorage = localStorage.getItem('user')? JSON.parse(localStorage.getItem('user')):null;

// const config = {
//     headers:{
//         Authorization: `Bearer ${getTokenFromLocalStorage.token}`,
//         Accept: "application/json",
//     },
// };

const login = async (user) => {
    const response = await axios.post (`${base_url}user/admin-login`, user);
    // console.log(response.data);
    if(response.data){
        localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
};

const getOrders = async () => {
    // console.log(getTokenFromLocalStorage.token);
    const response = await axios.get (`${base_url}user/get-allorders/`,config);
    return response.data;
};

const getaOrder = async (id) => {
    const response = await axios.post (`${base_url}user/get-order-by-user/${id}`, "" ,config);
    return response.data;
};

const authService = {
    login,
    getOrders,
    getaOrder
};
export default authService;


