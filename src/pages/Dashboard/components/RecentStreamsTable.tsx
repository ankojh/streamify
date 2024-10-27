import { ColumnDef } from "@tanstack/react-table";
import { Table } from "../../../components/Table";
import Card from "../../../components/Card";
import { numberAbbr } from "../../../utils/numbers";
import { format } from "date-fns";
import { SectionHeader } from "../../../components/SectionHeader";
import { useRevenueFilterContext } from "../hooks/useRevenueFilterContext";
import { useMemo } from "react";

type RecentStreams = {
  artist: string;
  song_title: string;
  stream_count: number;
  date: string;
  revenue_type: string;
  userId: string;
};

const columns: ColumnDef<RecentStreams>[] = [
  {
    accessorKey: "userId",
    header: "User Id",
  },
  {
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

export function RecentStreamsTable({ data }: { data: Array<RecentStreams> }) {
  const { filterKey } = useRevenueFilterContext();

  //memoization for filtering data based on the pie chart segment selection
  const filteredData = useMemo(() => {
    if (filterKey === "") {
      return data;
    }

    return data.filter((item) => item.revenue_type === filterKey);
  }, [filterKey, data]);

  return (
    <Card>
      <SectionHeader>Recent Streams</SectionHeader>
      <Table
        data={filteredData}
        columns={columns}
        searchPlaceholder="Search by song title or artist"
      />
    </Card>
  );
}
