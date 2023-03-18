import React, { useContext } from "react";
import { COUNTER_CONTEXT } from "../../App";
import AdminAuth from "../../auth/AdminAuth";

import Users from "./Users";

const UserPage = () => {
  const { user, usersList, usersListRefetch } = useContext(COUNTER_CONTEXT);
  return (
    <AdminAuth user={user}>
      <Users users={usersList} refetch={usersListRefetch} />
    </AdminAuth>
  );
};

export default UserPage;
