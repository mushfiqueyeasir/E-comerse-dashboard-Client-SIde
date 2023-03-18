import React from "react";
import CustomInputField from "../customInputField";
import { sectionGridCX } from "./styledClass";

const SoldInformation = ({ handleChange, data }) => {
  return (
    <div className={sectionGridCX}>
      <CustomInputField
        label="Size 'S'"
        type={"number"}
        name={"sm"}
        handleInput={handleChange}
        maxValue={data?.productStock.sm}
      />

      <CustomInputField
        label={"Size 'M'"}
        type={"number"}
        name={"m"}
        handleInput={handleChange}
        maxValue={data?.productStock.m}
      />

      <CustomInputField
        label={"Size 'L'"}
        type={"number"}
        name={"l"}
        handleInput={handleChange}
        maxValue={data?.productStock.l}
      />

      <CustomInputField
        label={"Size 'XL'"}
        type={"number"}
        name={"xl"}
        handleInput={handleChange}
        maxValue={data?.productStock.xl}
      />
      <CustomInputField
        label={"Size '2XL'"}
        type={"number"}
        name={"2xl"}
        handleInput={handleChange}
        maxValue={data?.productStock["2xl"]}
      />
      <CustomInputField
        label={"Size '3XL'"}
        type={"number"}
        name={"3xl"}
        handleInput={handleChange}
        maxValue={data?.productStock["3xl"]}
      />
    </div>
  );
};

export default SoldInformation;
