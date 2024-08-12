import axios from "axios";
import { base_url } from "../../utills/base_url";
import {config} from "../../utills/axiosconfig";


const getBlogs = async () => {
    const response = await axios.get (`${base_url}blog/`);
  
    return response.data;
};

const createBlog = async (blog) => {
    const response = await axios.post(`${base_url}blog/`, blog, config);
  
    return response.data;
  };

  const getaBlog = async (id) => {
    const response = await axios.get (`${base_url}blog/${id}`, config);
  
    return response.data;
};

const updateBlog = async (blog) => {
    const response = await axios.put(`${base_url}blog/${blog.id}`, 
    {title:blog.blogData.title},
    {description:blog.blogData.description},
    {procategory:blog.blogData.procategory},
    {images:blog.blogData.images},
    config);
  
    return response.data;
};

const deleteaBlog = async (id) => {
    const response = await axios.delete (`${base_url}blog/${id}`, config);
  
    return response.data;
};

const blogService = {
    getBlogs,
    createBlog,
    getaBlog,
    updateBlog,
    deleteaBlog,
};
export default blogService;