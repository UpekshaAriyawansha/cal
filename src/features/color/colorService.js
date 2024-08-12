import axios from "axios";
import { base_url } from "../../utills/base_url";
import {config} from "../../utills/axiosconfig";


const getColors = async () => {
    const response = await axios.get (`${base_url}color/`);
  
    return response.data;
};

const createColors = async (color) => {
    const response = await axios.post(`${base_url}color/`, color, config);
  
    return response.data;
  };

const getaColor = async (id) => {
    const response = await axios.get (`${base_url}color/${id}`, config);
  
    return response.data;
};

const updateColor = async (color) => {
    const response = await axios.put(`${base_url}color/${color.id}`,
     {title:color.colorData.title},
     config);
  
    return response.data;
};

const deleteaColor = async (id) => {
    const response = await axios.delete (`${base_url}color/${id}`, config);
  
    return response.data;
};

const colorService = {
    getColors,
    createColors,
    getaColor,
    updateColor,
    deleteaColor,
};
export default colorService;