import React, { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProvider/AuthProvider";
import { Link } from "react-router-dom";

const Profile = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="flex justify-center items-center mt-16">
      <div className="bg-white shadow-lg rounded-2xl ">
        <img
          alt="profile"
          src="https://i.postimg.cc/v8fPMTTP/view-adorable-3d-cat.jpg"
          className="w-full mb-4 rounded-t-lg h-60"
        />
        <div className="flex flex-col items-center justify-center p-4 -mt-16">
          <a href="#" className="relative block">
            <img
              alt="profile"
              src={user?.photoURL}
              className="mx-auto object-cover rounded-full h-24 w-24  border-2 border-white "
            />
          </a>

          <p className="p-2 mt-2 px-4 text-xs text-white bg-yellow-500 rounded-full">
            User
          </p>

          <div className="w-full p-2 mt-4 rounded-lg">
            <div className="flex flex-col md:flex-row text-left gap-3 md:gap-10 md:items-center justify-between text-sm text-gray-600 ">
              <p className="flex flex-col">
                Name
                <span className="font-bold text-black ">
                  {user?.displayName}
                </span>
              </p>
              <p className="flex flex-col">
                Email
                <span className="font-bold text-black ">{user?.email}</span>
              </p>
            </div>
            <div>
              <div className="text-center mt-2 flex items-center gap-4">
                <p className="text-left font-semibold text-red-400">
                  {" "}
                  Membership Subscribe :
                </p>
                <Link to={'/dashboard/payment'}>
                  {" "}
                  <button className="btn font-semibold text-lg my-2 bg-black text-yellow-600 ">
                   Pay $90
                  </button>
                </Link>{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
