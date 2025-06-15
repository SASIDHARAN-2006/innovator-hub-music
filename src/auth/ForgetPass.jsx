import React, { useState } from "react";
import Spinner from "../helpers/Spinner";
import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { sendPasswordResetEmail } from "firebase/auth";
import { __Auth } from "../backend/FirebaseConfig";

const ForgetPass = () => {
  let [email, setEmail] = useState("");
  let [isLoading, setIsLoading] = useState(false);
  let navigate = useNavigate()
  const handleChange = (e) => {
    setEmail(e.target.value);
  };
  const submit =async (e) => {
    e.preventDefault();
    try{
        setIsLoading(true)
      await  sendPasswordResetEmail(__Auth,email,)
      toast.success("Reset link send to email")
      navigate("/auth/login")
    }catch(error)
    {
        toast.success(error.message)
    }
    finally{
        setIsLoading(false)
    }
  };
  return (
    <section className="h-[calc(100vh-70px)] w-[100%] bg-slate-900 flex justify-center items-center ]">
      <div className=" w-[30%]  bg-slate-700 p-4 rounded-lg">
        <header className="text-center text-3xl ">Reset Password</header>
        <main className="p-2">
          <form action="" className="flex flex-col gap-3" onSubmit={submit}>
            <div>
              <label htmlFor="gmail" className="block text-lg">
                Email
              </label>

              <input
                type="email"
                id="email"
                placeholder="Enter gmail"
                className="outline-none border-1 w-[100%] my-1 py-1 pl-2 rounded-md"
                onChange={handleChange}
                name="email"
                value={email}
              />
            </div>

            <div className="flex justify-center">
              <button className="border-1 w-[100%] cursor-pointer font-semibold rounded-md p-2 mt-3 bg-blue-800 hover:bg-blue-950 border-blue-800  ">
                Reset Password
              </button>
            </div>
            <div className="mt-2  text-center gap-3">
              
              <NavLink to="/auth/login" className="w-[100%] bg-red-600 font-bold block p-2 rounded-md">
                Cancel
              </NavLink>
            </div>
          </form>
        </main>
      </div>
      {isLoading && <Spinner />}
    </section>
  );
};

export default ForgetPass;
