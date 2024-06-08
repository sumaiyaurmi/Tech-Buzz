import { GrLogout } from "react-icons/gr";
import { FcSettings } from "react-icons/fc";
import { AiOutlineBars } from "react-icons/ai";
import { BsGraphUp } from "react-icons/bs";
import { useState } from "react";
import MenuItem from "./MenuItems";
import { FaAd, FaHome, FaPlus, FaProductHunt } from "react-icons/fa";

const SideBar = () => {
  const [toggle, setToggle] = useState(false);
  const [isActive, setActive] = useState(false);

  //   For guest/host menu item toggle button
  const toggleHandler = (event) => {
    setToggle(event.target.checked);
  };
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
            <MenuItem icon={FaHome} label=" My Profile" address="profile" />
            <MenuItem
              icon={FaPlus}
              label="  Add Product"
              address=" addProduct"
            />
            <MenuItem icon={FaProductHunt} label=" My Products" address="myProducts" />
          </nav>
        </div>

        <div>
          <hr />

          <button className="flex w-full items-center px-4 py-2 mt-5 text-gray-600 hover:bg-gray-300   hover:text-gray-700 transition-colors duration-300 transform">
            <GrLogout className="w-5 h-5" />

            <span className="mx-4 font-medium">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default SideBar;
