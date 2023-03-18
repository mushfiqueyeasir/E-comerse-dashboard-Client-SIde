import React from "react";
import { AiFillDelete } from "react-icons/ai";
import Swal from "sweetalert2";
import { deleteItem } from "../../hooks/delete";

const UserCard = ({ user, refetch }) => {
  const { _id, name, role, status } = user;
  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteItem({ endPoint: `user/list/${_id}` });
        refetch();
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };
  return (
    <label htmlFor={_id} className="cursor-pointer">
      <div className="card bg-base-100 shadow-xl relative">
        <button
          onClick={handleDelete}
          className="absolute right-2 top-[50%] text-red-500 p-3 bg-base-300 rounded-full hover:scale-[1.2] duration-300"
        >
          {React.createElement(AiFillDelete, { size: "20" })}
        </button>
        <div>
          <figure className="rounded-full p-2 lg:p-4">
            <img
              src="https://us.123rf.com/450wm/anatolir/anatolir2011/anatolir201105528/159470802-jurist-avatar-icon-flat-style.jpg?ver=6"
              alt="Shoes"
            />
          </figure>
        </div>

        <div className="flex justify-center">
          <span className="relative flex h-3 w-3">
            <span
              className={`animate-ping absolute inline-flex h-full w-full rounded-full ${
                status === "active" ? "bg-green-400" : "bg-red-400"
              } opacity-75`}
            ></span>
            <span
              className={`relative inline-flex rounded-full h-3 w-3 ${
                status === "active" ? "bg-green-500" : "bg-red-500"
              }`}
            ></span>
          </span>
        </div>
        <div className="p-2 pt-0  lg:p-5 lg:pt-2">
          <h2 className="font-bold text-center capitalize text-sm md:text-lg">
            {name}
          </h2>
          <div className="flex justify-center items-center pt-2">
            <div className="px-3 border-2 border-red-300 rounded-3xl capitalize text-sm md:text-base font-semibold">
              {role}
            </div>
          </div>
        </div>
      </div>
    </label>
  );
};

export default UserCard;
