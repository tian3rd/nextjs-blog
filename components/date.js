import { parseISO, format } from "date-fns";

export default function Date({ dateString }) {
  const date = parseISO(dateString);
  //   different format options: https://date-fns.org/v2.16.1/docs/format
  return <time dateTime={dateString}>{format(date, "LLLL d, yyyy")}</time>;
}
