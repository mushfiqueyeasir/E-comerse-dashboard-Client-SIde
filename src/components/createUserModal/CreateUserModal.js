import React, { useRef } from "react";
import { create } from "../../hooks/create";
import CustomInputField from "../customInputField";

import {
  formBodyCX,
  formTitleCX,
  submitButtonCX,
  submitButton,
  sectionGridCX,
} from "../productUpdateModal/styledClass";

const CreateUserModal = ({ refetch }) => {
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
    Object.entries(data).map(([key, value]) => {
      formData.append(`${key}`, value);
    });

    create({
      endPoint: `user/create`,
      data: formData,
      item: "user",
      refetch: refetch,
    });
  };
  return (
    <div>
      <input type="checkbox" id="createUser" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <form ref={formRef} onSubmit={handleSubmit} className={formBodyCX}>
            <h2 className={formTitleCX}>Create User</h2>

            <div className={sectionGridCX}>
              <CustomInputField
                label={"Name"}
                type={"text"}
                name={"name"}
                required
              />
              <CustomInputField
                label={"User Name"}
                type={"text"}
                name={"email"}
                required
              />
              <CustomInputField
                label={"Password"}
                type={"text"}
                name={"password"}
                required
              />
              <CustomInputField
                label={"Confirm Password"}
                type={"text"}
                name={"confirmPassword"}
                required
              />
              <CustomInputField
                label={"Role"}
                name={"role"}
                select
                updatedOptions={["admin", "moderator", "viewer"]}
                required
              />
              <CustomInputField
                label={"Status"}
                name={"status"}
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
            <label htmlFor="createUser" className="btn">
              Cancle
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateUserModal;
