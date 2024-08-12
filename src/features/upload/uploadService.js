import axios from "axios";
import {config} from "../../utills/axiosconfig";
import { base_url } from "../../utills/base_url";

const uploadImg = async (data) => {
    const response = await axios.post(`${base_url}upload/`,data,config);
    return response.data;
};

const DeleteImg = async (id) => {
    const response = await axios.delete(`${base_url}upload/delete-images/${id}`,config);
    return response.data;
};

const uploadService ={
    uploadImg,
    DeleteImg,
};

export default uploadService;