import Card from "../../../components/Card";

type Props = {
  subTitle: string;
  icon: string;
  children: number | React.ReactNode;
};

export default function StatsCard({ subTitle, children, icon }: Props) {
  return (
    <Card>
      <div className="mb-1">
        <i className={`${icon} text-2xl`}></i>
      </div>
      <div className="text-4xl text-black text-ellipsis overflow-hidden text-nowrap min-w-0">
        {children}
      </div>
      <p className="text-gray-500">{subTitle}</p>
    </Card>
  );
}
