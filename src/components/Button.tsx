type Props = {
  children: React.ReactNode | string;
  onClick?: () => void;
};

export function Button({ children, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="border border-gray-200 rounded-lg p-2 text-sm"
    >
      {children}
    </button>
  );
}
