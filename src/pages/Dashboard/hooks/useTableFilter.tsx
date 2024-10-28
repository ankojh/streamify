import { ElementType, useMemo, useState } from "react";
import { useStringFilter } from "./useStringFilter";

export const FilterTypes = {
  text: "text",
  number: "number",
  custom: "custom",
} as const;

type FilterType = (typeof FilterTypes)[keyof typeof FilterTypes];

type Filter = {
  type: FilterType;
  columnId: string;
  customComponent?: ElementType;
  customFitlerFn?: (data: any[], value: string, columnId: string) => any[];
};

export function useTableFilter<T>(data: T[], filters: Filter[]) {
  const [activeFilters, setActiveFilters] = useState<string[]>([]); //column ids - constraint one filter per column
  const [filterViewData, setFilterViewData] = useState<Record<string, any>>({});
  const { fn: stringFilterFn, view: StringFilter } = useStringFilter();

  const filterViews = useMemo(
    () =>
      activeFilters.map((f) => {
        const filterData = filters.find((filter) => filter.columnId === f);
        if (!filterData) {
          return null;
        }

        switch (filterData.type) {
          case FilterTypes.text:
            return (
              <StringFilter
                key={filterData.columnId}
                value={filterViewData[filterData.columnId]}
                setValue={(value: any) => {
                  setFilterViewData({
                    ...filterViewData,
                    [filterData?.columnId]: value,
                  });
                }}
                columnId={filterData.columnId}
              />
            );
          case FilterTypes.custom: {
            const Component = filterData.customComponent;
            if (!Component) {
              return null;
            }

            return (
              <Component
                key={filterData.columnId}
                value={filterViewData[filterData.columnId]}
                setValue={(value: any) => {
                  setFilterViewData({
                    ...filterViewData,
                    [filterData?.columnId]: value,
                  });
                }}
                columnId={filterData.columnId}
              />
            );
          }
          default:
            return null;
        }
      }),
    [activeFilters, filterViewData, setFilterViewData, StringFilter, filters]
  );

  const filteredData = useMemo(() => {
    if (activeFilters.length === 0) {
      return data;
    }

    return activeFilters.reduce((acc, filter) => {
      const filterData = filters.find((fd) => fd.columnId === filter);

      if (!filterData) {
        return acc;
      }

      switch (filterData.type) {
        case FilterTypes.text:
          return stringFilterFn(
            acc,
            filterViewData[filterData.columnId],
            filter
          );
        case FilterTypes.custom:
          if (filterData.customFitlerFn) {
            return filterData.customFitlerFn(
              acc,
              filterViewData[filterData.columnId],
              filter
            );
          }
          return acc;
        default:
          return acc;
      }
    }, data);
  }, [data, activeFilters, filterViewData, filters, stringFilterFn]);

  return { filteredData, filterViews, activeFilters, setActiveFilters };
}
