import React from "react";
import ProgressBar from "./ProgressBar";
import { IOption } from "./YourPolls";
type SingleOptionDetailsViewProps = {
  options: [IOption];
  total_votes: number;
};
export default function SingleOptionDetailsView({
  options,
  total_votes,
}: SingleOptionDetailsViewProps) {
  console.log(options);
  const getTopOption = (options: IOption[]): [string, number] => {
    let m_votes = options[0].votes,
      m_option_name = options[0].option_name;
    options.forEach((option: IOption) => {
      if (option.votes > m_votes) {
        m_votes = option.votes;
        m_option_name = option.option_name;
      }
    });
    return [m_option_name, m_votes];
  };

  return (
    <div className="px-12 pb-9 pt-1">
      <p className="ml-3 mb-1 sm:text-md text-sm">{getTopOption(options)[0]}</p>
      <div className="flex">
        <ProgressBar
          total_votes={total_votes}
          m_votes={getTopOption(options)[1]}
        />

        <div className="ml-5">
          {((getTopOption(options)[1] / total_votes) * 100) | 0}%
        </div>
      </div>
      <p className="ml-4 text-sm mt-1">{getTopOption(options)[1]}</p>
    </div>
  );
}

// [
// Object { option_name: "Java", votes: 0, _id: "65aa56369963b2aa4cc47c4d", … }
// ​
// 1: Object { option_name: "Rust", votes: 0, _id: "65aa56369963b2aa4cc47c4e", … }
// ​
// 2: Object { option_name: "GoLang", votes: 0, _id: "65aa56369963b2aa4cc47c4f", … }
// ​
// 3: Object { option_name: "Python", votes: 0, _id: "65aa56369963b2aa4cc47c50", … }
// ]
