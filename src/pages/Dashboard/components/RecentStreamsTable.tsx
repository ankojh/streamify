import { ColumnDef } from "@tanstack/react-table";
import { Table } from "../../../components/Table";
import Card from "../../../components/Card";
import { numberAbbr } from "../../../utils/numbers";
import { format } from "date-fns";
import { SectionHeader } from "../../../components/SectionHeader";
import { useTableFilter } from "../hooks/useTableFilter";

type RecentStreams = {
  artist: string;
  song_title: string;
  stream_count: number;
  date: string;
  revenue_type: string;
  userId: string;
};

export function RecentStreamsTable({ data }: { data: Array<RecentStreams> }) {
  const columns: ColumnDef<RecentStreams>[] = [
    {
      accessorKey: "userId",
      header: "User Id",
    },
    {
      id: "artist",
      accessorKey: "artist",
      header: "Artist",
    },
    {
      accessorKey: "song_title",
      header: "Song",
    },
    {
      accessorKey: "stream_count",
      header: "Stream Count",
      cell: ({ row }) => {
        return numberAbbr(row.original.stream_count);
      },
    },
    {
      accessorKey: "date",
      header: "Last Streamed",
      cell: ({ row }) => {
        return format(row.original.date, "MMM dd, yyyy");
      },
    },
  ];

  const { filteredData, filterViews, activeFilters, setActiveFilters } =
    useTableFilter(data, [
      {
        columnId: "artist",
        type: "text",
      },
      {
        columnId: "song_title",
        type: "text",
      },
    ]);

  return (
    <Card>
      <SectionHeader>Recent Streams</SectionHeader>
      <Table
        data={filteredData}
        columns={columns}
        activeFilters={activeFilters}
        setActiveFilters={setActiveFilters}
        filterViews={filterViews}
      />
    </Card>
  );
}
