import React from "react";
import { inputContainerCX, inputCX, legendCx } from "./styledClass";

const CustomInputField = ({
  label,
  type,
  name,
  defaultValue,
  maxValue,
  select,
  updatedOptions,
  required,
  handleInput,
}) => {
  return (
    <fieldset className={inputContainerCX()}>
      <legend className={legendCx}>
        <div className="flex  gap-2">
          <div>{label}</div>
        </div>
      </legend>

      {handleInput ? (
        <input
          type={type}
          name={name}
          defaultValue={defaultValue ? defaultValue : ""}
          className={inputCX}
          required={required}
          onChange={(e) => handleInput(e)}
          onBlur={(e) => handleInput(e)}
          max={maxValue}
          min={defaultValue ? defaultValue : 0}
        />
      ) : select ? (
        <select
          className={inputCX + " capitalize cursor-pointer"}
          name={name}
          defaultValue={defaultValue}
          onChange={handleInput}
        >
          {defaultValue && <option value={defaultValue}>{defaultValue}</option>}
          {updatedOptions.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          name={name}
          defaultValue={defaultValue ? defaultValue : ""}
          className={inputCX}
          required={required}
          max={maxValue}
          min={0}
        />
      )}
    </fieldset>
  );
};

export default CustomInputField;
