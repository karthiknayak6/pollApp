import React, { useState } from "react";

type NewOptionProps = {
  option: string;
  options: string[];
  setOptions: React.Dispatch<React.SetStateAction<string[]>>;
};

const NewOption: React.FC<NewOptionProps> = ({
  option,
  options,
  setOptions,
}) => {
  const [value, setValue] = useState(option);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedOptions = [...options];
    const index = options.indexOf(option);
    updatedOptions[index] = e.target.value;

    setValue(e.target.value);
    setOptions(updatedOptions);
    console.log(options);
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
