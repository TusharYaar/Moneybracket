import {
  addDays,
  addMonths,
  addYears,
  differenceInCalendarDays,
  endOfDay,
  endOfMonth,
  endOfYear,
  format,
  isEqual,
  isSameDay,
  isSameMonth,
  isSameYear,
  startOfMonth,
  startOfYear,
  subDays,
  subMonths,
  subYears,
} from "date-fns";

export const formatDateRange = (start: Date, end: Date, dateFormat: string) => {
  if (isEqual(startOfYear(start), start) && isEqual(endOfYear(end), end) && isSameYear(start, end)) {
    return format(start, "yyyy");
  } else if (isEqual(startOfMonth(start), start) && isEqual(endOfMonth(end), end) && isSameMonth(start, end)) {
    return format(start, "MMMM yyyy");
  } else {
    // if (isSameDay(start, end)) {
    //   return format(start, dateFormat);
    // } else if (isSameMonth(start, end)) {
    //   return format(start, dateFormat);
    // } else if (isSameYear(start, end)) {
    // } else {
    // let rangeDateFormat = dateFormat.split("dd");
    // let result = ""

    // for (const i of rangeDateFormat) {
    //     if (i === "") {
    //         result
    //     }
    //     else {
    //         result += format(start, i)
    //     }
    // }
    return `${format(start, dateFormat)} - ${format(end, dateFormat)}`;
    // }
  }
};

export const determineDateShift = (start: Date, end: Date, shiftDir: number): [Date, Date] => {
  let shiftFunction = shiftDir > 0 ? addDays : subDays;
  let shiftBy = 1;
  let newStart: Date;
  let newEnd: Date;
  if (isSameDay(start, end)) {
    shiftBy = 1;
    newStart = shiftFunction(start, shiftBy);
    newEnd = endOfDay(newStart);
  } else if (isSameMonth(start, end) && isEqual(startOfMonth(start), start) && isEqual(endOfMonth(end), end)) {
    shiftFunction = shiftDir > 0 ? addMonths : subMonths;
    newStart = startOfMonth(shiftFunction(start, shiftBy));
    newEnd = endOfMonth(newStart);
  } else if (isEqual(startOfYear(start), start) && isEqual(endOfYear(end), end) && isSameYear(start, end)) {
    shiftFunction = shiftDir > 0 ? addYears : subYears;
    newStart = startOfYear(shiftFunction(start, shiftBy));
    newEnd = endOfYear(newStart);
  } else {
    shiftBy = differenceInCalendarDays(start, end);
    newStart = shiftFunction(start, shiftBy);
    newEnd = shiftFunction(end, shiftBy);
  }

  return [newStart, newEnd];
};
