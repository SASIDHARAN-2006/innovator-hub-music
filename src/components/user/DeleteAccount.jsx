import React, { useState } from "react";
import { deleteUser, reauthenticateWithCredential } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast"; // Import react-hot-toast
import { __Auth, __DB } from "../../backend/FirebaseConfig";
import { EmailAuthProvider } from "firebase/auth/web-extension";
import { doc } from "firebase/firestore";

const DeleteAccount = () => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    const user = __Auth.currentUser;
    console.log(user);

    if (user) {
      try {
        let user_collection = doc(__DB,"user_profile",user?.uid)
        await deleteUser(user);
        await deleteUser(user_collection)
        toast.success("Account deleted successfully.");
        navigate("/");
      } catch (error) {
        toast.error("Failed to delete account.");
        console.error("Error deleting account:", error);
      }
    } else {
      toast.error("No user logged in.");
    }
  };

  const handleCancel = () => {
    navigate("/user-profile");
  };

  return (
    <section className="h-[100%] w-[100%] bg-amber-200 flex items-center justify-center">
      <article className="h-auto w-[40%] bg-slate-900 rounded-xl p-4 ">
        <h3 className="text-2xl font-bold flex justify-center items-center">
          Do you want to delete your account?
        </h3>
        <ul className="flex justify-around mt-10">
          <li>
            <button
              onClick={handleDelete}
              className="flex bg-red-600 px-5 p-2 rounded-lg font-bold cursor-pointer"
            >
              Yes
            </button>
          </li>
          <li>
            <button
              onClick={handleCancel}
              className="flex bg-red-600 px-5 p-2 rounded-lg font-bold  cursor-pointer"
            >
              No
            </button>
          </li>
        </ul>
      </article>
    </section>
  );
};

export default DeleteAccount;
