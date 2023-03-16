import React from "react";
import CustomInputField from "../customInputField";
import { sectionGridCX } from "./styledClass";

const QuantityInformation = ({ handleChange }) => {
  return (
    <div className={sectionGridCX}>
      <CustomInputField
        label="Size 'S'"
        type={"number"}
        name={"sm"}
        required={true}
        handleInput={handleChange}
      />

      <CustomInputField
        label={"Size 'M'"}
        type={"number"}
        name={"m"}
        required={true}
        handleInput={handleChange}
      />

      <CustomInputField
        label={"Size 'L'"}
        type={"number"}
        name={"l"}
        required={true}
        handleInput={handleChange}
      />

      <CustomInputField
        label={"Size 'XL'"}
        type={"number"}
        name={"xl"}
        required={true}
        handleInput={handleChange}
      />
      <CustomInputField
        label={"Size '2XL'"}
        type={"number"}
        name={"2xl"}
        required={true}
        handleInput={handleChange}
      />
      <CustomInputField
        label={"Size '3XL'"}
        type={"number"}
        name={"3xl"}
        required={true}
        handleInput={handleChange}
      />
    </div>
  );
};

export default QuantityInformation;
