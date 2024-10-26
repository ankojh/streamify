import StatsCard from "./components/StatsCard";
import { numberAbbr } from "../../utils/numbers";
import { UsersGrowthChart } from "./components/UserGrowthChart";
import { RevenueDistributionChart } from "./components/RevenueDistributionChart";
import { TopStreamsChart } from "./components/TopStreamsChart";
import { RecentStreamsTable } from "./components/RecentStreamsTable";
import { MOCK_DASHBOARD_DATA } from "../../__mockData__/data";

export default function Dashboard() {
  //ideally fetch data from an endpoint here.
  const fetchedData = MOCK_DASHBOARD_DATA;

  return (
    <>
      <div className="flex justify-between gap-5 mb-8 md:flex-row flex-col">
        <StatsCard icon="ri-group-3-line" subTitle="Total Users">
          {numberAbbr(fetchedData.total_users)}
        </StatsCard>
        <StatsCard icon="ri-user-heart-line" subTitle="Active Users">
          {numberAbbr(fetchedData.active_users)}
        </StatsCard>
        <StatsCard icon="ri-play-circle-line" subTitle="Total Streams">
          {numberAbbr(fetchedData.total_streams)}
        </StatsCard>
        <StatsCard icon="ri-money-dollar-circle-line" subTitle="Revenue">
          ${numberAbbr(fetchedData.revenue)}
        </StatsCard>
        <StatsCard icon="ri-medal-line" subTitle="Top Artist">
          {fetchedData.top_artist}
        </StatsCard>
      </div>
      <div className="mb-8">
        <UsersGrowthChart data={fetchedData.weekly_user_growth_trend} />
      </div>
      <div className="grid grid-cols-3 gap-8 h-[400px] mb-8">
        <RevenueDistributionChart data={fetchedData.revenue_distribution} />
        <TopStreamsChart data={fetchedData.top_streamed_songs} />
      </div>
      <div>
        <RecentStreamsTable data={fetchedData.recent_streams} />
      </div>
    </>
  );
}
