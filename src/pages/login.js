import React, { useEffect } from "react";
import Custominput from "../components/customInput";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {useDispatch, useSelector} from 'react-redux';
import { login } from "../features/auth/authSlice";


const Login = () => {

    // let schema = object({
    //     // email:string().email().required(),
    //     // password:string().required(),
    //     email: string().email('Email should be valid').required('Email is Required'),
    //     password: string().required('Email is Required'),
    //   });

    

    let schema = Yup.object().shape({
        email: Yup.string()
            .email('Email should be valid')
            .required('Email is Required'),
        password: Yup.string()
            .required('Password is Required'),
      });

    const dispatch = useDispatch();
    const navigate = useNavigate();


    const formik = useFormik({
        initialValues: {
          email: '',
          password: '',
        },

        validationSchema:schema,
        onSubmit: values => {
            dispatch(login(values));
            // alert(JSON.stringify(values, null, 2));
        },
    });

    const {user, isLoading, isError, isSuccess, message} = useSelector(
        (state) => state.auth
    );
    useEffect(()=>{
        // console.log(user);
        if(!user == null || isSuccess){
           navigate("admin"); 
        } else {
            alert("Not");
        }
    },[user, isLoading, isError, isSuccess, message])

    return(
        <>
            <div className="py-5"
                style={{background:"#ffd333", minHeight:"100vh"}}
            >
                <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4">
                    <br/><br/>
                    <h3 className="text-center title">
                        Login
                    </h3>
                    <p className="text-center">
                        Login to your account to continue.
                    </p>
                    <div className="error text-center">
                        {message.message == "Rejected" ? "You are not an Admin" : ""}
                    </div>
                    <form action="" onSubmit={formik.handleSubmit}>
                        <Custominput 
                            type ="text"
                            name = "email"
                            label="Email"
                            id="email"
                            value={formik.values.email}
                            onChange={formik.handleChange('email')}
                        />
                        <div className="error">
                            {formik.touched.email && formik.errors.email ? (
                                <div>{formik.errors.email}</div>
                            ) : null}
                        </div>
                        <Custominput 
                            type ="password"
                            name = "password"
                            label="Password"
                            id="password"
                            value={formik.values.password}
                            onChange={formik.handleChange('password')}
                        />
                        <div className="error">
                            {formik.touched.password && formik.errors.password ? (
                                <div>{formik.errors.password}</div>
                            ) : null}
                        </div>
                        
                        <div className="mb-3 text-end">
                            <Link to="/forgot-password">
                                Forgot Password?
                            </Link>
                        </div>

                        <button 
                            className="border-0 w-100  px-3 py-2 text-white fw-bold text-center text-decoration-none fs-5"
                            style={{background:"#ffd333"}}
                            type="submit">
                            Login
                        </button>

                    </form>
                    </div>
            </div>
       

        </>
    )
};

export default Login;