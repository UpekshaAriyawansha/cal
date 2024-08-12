import axios from "axios";
import { base_url } from "../../utills/base_url";
import {config} from "../../utills/axiosconfig";

const getProcategories = async () => {
    const response = await axios.get(`${base_url}productCategory/`);
  
    return response.data;
};

const createProcategories = async (proCategory) => {
    const response = await axios.post(`${base_url}productCategory/`, proCategory, config);
  
    return response.data;
  };

const getaProcategory = async (id) => {
    const response = await axios.get (`${base_url}productCategory/${id}`, config);
  
    return response.data;
};

const updateProcategory = async (procategory) => {
    console.log(procategory);
    const response = await axios.put(`${base_url}productCategory/${procategory.id}`,{title:procategory.categoryData.title},config);
  
    return response.data;
};

const deleteaProcategory = async (id) => {
    const response = await axios.delete (`${base_url}productCategory/${id}`, config);
  
    return response.data;
};

const procategoryService = {
    getProcategories,
    createProcategories,
    getaProcategory,
    updateProcategory,
    deleteaProcategory,
};
export default procategoryService;