import { ReactNode } from "react";

type Props = {
  children: string | ReactNode;
};

export function SectionHeader({ children }: Props) {
  return <div className="mb-4 text-xl font-semibold">{children}</div>;
}
