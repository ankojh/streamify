import { TooltipProps } from "recharts";
import {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";
import ChartLegend from "../../../components/ChartLegend";
import { numberAbbr } from "../../../utils/numbers";

export function RevenueDistributionChartTooltip({
  payload,
}: TooltipProps<ValueType, NameType>) {
  if (!payload || payload?.length !== 1) {
    return null;
  }

  return (
    <div className="bg-white p-3 rounded-md shadow-md border border-gray-200 text-sm">
      <ChartLegend
        title={payload[0].payload.type}
        color={payload[0].payload.fill}
        content={numberAbbr(payload[0].payload.value)}
      />
    </div>
  );
}
