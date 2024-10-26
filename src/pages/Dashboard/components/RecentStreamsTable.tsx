import { ColumnDef } from "@tanstack/react-table";
import { Table } from "../../../components/Table";
import Card from "../../../components/Card";
import { numberAbbr } from "../../../utils/numbers";
import { format } from "date-fns";
import { REVENUE_TYPES_LABEL_MAP } from "../../../constants/revenueType";

type RecentStreams = {
  artist: string;
  song_title: string;
  stream_count: number;
  date: string;
  revenue_type: string;
};

const columns: ColumnDef<RecentStreams>[] = [
  {
    accessorKey: "artist",
    header: "Artist",
  },
  {
    accessorKey: "song_title",
    header: "Song",
  },
  {
    accessorKey: "streamCount",
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
  {
    accessorKey: "revenueType",
    header: "Revenue Type",
    cell: ({ row }) => {
      const c = row.original.revenue_type;
      console.log(c);
      return REVENUE_TYPES_LABEL_MAP[row.original.revenue_type];
    },
  },
];

export function RecentStreamsTable({ data }: { data: Array<RecentStreams> }) {
  return (
    <Card>
      <Table data={data} columns={columns} />
    </Card>
  );
}
