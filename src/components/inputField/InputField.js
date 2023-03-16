import React from "react";

const InputField = ({
  name,
  inputName,
  type,
  small,
  requited,
  onChange,
  formData,
}) => {
  return (
    <div class={small ? "w-[80%]" : "w-full"}>
      <label class="block tracking-wide text-gray-700 text-base font-bold mb-2 px-4">
        {inputName}
      </label>
      <input
        class="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
        value={formData[name]}
        name={name}
        type={type}
        min="0"
        required={requited}
        onChange={onChange}
      />
      {/* <p class="text-red-500 text-xs italic">Please fill out this field.</p> */}
    </div>
  );
};

export default InputField;
