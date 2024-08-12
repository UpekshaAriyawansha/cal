import React from "react";
import Custominput from "../components/customInput";


const Resetpassword = () => {
    return(
        <>
            <div className="py-5"
                style={{background:"#ffd333", minHeight:"100vh"}}
            >
                <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4">
                    <br/><br/>
                    <h3 className="text-center title">
                        Reset Password
                    </h3>
                    <p className="text-center">
                        Please enter your New Password
                    </p>
                    <form action="">
                        <Custominput 
                            type ="password"
                            label="New Password"
                            id="newpassword"/>

                        <Custominput 
                            type ="password"
                            label="Confirm Password"
                            id="confirmpassword"/>

                        <button 
                            className="border-0 px-3 py-2 text-white fw-bold w-100"
                            style={{background:"#ffd333"}}
                            type="submit"
                        >
                            Reset Password
                        </button>
                    </form>
                    </div>
            </div>

   


       

        </>
    )
};

export default Resetpassword;