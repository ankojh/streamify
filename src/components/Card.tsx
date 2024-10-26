import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  children?: ReactNode;
  className?: string;
};

export default function Card({ children, className }: Props) {
  return (
    <div
      className={twMerge(
        "bg-white rounded-xl p-5 min-h-10 shadow-sm hover:shadow-none flex-1",
        className
      )}
    >
      {children}
    </div>
  );
}
