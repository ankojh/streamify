import { createContext } from "react";

export const FilterDataContext = createContext<{
  filterKey: string;
  setFilterKey: (key: string) => void;
} | null>(null);
