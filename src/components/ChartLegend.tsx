import { numberAbbr } from "../utils/numbers";

export default function ChartLegend({
  color,
  content,
  title,
}: {
  color?: string;
  content: string;
  title: string;
}) {
  return (
    <div className="flex gap-4 justify-between">
      <div className="flex gap-2">
        <div
          className="h-5 w-5"
          style={{ backgroundColor: color ?? "white" }}
        ></div>
        <div>{title}</div>
      </div>
      <div>{numberAbbr(Number(content))}</div>
    </div>
  );
}
