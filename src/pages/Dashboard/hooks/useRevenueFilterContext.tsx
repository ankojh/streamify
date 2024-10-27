import { useContext } from "react";
import { FilterDataContext } from "../contexts/FilterDataContext";

export function useRevenueFilterContext() {
  const context = useContext(FilterDataContext);

  if (context === undefined) {
    throw new Error(
      "useRevenueFilterContext must be used within a RevenueFilterProvider"
    );
  }
  if (context === null) {
    return {
      filterKey: "",
      setFilterKey: () => {}, //intentional noop
    };
  }

  return {
    filterKey: context.filterKey,
    setFilterKey: context.setFilterKey,
  };
}
