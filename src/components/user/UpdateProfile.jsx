import React, { useContext, useState } from "react";
import { AuthContextAPI } from "../../context/AuthContext";
import { doc, setDoc } from "firebase/firestore";
import { __DB } from "../../backend/FirebaseConfig";
import toast from "react-hot-toast";
import Spinner from "../../helpers/Spinner";
import { UserContextAPI } from "../../context/Usercontext";
import { useNavigate } from "react-router-dom";

const UpdateProfile = () => {
  let { authuser } = useContext(AuthContextAPI);
  let { userProfile } = useContext(UserContextAPI);
  let [isLoading,setIsLoading] = useState(false)
  
  let navigate = useNavigate()
  let [data, setData] = useState({
    phoneNo: userProfile?.phoneNumber,
    dob: userProfile?.dateOfBirth,
    languages: userProfile?.languages,
    gender: userProfile?.gender,
    address: userProfile?.address,
  });
  let { phoneNo, dob, languages, gender, address } = data;

  let handleChange = (e) => {
    let key = e.target.name;
    let value = e.target.value;
    setData({ ...data, [key]: value });
  };
  let handleSubmit = async (e) => {
    e.preventDefault();
    let { displayName, email, photoURL, uid } = authuser;
    let payload = {
      name: displayName,
      email: email,
      photo: photoURL,
      id: uid,
      phoneNumber: phoneNo,
      dateOfBirth: dob,
      gender: gender,
      languages: languages,
      address: address,
      role: "user",
    };
    try {
      // console.log(payload);
      let user_collection = doc(__DB, "user_profile", uid);
      await setDoc(user_collection, payload);
      toast.success("Details added");
      navigate("/user-profile")
      setIsLoading(true)
    } catch (error) {
      toast.error(error.message);
    }
    finally{
      setIsLoading(false)
    }
  };
  return (
    <section className="h-[100%] w-[100%] bg-amber-200 flex items-center justify-center">
      <article className="min-h-[500px] w-[60%] bg-slate-900 rounded-xl p-4">
        <h2 className="text-center text-2xl">Upload Profile Data</h2>
        <form
          action=""
          className="mt-8 flex flex-col gap-4"
          onSubmit={handleSubmit}
        >
          <article className="flex gap-5 ">
            <div className="flex flex-col gap-3 mt-3 w-[48%]">
              <label htmlFor="phoneNo" className="block text-[18px]">
                Phone Number
              </label>
              <input
                type="tel"
                id="phoneNo"
                placeholder="Enter Phone number"
                className="outline-none bg-white py-2 px-4 rounded-lg text-black"
                onChange={handleChange}
                name="phoneNo"
                value={phoneNo}
              />
            </div>
            <div className="flex flex-col gap-3 mt-3 w-[48%]">
              <label htmlFor="dob" className="block text-[18px]">
                Date of Birth
              </label>
              <input
                type="date"
                id="dob"
                placeholder="Date of Birth"
                className="outline-none bg-white py-2 px-4 rounded-lg text-black"
                onChange={handleChange}
                name="dob"
                value={dob}
              />
            </div>
          </article>
          <article className="flex gap-5 ">
            <div className="flex flex-col gap-3 mt-3 w-[48%]">
              <label htmlFor="language" className="block text-[18px]">
                Languages
              </label>
              <input
                type="text"
                id="language"
                placeholder="Enter Language"
                className="outline-none bg-white py-2 px-4 rounded-lg text-black"
                onChange={handleChange}
                name="languages"
                value={languages}
              />
            </div>
            <div className="flex flex-col   gap-5 mt-3 w-[48%]">
              <label className="block text-[18px]">Gender</label>
              <div className="gap-10 flex">
                <span className="flex gap-1">
                  {" "}
                  <input
                    type="radio"
                    onChange={handleChange}
                    name="gender"
                    value="Male"
                    checked = {gender === "Male"}
                  />
                  Male
                </span>

                <span className="flex gap-1">
                  {" "}
                  <input
                    type="radio"
                    onChange={handleChange}
                    name="gender"
                    value="Female"
                    checked = {gender === "Female"}
                  />
                  Female
                </span>

                <span className="flex gap-1">
                  {" "}
                  <input
                    type="radio"
                    onChange={handleChange}
                    name="gender"
                    value="Others"
                    checked = {gender === "Others"}
                  />
                  Others
                </span>
              </div>
            </div>
          </article>
          <article>
            <div className="flex flex-col gap-3 mt-3 w-[100%] ">
              <label htmlFor="address" className="block text-[18px]">
                Address
              </label>
              <textarea
                type="text"
                id="address"
                placeholder="Enter Address"
                className="outline-none bg-white py-2 px-4 rounded-lg text-black "
                onChange={handleChange}
                name="address"
                value={address}
              />
            </div>
          </article>
          <article>
            <button className="py-2 px-4 bg-blue-600 hover:bg-blue-800 w-[100%] rounded-lg text-lg">
              Submit
            </button>
          </article>
        </form>
      </article>
      {isLoading && <Spinner />}
    </section>
  );
};

export default UpdateProfile;
