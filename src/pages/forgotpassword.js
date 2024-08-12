import React from "react";
import Custominput from "../components/customInput";


const Forgotpassword = () => {
    return(
        <>
            <div className="py-5"
                style={{background:"#ffd333", minHeight:"100vh"}}
            >
                <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4">
                    <br/><br/>
                    <h3 className="text-center title">
                        Forgot Password
                    </h3>
                    <p className="text-center">
                        Please enter your register email to get reset password mail
                    </p>
                    <form action="">
                        <Custominput 
                            type ="email"
                            label="Email"
                            id="email"/>

                        <button 
                            className="border-0 px-3 py-2 text-white fw-bold w-100"
                            style={{background:"#ffd333"}}
                            type="submit"
                        >
                            Send Link
                        </button>
                    </form>
                    </div>
            </div>

       

        </>
    )
};

export default Forgotpassword;