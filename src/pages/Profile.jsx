import { useState } from "react";
import useAuth from "../hooks/useAuth";
import auth from "../firebase/firebase.config";
import toast from "react-hot-toast";
import { FaEdit } from "react-icons/fa";
import userPhoto from "../assets/Default Avatar.png";

const Profile = () => {
  const { user, setUser, update } = useAuth();
  const { displayName, email, photoURL } = user;
  const [edit, setEdit] = useState(false);
  const [error, setError] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const photo = e.target.photo.value;
    const namePattern = /^[A-Za-z]+(?: [A-Za-z]+)*$/;
    const urlPattern = /^https:\/\/([\w\-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/;
    if (!namePattern.test(name)) {
      setError("Please enter a valid name.");
      return;
    }
    if (!urlPattern.test(photo)) {
      setError("Please enter a valid photo URL starting with https://");
      return;
    }
    update(auth.currentUser, name, photo)
      .then(() => {
        setError("");
        setUser({ ...auth.currentUser });
        setEdit(false);
        toast.success("Profile updated successfully!");
      })
      .catch();
  };
  return (
    <div>
      <title>Profile | PawMart</title>
      <div className="max-w-7xl w-[95%] mx-auto py-9 sm:py-13 lg:w-[97%]">
        <div className="bg-linear-to-r from-[#fff3e2] to-[#fff0f0] w-[97%] mx-auto p-6 rounded-3xl shadow-lg sm:p-10 md:p-12 lg:w-full">
          <h1 className="text-2xl font-bold text-[#f2684a] text-center mb-8 cursor-default sm:text-3xl md:text-4xl sm:mb-12">
            My PawMart Profile
          </h1>
          <div className="lg:flex lg:space-x-12">
            <div className="lg:w-1/3 flex flex-col items-center pb-8 lg:pb-0 lg:pr-8 lg:border-r lg:border-[#ffd9b3]">
              <div className="w-32 h-32 rounded-full overflow-hidden ring-4 ring-offset-4 ring-[#f2684a] mb-4 shadow-xl transition-all duration-300 hover:scale-105 sm:w-40 sm:h-40">
                {photoURL ? (
                  <img
                    className="h-full w-full object-cover"
                    src={photoURL}
                    alt=""
                  />
                ) : (
                  <img
                    className="h-full w-full object-cover"
                    src={userPhoto}
                    alt=""
                  />
                )}
              </div>
              <h3 className="text-center font-bold text-xl text-gray-700 mt-2 cursor-default sm:text-2xl">
                {displayName}
              </h3>
              <p className="text-sm text-gray-500 italic mt-1 px-2 text-center cursor-default">
                {email}
              </p>
            </div>
            <div className="lg:w-2/3 pt-3 lg:pt-0">
              <div className="flex justify-between items-center border-b pb-4 mb-6 border-[#ffd9b3]">
                <h2 className="text-lg font-bold text-[#f2684a] cursor-default sm:text-xl">
                  {edit ? "Update Profile Details" : "Account Information"}
                </h2>
                <FaEdit
                  onClick={() => setEdit(!edit)}
                  className="w-5 h-5 text-[#f2684a] cursor-pointer"
                />
              </div>
              {!edit ? (
                <div className="space-y-4 md:space-y-6">
                  <div className="bg-base-100 p-4 rounded-xl shadow border border-[#ffd9b3]">
                    <p className="text-sm text-[#f2684a] font-semibold mb-1">
                      Name
                    </p>
                    <h5 className="text-lg font-medium">{displayName}</h5>
                  </div>
                  <div className="bg-base-100 p-4 rounded-xl shadow border border-[#ffd9b3]">
                    <p className="text-sm text-[#f2684a] font-semibold mb-1">
                      Photo URL
                    </p>
                    <h5 className="text-lg break-all">
                      {photoURL ? `${photoURL.slice(0, 25)}...` : "N/A"}
                    </h5>
                  </div>
                  <div className="bg-base-100 p-4 rounded-xl shadow border border-[#ffd9b3]">
                    <p className="text-sm text-[#f2684a] font-semibold mb-1">
                      Email
                    </p>
                    <h5 className="text-lg font-medium">{email}</h5>
                  </div>
                </div>
              ) : (
                <>
                  <form onSubmit={handleSubmit} className="space-y-6 pt-2">
                    <div className="flex flex-col gap-2">
                      <label
                        className="text-sm font-medium text-[#f2684a]"
                        htmlFor="name"
                      >
                        Name :
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        defaultValue={displayName}
                        placeholder="Enter Your Name"
                        className="bg-base-100 px-4 py-2 rounded-lg border border-[#ffd9b3] transition-all duration-150 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#f2684a]"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label
                        className="text-sm font-medium text-[#f2684a]"
                        htmlFor="url"
                      >
                        Photo URL :
                      </label>
                      <input
                        type="url"
                        name="photo"
                        id="url"
                        defaultValue={photoURL}
                        placeholder="Enter Your Photo URL"
                        className="bg-base-100 px-4 py-2 rounded-lg border border-[#ffd9b3] transition-all duration-150 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#f2684a]"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label
                        className="text-sm font-medium text-[#f2684a]"
                        htmlFor="email"
                      >
                        Email :
                      </label>
                      <input
                        type="text"
                        name="email"
                        id="email"
                        defaultValue={email}
                        disabled
                        className="bg-base-200 px-4 py-2 rounded-lg border text-gray-500 border-gray-300 cursor-not-allowed shadow-sm"
                      />
                    </div>
                    <input
                      type="submit"
                      value="Save Change"
                      className="w-full mt-8 bg-linear-to-r from-primary to-secondary cursor-pointer text-white font-semibold py-3 rounded-xl shadow"
                    />
                  </form>
                  {error && (
                    <p className="text-red-500 mt-3 text-center">{error}</p>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
