import React from "react";
import user from "../../assets/profile.gif";

const UserCreateButton = () => {
  return (
    <label htmlFor="createUser" className="cursor-pointer">
      <div className="flex justify-center items-center rounded-2xl bg-base-100 shadow-xl h-full">
        <figure className=" p-2 lg:p-4">
          <img src={user} alt="Shoes" />
        </figure>
      </div>
    </label>
  );
};

export default UserCreateButton;
