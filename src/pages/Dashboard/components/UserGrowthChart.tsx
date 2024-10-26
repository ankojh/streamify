import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceArea,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Card from "../../../components/Card";
import { format } from "date-fns";
import { numberAbbr } from "../../../utils/numbers";
import { useMemo, useState } from "react";
import { UserGrowthChartTooltip } from "./UserGrowthChartTooltip";
import { Button } from "../../../components/Button";

type ChartDataItem = {
  date: string;
  total_user: number;
  active_user: number;
};

export function UsersGrowthChart({ data }: { data: Array<ChartDataItem> }) {
  const [chartState, setChartState] = useState<{
    data: Array<ChartDataItem>;
    refAreaLeft: string;
    refAreaRight: string;
    refAreaLeftIndex: number;
    refAreaRightIndex: number;
    isMouseDown: boolean;
  }>({
    data: data,
    refAreaLeft: "",
    refAreaRight: "",
    refAreaLeftIndex: -1,
    refAreaRightIndex: -1,
    isMouseDown: false,
  });

  function zoomIn() {
    let { refAreaLeftIndex, refAreaRightIndex } = chartState;

    const { refAreaLeft, refAreaRight } = chartState;
    if (
      refAreaLeft === refAreaRight ||
      refAreaLeftIndex === refAreaRightIndex ||
      refAreaLeftIndex === -1 ||
      refAreaRightIndex === -1
    ) {
      setChartState({
        ...chartState,
        refAreaLeft: "",
        refAreaRight: "",
      });
    }
    if (refAreaLeftIndex > refAreaRightIndex) {
      [refAreaLeftIndex, refAreaRightIndex] = [
        refAreaRightIndex,
        refAreaLeftIndex,
      ];
    }

    const slicedData = data.slice(refAreaLeftIndex, refAreaRightIndex + 1);

    if (slicedData.length > 0) {
      setChartState({
        ...chartState,
        data: slicedData,
        refAreaLeft: "",
        refAreaRight: "",
        isMouseDown: false,
      });
    }
  }

  function zoomOut() {
    setChartState({
      ...chartState,
      data: data,
      refAreaLeftIndex: -1,
      refAreaRightIndex: -1,
      refAreaLeft: "",
      refAreaRight: "",
      isMouseDown: false,
    });
  }

  const isZoomedIn = useMemo(() => {
    return data.length !== chartState.data.length;
  }, [chartState.data, data]);

  return (
    <Card className="h-[500px] w-full text-sm select-none">
      <div className="flex justify-between items-center">
        <div className="mb-2 text-xl font-semibold ml-3">User Growth</div>
        <div>{isZoomedIn && <Button onClick={zoomOut}>Reset</Button>}</div>
      </div>
      <ResponsiveContainer width="100%" height="92%" className="">
        <LineChart
          width={500}
          height={300}
          data={chartState.data}
          margin={{
            right: 30,
          }}
          onMouseDown={(e) => {
            setChartState({
              ...chartState,
              refAreaLeft: e.activeLabel ?? "",
              refAreaLeftIndex: e.activeTooltipIndex ?? -1,
              refAreaRight: "",
              refAreaRightIndex: -1,
              isMouseDown: true,
            });
          }}
          onMouseMove={(e) =>
            chartState.refAreaLeft &&
            chartState.isMouseDown &&
            setChartState({
              ...chartState,
              refAreaRight: e.activeLabel ?? "",
              refAreaRightIndex: e.activeTooltipIndex ?? -1,
            })
          }
          onMouseUp={zoomIn}
        >
          <CartesianGrid strokeDasharray="1 10" />
          <XAxis
            dataKey="date"
            tickFormatter={(value) => format(new Date(value), "dd MMM")}
          />
          <YAxis tickFormatter={(value) => numberAbbr(value)} />
          <Tooltip content={<UserGrowthChartTooltip />} />
          <Line
            type="monotone"
            dataKey="active_user"
            stroke="#8884d8"
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="total_user"
            stroke="#82ca9d"
            dot={false}
          />
          <ReferenceArea
            x1={chartState.refAreaLeft}
            x2={chartState.refAreaRight}
            strokeOpacity={0.3}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
}
