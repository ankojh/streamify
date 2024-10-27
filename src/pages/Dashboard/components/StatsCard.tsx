import Card from "../../../components/Card";
import { twMerge } from "tailwind-merge";

type Props = {
  subTitle: string;
  icon: string;
  children: number | React.ReactNode;
  diff?: number;
};

export default function StatsCard({ subTitle, children, icon, diff }: Props) {
  return (
    <Card>
      <div className="mb-1 flex justify-between items-center min-w-0">
        <i className={`${icon} md:text-2xl text-xl`}></i>

        {diff && (
          <span
            title="WoW %"
            className={twMerge(
              `font-semibold`,
              diff < 0 ? "text-red-500" : "text-green-600"
            )}
          >
            {diff}%
            {diff < 0 ? (
              <i className="ri-arrow-down-line"></i>
            ) : (
              <i className="ri-arrow-up-line"></i>
            )}
          </span>
        )}
      </div>
      <div
        className="md:text-4xl text-xl text-black"
        data-test="stat-card-value"
      >
        {children}
      </div>
      <p className="text-gray-500">{subTitle}</p>
    </Card>
  );
}
