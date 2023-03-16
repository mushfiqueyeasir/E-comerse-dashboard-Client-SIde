import React from "react";
import { inputContainerCX, inputCX, legendCx } from "./styledClass";

const CustomInputField = ({
  label,
  type,
  name,
  defaultValue,
  spanFull,
  required,
  handleInput,
}) => {
  return (
    <fieldset className={inputContainerCX(spanFull)}>
      <legend className={legendCx}>
        <div className="flex  gap-2">
          <div>{label}</div>
        </div>
      </legend>

      <input
        type={type}
        name={name}
        defaultValue={defaultValue ? defaultValue : ""}
        className={inputCX}
        required={required}
        onChange={(e) => handleInput(e)}
        onBlur={(e) => handleInput(e)}
      />
    </fieldset>
  );
};

export default CustomInputField;
