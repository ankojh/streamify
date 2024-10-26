import { abbreviateNumber } from "js-abbreviation-number";

export const numberAbbr = (num: number) => {
  if (isNaN(num)) return "-";

  return abbreviateNumber(num, 2, {
    symbols: ["", "k", "M", "B", "T", "P", "E", "Z", "Y"],
    padding: false,
  });
};
