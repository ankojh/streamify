import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
  XAxis,
  YAxis,
} from "recharts";
import Card from "../../../components/Card";
import { numberAbbr } from "../../../utils/numbers";
import { SectionHeader } from "../../../components/SectionHeader";
import {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";

type Props = {
  data: Array<{
    song_title: string;
    artist: string;
    stream_count: number;
    artist_id: number;
    song_id: number;
    song_art: string;
    song_rank: number;
  }>;
};

export function TopStreamsChart({ data }: Props) {
  return (
    <Card className="col-span-2">
      <SectionHeader>Top Streamed Songs</SectionHeader>
      <ResponsiveContainer width="100%" height="90%" className={"text-sm"}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="1 10" />
          <XAxis dataKey="song_rank" tickFormatter={(value) => `#${value}`} />
          <YAxis tickFormatter={(value) => numberAbbr(value)} />
          <Tooltip content={<TopStreamsChartTooltip />} />
          <Bar dataKey="stream_count" fill="#4E8BC4" />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}

function TopStreamsChartTooltip({
  payload,
}: TooltipProps<ValueType, NameType>) {
  if (!payload || payload?.length !== 1) {
    return null;
  }

  return (
    <div className="bg-white p-3 rounded-md shadow-md border border-gray-200 max-w-[200px]">
      <div className="flex justify-center mb-2">
        <img
          src={payload[0].payload.song_art}
          alt="song art"
          className="w-24 rounded-xl "
        />
      </div>
      <div className="text-sm">
        <div className="font-semibold text-nowrap overflow-hidden text-ellipsis ">
          {payload[0].payload.song_title}
        </div>
        <div className="font-medium text-nowrap overflow-hidden text-ellipsis ">
          {payload[0].payload.artist}
        </div>
        <div className="text-nowrap overflow-hidden text-ellipsis ">
          Streamed {numberAbbr(payload[0].payload.stream_count)} times
        </div>
      </div>
    </div>
  );
}
