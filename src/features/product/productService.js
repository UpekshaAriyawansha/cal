import axios from "axios";
import { base_url } from "../../utills/base_url";
import {config} from "../../utills/axiosconfig";

const getProducts = async () => {
    const response = await axios.get (`${base_url}product/`);
  
    return response.data;
};

    const createProducts = async (product) => {
        const response = await axios.post(`${base_url}product/`, product, config);
    
        return response.data;
    };

const productService = {
    getProducts,
    createProducts,
};
export default productService;