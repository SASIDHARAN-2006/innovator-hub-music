import React, { useContext, useState } from "react";
import { AuthContextAPI } from "../../context/AuthContext";
import { NavLink } from "react-router-dom";
import { UserContextAPI } from "../../context/Usercontext";
import Spinner from "../../helpers/Spinner";


const UserAccount = () => {
  let { authuser } = useContext(AuthContextAPI);
  let {userProfile , isLoading} = useContext(UserContextAPI)
  return (
    <section className="h-[100%] w-[100%] bg-amber-200 flex items-center justify-center">
      <article className="min-h-[300px] w-[40%] bg-slate-900 rounded-xl p-4">
        <header className="h-[110px] w-[100%] bg-slate-700 rounded-t-xl flex flex-col items-center">
          <img
            src={authuser?.photoURL}
            alt=""
            className="h-28 w-28 rounded-full -mt-16"
          />
          <h2>{authuser?.displayName}</h2>
          <h2>{authuser?.email}</h2>
        </header>
        {userProfile? (<div className="mt-2">
          <h2 className="text-2xl font-medium text-center text-indigo-600">Personal Info</h2>
          <article className="flex flex-wrap gap-4 mt-3 rounded-lg">
            <div className="w-[48%] bg-slate-500 p-3 rounded-lg">
              <h3 className="font-medium text-[20px] ">Phone Number</h3>
              <p>{userProfile?.phoneNumber}</p>
            </div>
            <div className="w-[48%] bg-slate-500 p-3 rounded-lg">
              <h3 className="font-medium text-[20px]">DOB</h3>
              <p>{userProfile?.dateOfBirth}</p>
            </div>
            <div className="w-[48%] bg-slate-500 p-3 rounded-lg">
              <h3 className="font-medium text-[20px]">Languages</h3>
              <p>{userProfile?.languages}</p>
            </div>
            <div className="w-[48%] bg-slate-500 p-3 rounded-lg">
              <h3 className="font-medium text-[20px]">Gender</h3>
              <p>{userProfile?.gender}</p>
            </div>
            <div className="w-[100%] bg-slate-500 p-3 rounded-lg">
              <h3 className="font-medium text-[20px]">Address</h3>
              <p>{userProfile?.address}</p>
            </div>
          </article>
        </div>
          
        ) : (
          <>
            <div className="h-[150px] w-[100%] flex items-center justify-center flex-col gap-4">
              <h2>User data Not present</h2>
              <NavLink to="/user-profile/update-profile" className="py-2 px-4 rounded-lg bg-blue-700">Add User data</NavLink>
            </div>
          </>
        )}
      </article>
      {isLoading && <Spinner/>}
    </section>
  );
};

export default UserAccount;
