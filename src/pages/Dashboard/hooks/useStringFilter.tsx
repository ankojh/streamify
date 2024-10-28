export function useStringFilter() {
  return {
    fn: (data: any[], value: string, columnId: string) => {
      if (!value) {
        return data;
      }

      const filter = data.filter((item) => {
        return item[columnId].includes(value);
      });

      console.log("filter", filter);
      return filter;
    },
    view: StringFilter,
  };
}

const StringFilter = ({
  value,
  setValue,
  columnId,
}: {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  columnId: string;
}) => {
  return (
    <input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder={`Filter by ${columnId}`}
    />
  );
};
