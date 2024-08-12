import axios from "axios";
import { base_url } from "../../utills/base_url";
import {config} from "../../utills/axiosconfig";

const getBlogcategories = async () => {
    const response = await axios.get (`${base_url}blogCategory/`);
  
    return response.data;
};

const createBlogcategories = async (blogs) => {
    const response = await axios.post(`${base_url}blogCategory/`, blogs, config);
  
    return response.data;
  };

const updateBlogCategory = async (blogCat) => {
    const response = await axios.put(
      `${base_url}blogCategory/${blogCat.id}`,
      { title: blogCat.blogCatData.title },
      config
    );
  
    return response.data;
  };

const getBlogCategory = async (id) => {
    const response = await axios.get(`${base_url}blogCategory/${id}`, config);
  
    return response.data;
  };
  
const deleteBlogCategory = async (id) => {
    const response = await axios.delete(`${base_url}blogCategory/${id}`, config);
  
    return response.data;
  };


const blogcategoryService = {
    getBlogcategories,
    createBlogcategories, 
    updateBlogCategory,
    getBlogCategory,
    deleteBlogCategory,
};

export default blogcategoryService;