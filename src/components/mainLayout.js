import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { MdSpaceDashboard } from "react-icons/md";
import { FaUserFriends, FaShoppingCart, FaClipboardList, FaBlogger } from "react-icons/fa";
import { TbBrandBooking, TbCategoryFilled  } from "react-icons/tb";
import { MdColorLens } from "react-icons/md";
import { ImBlog } from "react-icons/im";
import { IoIosNotifications } from "react-icons/io";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Outlet } from "react-router-dom";

import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { RiCoupon3Fill } from "react-icons/ri";
import { SiCoinmarketcap } from "react-icons/si";

import { Layout, Menu, theme } from 'antd';
import { useNavigate } from 'react-router-dom';
const { Header, Sider, Content } = Layout;


const Mainlayout  = () => {
  const [collapsed, setCollapsed] = useState(false);
  
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const navigate = useNavigate();

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <div className="logo">
          <h2 className="text-white fs-5 text-center py-3 mb-0">
            <span className="sm-logo">EC</span>
            <span className="lg-logo">ECOM 01</span>
          </h2>
        </div>

        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['']}
          onClick={({key})=> {
            if(key === "signout") { //==
            } else{
                 navigate(key);  
            }
          }}
          items={[
            {
              key: '',
              icon: <MdSpaceDashboard className='fs-5' />,
              label: 'Dashboard',
            },

            {
                key: 'customers',
                icon: <FaUserFriends className='fs-5' />,
                label: 'Customers',
            },

            {
                key: 'catalog',
                icon: <FaShoppingCart className='fs-5'/>,
                label: 'Catalog',
                children: [
                    {
                        key: 'product',
                        icon: <FaShoppingCart className='fs-5' />,
                        label: 'Add Product',
                    },

                    {
                        key: 'product-list',
                        icon: <FaShoppingCart className='fs-5' />,
                        label: 'Product List',
                    },
                    
                    {
                        key: 'brand',
                        icon: <TbBrandBooking className='fs-5' />,
                        label: 'Brand',
                    },

                    {
                        key: 'brand-list',
                        icon: <TbBrandBooking className='fs-5' />,
                        label: 'Brand List',
                    },
                    
                    {
                        key: 'category',
                        icon: <TbCategoryFilled  className='fs-5' />,
                        label: 'Category',
                    },

                    {
                        key: 'category-list',
                        icon: <TbCategoryFilled  className='fs-5' />,
                        label: 'Category List',
                    },
                    
                    {
                        key: 'color',
                        icon: <MdColorLens className='fs-5' />,
                        label: 'Color',
                    },

                    {
                        key: 'color-list',
                        icon: <MdColorLens className='fs-5' />,
                        label: 'Color List',
                    },

                ]
            },

            {
                key: 'orders',
                icon: <FaClipboardList className='fs-5' />,
                label: 'Orders',
            },

            {
              key: 'marketing',
              icon: <SiCoinmarketcap className='fs-5' />,
              label: 'Marketing',
              children: [
                  {
                      key: 'coupon',
                      icon: <ImBlog className='fs-5' />,
                      label: 'Add Coupon',
                  },

                  {
                      key: 'coupon-list',
                      icon: <RiCoupon3Fill className='fs-5' />,
                      label: 'Coupon List',
                  },
              ]
          },

            {
                key: 'blogs',
                icon: <FaBlogger className='fs-5' />,
                label: 'Blogs',
                children: [
                    {
                        key: 'blogs',
                        icon: <ImBlog className='fs-5' />,
                        label: 'Add Blog',
                    },

                    {
                        key: 'blog-list',
                        icon: <FaBlogger className='fs-5' />,
                        label: 'Blog List',
                    },

                    {
                        key: 'blog-category',
                        icon: <ImBlog className='fs-5' />,
                        label: 'Add Blog Category List',
                    },

                    {
                        key: 'blog-category-list',
                        icon: <FaBlogger className='fs-5' />,
                        label: 'Blog Category List',
                    },
                ]
            },

            {
                key: 'enquiries',
                icon: <FaBlogger className='fs-5' />,
                label: 'Enquiries',
            },
           
          ]}
        />
      </Sider>
      <Layout>
        <Header
          className='d-flex justify-content-between ps-1 pe-5'
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          {React.createElement(
          collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
          {
            className: "trigger",
            onClick: () => setCollapsed(!collapsed),
          }
          )}

          <div className='d-flex gap-3 align-items-center'>
            <div className='position-relative'>
              <IoIosNotifications className='fs-3'/>
              <span className='badge bg-warning rounded-circle p-1 position-absolute'>
                3
              </span>
            </div>

          <div className="d-flex gap-3 align-items-center dropdown">
              <div>
                <img
                  width={32}
                  height={32}
                  src='https://visualpharm.com/assets/381/Admin-595b40b65ba036ed117d3b23.svg' 
                  alt=""
                />
              </div> 

            <div class="dropdown">    
              <div
                // class="btn dropdown-toggle maindropdown"
                role="button"
                id="dropdownMenuLink"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <h5 className="mb-0 text-start">upeksha</h5>
                <p className="mb-0 text-start">upekshagayathree98@gmail.com</p>
              </div>

              <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <li>
                  <Link
                    className="dropdown-item py-1 mb-1"
                    style={{ height: "auto", lineHeight: "20px" }}
                    to="/"
                  >
                    View Profile
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item py-1 mb-1"
                    style={{ height: "auto", lineHeight: "20px" }}
                    to="/"
                  >
                    Signout
                  </Link>
                </li>
              </ul>
            </div>
          </div>
            
        </div>
        </Header>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <ToastContainer
              position="top-right"
              autoClose={250}
              hideProgressBar={false}
              newestOnTop={true}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              // pauseOnHover
              theme="light"
              // transition: Bounce,
            />


            {/* <main> */}
              <Outlet/>
            {/* </main> */}
            
          </Content>
      </Layout>
    </Layout>
  );
};
export default Mainlayout ;