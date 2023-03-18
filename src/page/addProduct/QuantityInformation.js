import React from "react";
import CustomInputField from "../../components/customInputField";
import { sectionGridCX } from "./styledClass";

const QuantityInformation = ({ handleChange, data }) => {
  return (
    <div className={sectionGridCX}>
      <CustomInputField
        label="Size 'S'"
        type={"number"}
        name={"sm"}
        handleInput={handleChange}
        defaultValue={data?.productStock?.sm ? data?.productStock?.sm : "0"}
      />

      <CustomInputField
        label={"Size 'M'"}
        type={"number"}
        name={"m"}
        handleInput={handleChange}
        defaultValue={data?.productStock?.m ? data?.productStock?.m : "0"}
      />

      <CustomInputField
        label={"Size 'L'"}
        type={"number"}
        name={"l"}
        handleInput={handleChange}
        defaultValue={data?.productStock?.l ? data?.productStock?.l : "0"}
      />

      <CustomInputField
        label={"Size 'XL'"}
        type={"number"}
        name={"xl"}
        handleInput={handleChange}
        defaultValue={data?.productStock.xl ? data?.productStock?.xl : "0"}
      />
      <CustomInputField
        label={"Size '2XL'"}
        type={"number"}
        name={"2xl"}
        handleInput={handleChange}
        defaultValue={
          data?.productStock["2xl"] ? data?.productStock["2xl"] : "0"
        }
      />
      <CustomInputField
        label={"Size '3XL'"}
        type={"number"}
        name={"3xl"}
        handleInput={handleChange}
        defaultValue={
          data?.productStock["3xl"] ? data?.productStock["3xl"] : "0"
        }
      />
    </div>
  );
};

export default QuantityInformation;
