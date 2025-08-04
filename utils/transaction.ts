import { format, isAfter } from "date-fns";
import { compareAsc } from "date-fns";
import { GroupedTransactions, TransactionWithCategory } from "../types";

export const transactionWithinDates = (date: Date, start: Date, end: Date) => {
  if (compareAsc(date, start) !== -1 && compareAsc(end, date) !== -1) return true;
  return false;
};

const STORAGE_DATE_FORMAT = "dd-MMM-yyyy";

export const groupTransactionByDate = (
  transactions: TransactionWithCategory[],
  start?: Date,
  end?: Date
): GroupedTransactions[] => {
  const newData: Record<string, GroupedTransactions> = transactions.reduce((prev, curr) => {
    const key = format(curr.date, STORAGE_DATE_FORMAT);
    if (prev[key] !== undefined) {
      prev[key] = {
        date: curr.date,
        amount:
          curr.category.type === "expense"
            ? prev[key].amount - curr.amount * curr.conversionRate
            : prev[key].amount + curr.amount * curr.conversionRate,
        transactions: prev[key].transactions.concat(curr),
      };
    } else
      prev[key] = {
        date: curr.date,
        amount: ((curr.category.type === "expense" ? -1 : 1  ) * curr.amount * curr.conversionRate),
        transactions: [curr],
      };
    return prev;
  }, {});

  const values = Object.values(newData);
  return values.sort((a, b) => (isAfter(a.date, b.date) ? -1 : 1));
};

const calculateAmount = (transactions: TransactionWithCategory[]) => {
  let amount = 0;
  transactions.forEach((t) => {
    if (t.category.type === "income") {
      amount += t.amount;
    } else if (t.category.type === "expense") {
      amount -= t.amount;
    }
  });
  return amount;
};

// export const calcuateTotal = (transactions: TransactionWithCategory[]) => {
//   let calculated = {
//     allTime: {
//       income: 0,
//       expense: 0,
//       transfer: 0,
//     },
//     thisMonth: {
//       income: 0,
//       expense: 0,
//       transfer: 0,
//     },
//     today: {
//       income: 0,
//       expense: 0,
//       transfer: 0,
//     },
//   };
//   const today = new Date();

//   transactions.forEach(({ category, date, amount }) => {
//     calculated.allTime[category.type] += amount;
//     if (transactionWithinDates(date, startOfDay(today), endOfDay(today))) {
//       calculated.today[category.type] += amount;
//     }

//     if (transactionWithinDates(date, startOfMonth(date), endOfMonth(today))) {
//       calculated.thisMonth[category.type] += amount;
//     }
//   });

//   return calculated;
// };
