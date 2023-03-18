import React, { useRef } from "react";
import { create } from "../../hooks/create";
import { update } from "../../hooks/update";
import CustomInputField from "../customInputField";

import {
  formBodyCX,
  formTitleCX,
  submitButtonCX,
  submitButton,
  sectionGridCX,
} from "../productUpdateModal/styledClass";

const UpdateUserModal = ({ user, refetch }) => {
  const { _id, name, email, role, status } = user;
  const formRef = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    const data = {
      name: event.target.name.value,
      email: event.target.email.value,
      password: event.target.password.value,
      confirmPassword: event.target.confirmPassword.value,
      role: event.target.role.value,
      status: event.target.status.value,
    };

    if (!data.password) {
      delete data.password;
    }
    if (!data.confirmPassword) {
      delete data.confirmPassword;
    }
    Object.entries(data).map(([key, value]) => {
      formData.append(`${key}`, value);
    });

    update({
      endPoint: `user/list/${_id}`,
      method: "put",
      data: formData,
      refetch: refetch,
      item: "user",
    });
  };
  return (
    <div>
      <input type="checkbox" id={_id} className="modal-toggle" />
      <div className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <form ref={formRef} onSubmit={handleSubmit} className={formBodyCX}>
            <h2 className={formTitleCX}>Create User</h2>

            <div className={sectionGridCX}>
              <CustomInputField
                label={"Name"}
                type={"text"}
                name={"name"}
                defaultValue={name}
                required
              />
              <CustomInputField
                label={"User Name"}
                type={"text"}
                name={"email"}
                defaultValue={email}
                required
              />
              <CustomInputField
                label={"Password"}
                type={"text"}
                name={"password"}
              />
              <CustomInputField
                label={"Confirm Password"}
                type={"text"}
                name={"confirmPassword"}
              />
              <CustomInputField
                label={"Role"}
                name={"role"}
                defaultValue={role}
                select
                updatedOptions={["admin", "moderator", "viewer"]}
                required
              />
              <CustomInputField
                label={"Status"}
                name={"status"}
                defaultValue={status}
                select
                updatedOptions={["active", "inactive"]}
                required
              />
            </div>

            <div className={submitButtonCX}>
              <button type="submit" className={submitButton}>
                Submit
              </button>
            </div>
          </form>
          <div className="modal-action">
            <label htmlFor={_id} className="btn">
              Cancle
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateUserModal;
