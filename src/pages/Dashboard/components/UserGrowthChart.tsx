import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceArea,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
  XAxis,
  YAxis,
} from "recharts";
import Card from "../../../components/Card";
import { format } from "date-fns";
import { numberAbbr } from "../../../utils/numbers";
import { useCallback, useMemo, useState } from "react";
import { Button } from "../../../components/Button";
import { SectionHeader } from "../../../components/SectionHeader";
import {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";
import ChartLegend from "../../../components/ChartLegend";

type ChartDataItem = {
  date: string;
  total_user: number;
  active_user: number;
};

// For zoon in and out functionality - The chart is listening to mouse events to identify the left and right areas of the chart selection
// with those areas identified, the chart data is being sliced and the chart is being redrawn

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

  const zoomIn = useCallback(() => {
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
  }, [chartState, data]);

  const zoomOut = useCallback(() => {
    setChartState({
      ...chartState,
      data: data,
      refAreaLeftIndex: -1,
      refAreaRightIndex: -1,
      refAreaLeft: "",
      refAreaRight: "",
      isMouseDown: false,
    });
  }, [chartState, data]);

  const isZoomedIn = useMemo(() => {
    return data.length !== chartState.data.length;
  }, [chartState.data, data]);

  return (
    <Card className="h-[500px] w-full text-sm select-none">
      <SectionHeader>
        <div className="flex justify-between items-center">
          <div>User Growth</div>
          <div>{isZoomedIn && <Button onClick={zoomOut}>Reset</Button>}</div>
        </div>
      </SectionHeader>
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
            stroke="#4E8BC4"
            strokeWidth={2}
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="total_user"
            stroke="#FF99BE"
            strokeWidth={2}
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

function UserGrowthChartTooltip({
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
