import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContextAPI } from "../../context/AuthContext";
import { signOut } from "firebase/auth";
import toast from "react-hot-toast";
import { __Auth } from "../../backend/FirebaseConfig";
import { UserContextAPI } from "../../context/Usercontext";

const Menu = () => {
  let { authuser } = useContext(AuthContextAPI);
  let { userProfile } = useContext(UserContextAPI);
  
  

  let navigate = useNavigate();
  const logout = async () => {
    try {
      
      await signOut(__Auth);
      toast.success("Logged out");
      navigate("/auth/login");
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <aside>
      <ul className="flex gap-3 font-semibold">
        {userProfile?.role === "admin" && authuser && (
          <li>
            <NavLink
              to="/admin"
              className={(obj) => {
                let { isActive } = obj;
                return `py-2 px-4 rounded-lg cursor-pointer hover:bg-blue-800 ${
                  isActive && "bg-blue-800"
                }`;
              }}
            >
              Admin
            </NavLink>
          </li>
        )}
        <li>
          <NavLink
            to="/"
            className={(obj) => {
              let { isActive } = obj;
              return `py-2 px-4 rounded-lg cursor-pointer hover:bg-blue-800 ${
                isActive && "bg-blue-800"
              }`;
            }}
          >
            Home
          </NavLink>
        </li>

        {authuser ? (
          <>
            <li>
              <NavLink
                className={
                  "py-2 px-4 rounded-lg cursor-pointer hover:bg-blue-600 text-[white]"
                }
                onClick={logout}
              >
                Logout
              </NavLink>
            </li>
            <li>
              <NavLink to="/user-profile">
                <img
                  src={authuser.photoURL}
                  alt=""
                  className="h-[30px] w-[30px] rounded-full "
                />
              </NavLink>
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink
                to="/auth/login"
                className={(obj) => {
                  let { isActive } = obj;
                  return ` py-2 px-4 rounded-lg cursor-pointer hover:bg-blue-600 text-[white] ${
                    isActive && "bg-blue-600"
                  }`;
                }}
              >
                Login
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/auth/register"
                className={(obj) => {
                  let { isActive } = obj;
                  return ` py-2 px-4 rounded-lg cursor-pointer hover:bg-blue-600 text-[white] ${
                    isActive && "bg-blue-600"
                  }`;
                }}
              >
                Register
              </NavLink>
            </li>
          </>
        )}
      </ul>
      {/* {isLoading && <Spinner/>} */}
    </aside>
  );
};

export default Menu;
