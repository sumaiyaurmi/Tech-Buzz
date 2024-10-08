import { AiOutlineBars } from "react-icons/ai";
import { useContext, useState } from "react";
import MenuItem from "./MenuItems";
import {  FaHome } from "react-icons/fa";
import toast from "react-hot-toast";
import { AuthContext } from "../../Providers/AuthProvider/AuthProvider";
import useRole from "../../UseHooks/useRole";
import UserMenu from "./SideBarMenu/UserMenu";
import ModaretorMenu from "./SideBarMenu/ModaretorMenu";
import ADminMEnu from "./SideBarMenu/ADminMEnu";

const SideBar = () => {
  const [isActive, setActive] = useState(false);
const[role,isLoading]=useRole()
// console.log(role,isLoading)

 

  
  // Sidebar Responsive Handler
  const handleToggle = () => {
    setActive(!isActive);
  };
  return (
    <>
      {/* Small Screen Navbar */}
      <div className="bg-gray-100 text-gray-800 flex justify-between md:hidden">
        <div className="flex items-center gap-2">
          <div>
            <img
              src="https://i.postimg.cc/fLprBcGj/images.png"
              className="w-16"
              alt=""
            />
          </div>
          <div>
            <p className="text-2xl font-medium">
              Tech
              <span
                className="text-3xl gap-0 font-serif md:text-4xl
             font-semibold text-yellow-600"
              >
                B
              </span>
              <span className="-ml-2"> uzz</span>
            </p>
          </div>
        </div>

        <button
          onClick={handleToggle}
          className="mobile-menu-button p-4 focus:outline-none focus:bg-gray-200"
        >
          <AiOutlineBars className="h-5 w-5" />
        </button>
      </div>
      {/* Sidebar */}
      <div
        className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-gray-100 w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${
          isActive && "-translate-x-full"
        }  md:translate-x-0  transition duration-200 ease-in-out`}
      >
        <div>
          <div className="flex items-center gap-2">
            <div>
              <img
                src="https://i.postimg.cc/fLprBcGj/images.png"
                className="w-16"
                alt=""
              />
            </div>
            <div>
              <p className="text-2xl font-medium">
                Tech
                <span
                  className="text-3xl gap-0 font-serif md:text-4xl
             font-semibold text-yellow-600"
                >
                  B
                </span>
                <span className="-ml-2"> uzz</span>
              </p>
            </div>
          </div>

          {/* Nav Items */}
          <nav>
            {role === 'user' && <UserMenu></UserMenu> }
            {role === 'moderator' && <ModaretorMenu></ModaretorMenu> }
            {role === 'admin' && <ADminMEnu></ADminMEnu> }
            
          </nav>
        </div>

        <div>
          <hr />
          <MenuItem
              icon={FaHome}
              label="Home"
              address="/"
            />
          
        </div>
      </div>
    </>
  );
};

export default SideBar;
