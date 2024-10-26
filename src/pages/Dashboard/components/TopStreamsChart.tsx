import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Card from "../../../components/Card";
import { numberAbbr } from "../../../utils/numbers";

type Props = {
  data: Array<{
    song_title: string;
    artist: string;
    stream_count: number;
    artist_id: number;
    song_id: number;
  }>;
};

export function TopStreamsChart({ data }: Props) {
  return (
    <Card className="text-sm col-span-2">
      <div>FASDas</div>
      <ResponsiveContainer width="100%" height={"100%"}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="1 10" />
          <XAxis
            dataKey="song_title"
            tickFormatter={(value) => String(value).substring(0, 10) + "..."}
          />
          <YAxis tickFormatter={(value) => numberAbbr(value)} />
          <Tooltip />
          <Bar dataKey="stream_count" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}
