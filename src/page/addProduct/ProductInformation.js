import React from "react";
import CustomInputField from "../../components/customInputField";

import { sectionGridCX } from "./styledClass";

const ProductInformation = ({ handleChange, data }) => {
  return (
    <div className={sectionGridCX}>
      <CustomInputField
        label="Product Name"
        type={"text"}
        name={"productName"}
        required={true}
        handleInput={handleChange}
        defaultValue={data?.productName}
      />

      <CustomInputField
        label={"Product Category"}
        type={"text"}
        name={"productCategory"}
        required={true}
        handleInput={handleChange}
        defaultValue={data?.productCategory}
      />

      <CustomInputField
        label={"Product Brand"}
        type={"text"}
        name={"productBrand"}
        required={true}
        handleInput={handleChange}
        defaultValue={data?.productBrand}
      />

      <CustomInputField
        label={"Product Price"}
        type={"number"}
        name={"productPrice"}
        required={true}
        handleInput={handleChange}
        defaultValue={data?.productPrice}
      />
    </div>
  );
};

export default ProductInformation;
