import React from "react";
import MenuItem from "../MenuItems";
import { FaHome, FaPlus, FaProductHunt } from "react-icons/fa";

const UserMenu = () => {
  return (
    <>
      <MenuItem 
      icon={FaHome} 
      label=" My Profile"
       address="profile" 
       />
      <MenuItem
        icon={FaPlus}
        label="  Add Product"
        address="/dashboard/addProduct"
      />
      <MenuItem
        icon={FaProductHunt}
        label=" My Products"
        address="/dashboard/myProducts"
      />
     
    </>
  );
};

export default UserMenu;
