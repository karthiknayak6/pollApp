// NewOption.tsx

import React, { useState } from "react";

type NewOptionProps = {
  option: { option_name: string };
  options: { option_name: string }[];
  setOptions: React.Dispatch<React.SetStateAction<{ option_name: string }[]>>;
};

const NewOption: React.FC<NewOptionProps> = ({
  option,
  options,
  setOptions,
}) => {
  // Initialize the value with the option_name or an empty string
  const [value, setValue] = useState(option.option_name || "");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedOptions = [...options];
    const index = options.indexOf(option);
    updatedOptions[index] = { option_name: e.target.value };

    setValue(e.target.value);
    setOptions(updatedOptions);
  };

  const handleRemoveOption: React.MouseEventHandler<HTMLButtonElement> = (
    e
  ) => {
    e.preventDefault();
    const updatedOptions = options.filter((opt) => opt !== option);
    setOptions(updatedOptions);
  };

  return (
    <div className="wrapper relative flex">
      <input
        type="text"
        className="mt-1 p-3 block w-full border rounded-md focus:outline-none focus:border-purple-700"
        placeholder={`Option ${options.indexOf(option) + 1}`}
        value={value}
        onChange={handleInputChange}
      />
      <button
        onClick={handleRemoveOption}
        className="clear absolute right-5 top-3 text-2xl"
      >
        ×
      </button>
    </div>
  );
};

export default NewOption;
