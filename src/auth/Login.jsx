import React, { useContext, useState } from "react";
import { IoEyeSharp } from "react-icons/io5";
import { BsFillEyeSlashFill } from "react-icons/bs";
import { NavLink, useNavigate } from "react-router-dom";
import Spinner from "../helpers/Spinner";
import {
  sendEmailVerification,
  signInWithEmailAndPassword,
} from "firebase/auth";
import toast from "react-hot-toast";
import { __Auth } from "../backend/FirebaseConfig";
import { AuthContextAPI } from "../context/AuthContext";

const Login = () => {
  let [togglePassword, setTogglePassword] = useState(false);
  let [isLoading, setIsLoading] = useState(false);
  let [data, setData] = useState({
    email: "",
    password: "",
  });
  let { email, password } = data;
  let navigate = useNavigate();
  let  {setAuthUser} = useContext (AuthContextAPI)

  let handleChange = (e) => {
    let value = e.target.value;
    let key = e.target.name;
    setData({ ...data, [key]: value });
  };
  const submit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      let obj = await signInWithEmailAndPassword(__Auth, email, password);
      let { user } = obj;
      console.log(user);
      if (user.emailVerified === true) {
        toast.success("Login Sucessful");
        setAuthUser(user)
        navigate("/");
      } else {
        toast.error("Verify you email");
        sendEmailVerification(user);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <section className="h-[calc(100vh-70px)] w-[100%] bg-slate-900 flex justify-center items-center ]">
      <div className=" w-[30%]  bg-slate-700 p-4 rounded-lg">
        <header className="text-center text-3xl ">Login</header>
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

            <div className="flex justify-center">
              <button className="border-1 w-[100%] cursor-pointer font-semibold rounded-md p-2 mt-3 bg-blue-800 hover:bg-blue-950 border-blue-800  ">
                Login
              </button>
            </div>
            <div className="mt-2  flex  justify-center gap-3">
              <span>Don't have an account ? </span>
              <NavLink to="/auth/register" className="text-red-500  font-bold">
                Register
              </NavLink>
            </div>
            <div className="mt-1 flex  justify-center gap-3">
              <NavLink
                to="/auth/forget-password"
                className="text-blue-600 font-bold"
              >
                Forget password ?
              </NavLink>
            </div>
          </form>
        </main>
      </div>
      {isLoading && <Spinner />}
    </section>
  );
};

export default Login;
