import {format, compareAsc} from "date-fns/esm";
import {Results} from "realm";
import {Transaction} from "../realm/Transaction";
import {GroupedTransactions} from "../types";

export const transactionWithinDates = (date: Date, start: Date, end: Date) => {
  if (compareAsc(date, start) && compareAsc(end, date)) {
    return true;
  }
  return false;
};

export const groupTransactionByDate = (
  transactions: Results<Transaction>,
  start: Date,
  end: Date,
  dateFormat = "dd MMM, yy",
): GroupedTransactions[] => {
  return transactions.reduce((result, val) => {
    if (transactionWithinDates(val.date, start, end)) {
      if (result.length === 0) {
        let obj = {
          date: format(val.date, dateFormat),
          transactions: [val],
        };
        result.push(obj);
        return result;
      } else {
        const group = result[result.length - 1];
        if (group.date === format(val.date, dateFormat)) {
          result[result.length - 1] = {
            date: group.date,
            transactions: [...group.transactions, val],
          };
          return result;
        } else {
          let obj = {
            date: format(val.date, dateFormat),
            transactions: [val],
          };
          result.push(obj);
          return result;
        }
      }
    } else return result;
  }, [] as GroupedTransactions[]);
};
