import { endOfDay, endOfMonth, isAfter, startOfDay, startOfMonth } from "date-fns";
import { isSameDay, compareAsc } from "date-fns";
import { GroupedTransactions, TransactionWithCategory} from "../types";

export const transactionWithinDates = (date: Date, start: Date, end: Date) => {
  if (compareAsc(date, start) !== -1 && compareAsc(end, date) !== -1) return true;
  return false;
};

export const groupTransactionByDate = (
  transactions: TransactionWithCategory[],
  start?: Date,
  end?: Date
): GroupedTransactions[] => {
  const data:GroupedTransactions[] =  transactions.reduce((result, val) => {
    if (start && end && !transactionWithinDates(val.date, start, end)) return result;
    if (result.length === 0) {
      let obj = {

        date: val.date,
        transactions: [val],
      };
      result.push(obj);
      return result;
    } else {
      const group = result[result.length - 1];
      if (isSameDay(group.date, val.date)) {
        result[result.length - 1] = {
          date: group.date,
          transactions: [...group.transactions, val],
        };
        return result;
      } else {
        let obj = {
          date: val.date,
          transactions: [val],
        };
        result.push(obj);
        return result;
      }
    }
  }, []);
  
  const complete = data.map(group => ({...group, amount: calculateAmount(group.transactions)}))

  return complete.sort((a,b) => (isAfter(a.date, b.date) ? - 1 : 1));
};


const calculateAmount = (transactions: TransactionWithCategory[]) => {
  let amount = 0;
  transactions.forEach(t => {

    if (t.category.type === "income") {
      amount += t.amount;
    }
    else if(t.category.type === "expense") {
      amount -= t.amount
    }
  })
  return amount;
}

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
