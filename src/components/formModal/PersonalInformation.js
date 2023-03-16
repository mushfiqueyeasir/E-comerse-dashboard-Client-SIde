import React from "react";
import CustomInputField from "../customInputField";
import { sectionGridCX } from "./styledClass";

const PersonalInformation = ({ handleChange }) => {
  return (
    <div className={sectionGridCX}>
      <CustomInputField
        label="Product Name"
        type={"text"}
        name={"productName"}
        required={true}
        handleInput={handleChange}
      />

      <CustomInputField
        label={"Product Category"}
        type={"text"}
        name={"productCategory"}
        required={true}
        handleInput={handleChange}
      />

      <CustomInputField
        label={"Product Brand"}
        type={"productBrand"}
        name={"maritalStatus"}
        required={true}
        handleInput={handleChange}
      />

      <CustomInputField
        label={"Product Price"}
        type={"number"}
        name={"productPrice"}
        required={true}
        handleInput={handleChange}
      />
    </div>
  );
};

export default PersonalInformation;
