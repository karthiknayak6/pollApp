import { createContext } from "react";

interface MyContextValue {
  options: string[];
  setOptions: React.Dispatch<React.SetStateAction<string[]>>;
}

export const MyContext = createContext<MyContextValue>({
  options: [],
  setOptions: () => {},
});
