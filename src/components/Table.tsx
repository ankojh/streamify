import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ReactNode, useMemo, useState } from "react";
import { Dropdown } from "./Dropdown";

export function Table<T>({
  data,
  columns,
  activeFilters,
  setActiveFilters,
  filterViews,
}: {
  data: T[];
  columns: ColumnDef<T>[];
  activeFilters: string[];
  setActiveFilters: (value: string[]) => void;
  filterViews: ReactNode[];
}) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
    columns,
    filterFns: {},
    state: {
      columnFilters,
    },
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(), //client side filtering
    getSortedRowModel: getSortedRowModel(),
  });

  const filterHeaderOptions = useMemo(() => {
    return table
      .getHeaderGroups()
      .map((headerGroup) => headerGroup.headers.map((header) => header.id))[0]
      .map((v) => {
        return { label: v, value: v };
      });
  }, [table]);

  return (
    <>
      <div className="flex gap-4">
        <Dropdown
          title="Filter"
          options={filterHeaderOptions}
          selectedOption={activeFilters}
          onSelectionChange={setActiveFilters}
        />

        <div className="flex gap-4">
          {filterViews.map((filterView, i) => (
            <div key={i} className="h-5 border-2 border-gray-200">
              {filterView}
            </div>
          ))}
        </div>
      </div>
      <table className="w-full text-sm">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="text-left bg-[#C2E1FC]">
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="p-1 font-semibold"
                  // onClick={header.column.getToggleSortingHandler()}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                  {/* {{
                    asc: <i className="ri-arrow-up-s-line"></i>,
                    desc: <i className="ri-arrow-down-s-line"></i>,
                  }[header.column.getIsSorted() as string] ?? null} */}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="border-b border-gray-200 m-2">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="p-1">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
          {table.getRowModel().rows.length === 0 && (
            <tr>
              <td colSpan={columns.length} className="p-2">
                No data found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}
