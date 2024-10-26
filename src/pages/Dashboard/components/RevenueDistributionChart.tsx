import { Cell, Pie, PieChart, Tooltip } from "recharts";
import Card from "../../../components/Card";
import ChartLegend from "../../../components/ChartLegend";
import { useState } from "react";
import { RevenueDistributionChartTooltip } from "./RevenueDistributionChartTooltip";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FFFFFF"];

type Props = {
  data: Array<{ type: string; revenue: number }>;
};

export function RevenueDistributionChart({ data }: Props) {
  const [clickedIndex, setClickedIndex] = useState(-1);

  return (
    <Card className="pb-10">
      <div className="flex justify-between items-center">
        Revenue Distribution
      </div>
      <div className="flex flex-col items-center gap-10">
        <PieChart width={200} height={200}>
          <Pie
            data={data}
            cx={95}
            cy={100}
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
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
                  } else {
                    setClickedIndex(index);
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
                  title={type}
                />
              );
            })}
          </div>
        </div>
      </div>
    </Card>
  );
}
