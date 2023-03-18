import React from "react";
import CreateUserModal from "../../components/createUserModal/CreateUserModal";
import UpdateUserModal from "../../components/updateUserModal/UpdateUserModal";
import UserCard from "../../components/userCard/UserCard";
import UserCreateButton from "../../components/userCreateButton/UserCreateButton";

const Users = ({ users, refetch }) => {
  return (
    <div className="pt-10">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 xl:grid-cols-8  gap-3">
        <UserCreateButton />
        {users.map((item, index) => (
          <UserCard key={index} user={item} refetch={refetch} />
        ))}
      </div>
      {users.map((item, index) => (
        <UpdateUserModal key={index} user={item} refetch={refetch} />
      ))}
      <CreateUserModal refetch={refetch} />
    </div>
  );
};

export default Users;
