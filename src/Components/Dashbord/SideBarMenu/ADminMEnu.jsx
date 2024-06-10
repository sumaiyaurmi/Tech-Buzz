import MenuItem from "../MenuItems";
import { FaChartPie, FaUsers } from "react-icons/fa";
import { MdDiscount } from "react-icons/md";

const ADminMEnu = () => {
  return (
    <>
      <MenuItem
        icon={FaChartPie}
        label="  Statistics Page"
        address="/dashboard/admin-statistics"
      />
      <MenuItem
        icon={FaUsers}
        label=" Manage Users"
        address="/dashboard/admin-manage-users"
      />
      <MenuItem
        icon={MdDiscount }
        label=" Manage Coupons"
        address="/dashboard/admin-manage-coupons"
      />
     
    </>
  );
};

export default ADminMEnu;
