import { updateProfile } from "firebase/auth";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { AuthContextAPI } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Spinner from "../../helpers/Spinner";

const UpdatePicture = () => {
  let [picture, setPicture] = useState(null);
  let [preview, setPreview] = useState(null);
  let { authuser } = useContext(AuthContextAPI);
  let navigate = useNavigate();
  let [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    // console.dir(e.target.files[0]);
    let file = e.target.files[0];
    setPicture(file);
    // console.log(file);

    if (file) {
      let url = URL.createObjectURL(file);
      console.log(url);
      setPreview(url);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setIsLoading(true);
      if (!picture) {
        toast.error("Select a Photo");

        return;
      } else {
        const data = new FormData();
        data.append("file", picture);
        data.append("upload_preset", "innovators-hub-music");
        let responce = await fetch(
          "https://api.cloudinary.com/v1_1/ddhjofgv5/image/upload",
          {
            method: "POST",
            body: data,
          }
        );
        let result = await responce.json();
        console.log(result);

        await updateProfile(authuser, {
          photoURL: result.url,
        });
        toast.success("Photo Updated");
        navigate("/user-profile/user-account");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <section className="h-[100%] w-[100%] bg-amber-200 flex items-center justify-center">
      <article className="min-h-[300px] w-[40%] bg-slate-900 rounded-xl p-4">
        <h2 className="text-center text-2xl">Upload Profile Picture</h2>
        <form
          action="
      "
          className="flex flex-col gap-4 mt-4"
          onSubmit={handleSubmit}
        >
          <div className="w-32 h-32 m-auto bg-gray-700 rounded-full">
            {preview ? (
              <img
                src={preview}
                alt=""
                className="h-[100%] w-[100%] rounded-full"
              />
            ) : (
              <div className="h-[100%] w-[100%] flex rounded-full justify-center items-center">
                No File Selected
              </div>
            )}
          </div>
          <label
            htmlFor="picture"
            className="block py-2 w-[100%]  text-center rounded-lg border-2 border-dashed"
            accept="image/*"
          >
            Select a photo
          </label>
          <input
            type="file"
            id="picture"
            className="hidden"
            onChange={handleChange}
          />
          <button className="py-2 w-[100%] bg-blue-600 rounded-lg cursor-pointer hover:bg-blue-800 ">
            Upload Photo
          </button>
        </form>
      </article>
      {isLoading && <Spinner />}
    </section>
  );
};

export default UpdatePicture;
