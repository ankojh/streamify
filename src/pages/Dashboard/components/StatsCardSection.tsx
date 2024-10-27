import { useEffect, useState } from "react";
import { numberAbbr } from "../../../utils/numbers";
import StatsCard from "./StatsCard";
import { ReactSortable } from "react-sortablejs";

type Props = {
  data: {
    total_users: number;
    total_user_diff: number;
    active_users: number;
    active_user_diff: number;
    total_streams: number;
    total_streams_diff: number;
    revenue: number;
    revenue_diff: number;
    top_artist: string;
  };
};

export function StatsCardSection({ data }: Props) {
  const [statsData, setStatsData] = useState<
    Array<{
      id: string;
      icon: string;
      subTitle: string;
      diff?: number;
      value: number | string;
    }>
  >([]);

  useEffect(() => {
    setStatsData([
      {
        id: "total_users",
        icon: "ri-group-3-line",
        subTitle: "Total Users",
        diff: data.total_user_diff,
        value: numberAbbr(data.total_users),
      },
      {
        id: "active_users",
        icon: "ri-user-heart-line",
        subTitle: "Active Users",
        diff: data.active_user_diff,
        value: numberAbbr(data.active_users),
      },
      {
        id: "total_streams",
        icon: "ri-play-circle-line",
        subTitle: "Total Streams",
        diff: data.total_streams_diff,
        value: numberAbbr(data.total_streams),
      },
      {
        id: "revenue",
        icon: "ri-money-dollar-circle-line",
        subTitle: "Revenue",
        diff: data.revenue_diff,
        value: numberAbbr(data.revenue),
      },
      {
        id: "top_artist",
        icon: "ri-medal-line",
        subTitle: "Top Artist",
        value: data.top_artist,
      },
    ]);
  }, [data]);

  return (
    <ReactSortable
      list={statsData}
      setList={setStatsData}
      className="flex justify-between gap-5 md:mb-8 mb-4 md:flex-row flex-col"
    >
      {statsData.map(({ icon, subTitle, diff, value, id }) => (
        <StatsCard key={id} icon={icon} subTitle={subTitle} diff={diff}>
          {value}
        </StatsCard>
      ))}
    </ReactSortable>
  );
}
