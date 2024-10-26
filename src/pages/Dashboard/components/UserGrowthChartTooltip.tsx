import { format } from "date-fns";
import { TooltipProps } from "recharts";
import {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";
import ChartLegend from "../../../components/ChartLegend";

export function UserGrowthChartTooltip({
  payload,
  label,
}: TooltipProps<ValueType, NameType>) {
  if (!label || !payload || payload?.length !== 2) return null;

  return (
    <div className="bg-white p-3 rounded-md shadow-md border border-gray-200">
      <div className="font-semibold mb-3">
        {format(new Date(label), "MMM dd, yyyy")}
      </div>
      <div className="flex flex-col gap-2">
        <ChartLegend
          color={payload[1].color}
          content={payload[1].payload.total_user}
          title="Total Users"
        />
        <ChartLegend
          color={payload[0].color}
          content={payload[0].payload.active_user}
          title="Active Users"
        />
      </div>
    </div>
  );
}
