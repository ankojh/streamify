import { UsersGrowthChart } from "./components/UserGrowthChart";
import { RevenueDistributionChart } from "./components/RevenueDistributionChart";
import { TopStreamsChart } from "./components/TopStreamsChart";
import { RecentStreamsTable } from "./components/RecentStreamsTable";
import { MOCK_DASHBOARD_DATA } from "../../__mockData__/data";
import { StatsCardSection } from "./components/StatsCardSection";
import { useState } from "react";
import { FilterDataContext } from "./contexts/FilterDataContext";

export default function Dashboard() {
  //ideally fetch data from an endpoint here.
  const fetchedData = MOCK_DASHBOARD_DATA;

  //filter key is the revenue type used for filtering based on the pie chart selection
  const [filterKey, setFilterKey] = useState<string>("");

  return (
    <>
      <StatsCardSection data={fetchedData} />

      <div className="md:mb-8 mb-4">
        <UsersGrowthChart data={fetchedData.weekly_user_growth_trend} />
      </div>

      <FilterDataContext.Provider
        value={{
          filterKey,
          setFilterKey,
        }}
      >
        <div className="md:grid md:grid-cols-3 flex flex-col md:gap-8 gap-4 md:h-[450px] h-[900px] md:mb-8 mb-4">
          <RevenueDistributionChart data={fetchedData.revenue_distribution} />
          <TopStreamsChart data={fetchedData.top_streamed_songs} />
        </div>

        <div>
          <RecentStreamsTable data={fetchedData.recent_streams} />
        </div>
      </FilterDataContext.Provider>
    </>
  );
}
