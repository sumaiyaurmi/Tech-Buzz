import Swal from "sweetalert2";
import useAxiosSecure from "../../../UseHooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { MdAddModerator } from "react-icons/md";
import { GrUserAdmin } from "react-icons/gr";
import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProvider/AuthProvider";

const ManageUser = () => {
  const axiosSecure = useAxiosSecure();
  const { user: loggedUser } = useContext(AuthContext);

  const {
    data: users = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/users");
      return data;
    },
  });

  // make admin
  const handleMakeAdmin = (user) => {
    axiosSecure.patch(`/users/admin/${user._id}`).then((res) => {
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${user.name} is an Admin Now`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };
  // make moderator
  const handleMakeModerator = (user) => {
    axiosSecure.patch(`/users/moderator/${user._id}`).then((res) => {
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${user.name} is an Moderator Now`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  if (isLoading)
    return (
      <div className="text-center">
        {" "}
        <span className="loading loading-bars text-center mt-44 loading-lg"></span>
      </div>
    );

  return (
    <div>
      <h3 className="text-4xl my-10  ">Total Users:{users.length}</h3>
      <div className="overflow-x-auto ">
        <table className="table  space-y-4  ">
          {/* head */}
          <thead className="my-4">
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Current Role</th>
              <th>Make Moderator</th>
              <th>Make Admin</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <th>{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td className="">
                  <p className="bg-yellow-500 w-10/12  px-4 text-center font-semibold  rounded-xl">
                    {" "}
                    {user.role}
                  </p>{" "}
                </td>
                <td>
                  <button
                    disabled={loggedUser?.email === user?.email}
                    onClick={() => handleMakeModerator(user)}
                    className="btn  hover:rounded-full text-center "
                  >
                    <MdAddModerator className="text-2xl  "></MdAddModerator>
                  </button>
                </td>
                <td>
                  <button
                    disabled={loggedUser?.email === user?.email}
                    onClick={() => handleMakeAdmin(user)}
                    className="btn  hover:rounded-full text-center "
                  >
                    <GrUserAdmin className="text-2xl  "></GrUserAdmin>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUser;
