import React, { useState } from "react";
import { IoEyeSharp } from "react-icons/io5";
import { BsFillEyeSlashFill } from "react-icons/bs";
import toast from "react-hot-toast";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { __Auth } from "../backend/FirebaseConfig";
import { NavLink, useNavigate } from "react-router-dom";
import Spinner from "../helpers/Spinner";

const Register = () => {
  let [togglePassword, setTogglePassword] = useState(false);
  let [toggleConfirmPassword, setToggleConfirmPassword] = useState(false);
  let navigate = useNavigate()
  let [isLoading,setIsLoading] = useState(false)
  let [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
  });
  let { username, email, password, confirmpassword } = data;

  let handleChange = (e) => {
    let value = e.target.value;
    let key = e.target.name;
    setData({ ...data, [key]: value });
  };

  let submit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true)
      if (password !== confirmpassword) {
        toast.error("Confirm Password Doesn't Match");
        setData({ ...data, confirmpassword: "" });
      } else {
        let obj = await createUserWithEmailAndPassword(__Auth, email, password);

        let { user } = obj;
        
        await updateProfile(user, {
          displayName: username,
          photoURL:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYOvDs-ry3nz6dC7R-Ut7z78f98QnTkD4bTsWCXman027r53vIrXhiMS7hJ6tUyMjb6mE&usqp=CAU",
        });
        sendEmailVerification(user);
        toast("Verfication Link Sent");
        toast.success("User Registered");
        navigate("/auth/login")
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message.slice(22, error.message.length - 2));
    }
    finally{
      setIsLoading(false)
    }
  };
  return (
    <section className="h-[calc(100vh-70px)] w-[100%] bg-slate-900 flex justify-center items-center ]">
      <div className=" w-[30%]  bg-slate-700 p-4 rounded-lg">
        <header className="text-center text-3xl ">Register</header>
        <main className="p-2">
          <form action="" className="flex flex-col gap-3" onSubmit={submit}>
            <div>
              <label htmlFor="username" className="block text-lg">
                Username
              </label>
              <input
                type="text"
                id="username"
                placeholder="Enter username"
                className="outline-none border-1 w-[100%] my-1 py-1 pl-2 rounded-md"
                onChange={handleChange}
                name="username"
                value={username}
              />
            </div>
            <div>
              <label htmlFor="gmail" className="block text-lg">
                Gmail
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
            <div className="relative">
              <label htmlFor="password" className="block text-lg">
                Password
              </label>
              <input
                type={togglePassword ? "text" : "password"}
                id="password"
                placeholder="Enter password"
                className="outline-none border-1 w-[100%] my-1 py-1 pl-2 rounded-md"
                onChange={handleChange}
                name="password"
                value={password}
              />
              {togglePassword ? (
                <IoEyeSharp
                  className="absolute top-10 right-3 cursor-pointer"
                  onClick={() => setTogglePassword(!togglePassword)}
                />
              ) : (
                <BsFillEyeSlashFill
                  className="absolute top-10 right-3 cursor-pointer"
                  onClick={() => setTogglePassword(!togglePassword)}
                />
              )}
            </div>
            <div className="relative">
              <label htmlFor="confirmpassword" className="block text-lg">
                Confirm Password
              </label>
              <input
                type={toggleConfirmPassword ? "text" : "password"}
                id="confirmpassword"
                placeholder="confirm password"
                className="outline-none border-1 w-[100%] my-1 py-1 pl-2 rounded-md"
                onChange={handleChange}
                name="confirmpassword"
                value={confirmpassword}
              />
              {toggleConfirmPassword ? (
                <IoEyeSharp
                  className="absolute top-10 right-3 cursor-pointer"
                  onClick={() =>
                    setToggleConfirmPassword(!toggleConfirmPassword)
                  }
                />
              ) : (
                <BsFillEyeSlashFill
                  className="absolute top-10 right-3 cursor-pointer"
                  onClick={() =>
                    setToggleConfirmPassword(!toggleConfirmPassword)
                  }
                />
              )}
            </div>
            <div className="flex justify-center">
              <button className="border-1 w-[100%] cursor-pointer font-semibold rounded-md p-2 mt-3 bg-blue-800 hover:bg-blue-950 border-blue-800  ">
                Register
              </button>
            </div>
            <div className="mt-2  flex  justify-center gap-3">
             <span>Already have an account ?</span>
              <NavLink to="/auth/login" className="text-red-500  font-bold">Login</NavLink>
            </div>
          </form>
        </main>
      </div>
      {isLoading && <Spinner/>}
    </section>
  );
};

export default Register;
