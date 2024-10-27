import { Cell, Pie, PieChart, Tooltip, TooltipProps } from "recharts";
import Card from "../../../components/Card";
import ChartLegend from "../../../components/ChartLegend";
import { useState } from "react";
import { REVENUE_TYPES_LABEL_MAP } from "../../../constants/revenueType";
import { SectionHeader } from "../../../components/SectionHeader";
import { useRevenueFilterContext } from "../hooks/useRevenueFilterContext";
import {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";

//hardcoded colors for now - it is known that there will be only 5 types of revenue
const COLORS = ["#4E8BC4", "#96CBFC", "#C2E1FC", "#FFC2D9", "#FF99BE"];

type Props = {
  data: Array<{ type: string; revenue: number }>;
};

export function RevenueDistributionChart({ data }: Props) {
  const [clickedIndex, setClickedIndex] = useState(-1);

  const { setFilterKey } = useRevenueFilterContext();

  return (
    <Card className="pb-10">
      <SectionHeader>Revenue Distribution</SectionHeader>
      <div className="flex flex-col items-center gap-4">
        <PieChart width={200} height={200}>
          <Pie
            data={data}
            cx={95}
            cy={100}
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="revenue"
          >
            {data.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
                style={{
                  transform:
                    index === clickedIndex
                      ? "translate(-15px,-15px) scale(1.15)"
                      : "",
                  scale: index === clickedIndex ? 1.5 : 1,
                  transition: "all 0.5s ease-in-out",
                }}
                className="outline-none cursor-pointer"
                onClick={() => {
                  if (index === clickedIndex) {
                    setClickedIndex(-1);
                    setFilterKey("");
                  } else {
                    setClickedIndex(index);
                    setFilterKey(data[index].type);
                  }
                }}
              />
            ))}
          </Pie>
          <Tooltip content={<RevenueDistributionChartTooltip />} />
        </PieChart>

        <div>
          <div className="flex flex-col gap-2 text-sm">
            {data.map(({ type, revenue }, index) => {
              return (
                <ChartLegend
                  key={index}
                  color={COLORS[index]}
                  content={revenue.toString()}
                  title={REVENUE_TYPES_LABEL_MAP[type]}
                />
              );
            })}
          </div>
        </div>
      </div>
    </Card>
  );
}

function RevenueDistributionChartTooltip({
  payload,
}: TooltipProps<ValueType, NameType>) {
  if (!payload || payload?.length !== 1) {
    return null;
  }

  return (
    <div className="bg-white p-3 rounded-md shadow-md border border-gray-200 text-sm">
      <ChartLegend
        title={REVENUE_TYPES_LABEL_MAP[payload[0].payload.type]}
        color={payload[0].payload.fill}
        content={String(payload[0].value)}
      />
    </div>
  );
}
