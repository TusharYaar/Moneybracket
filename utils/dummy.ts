import { add, startOfDay } from "date-fns";
import { Transaction } from "types";

export const generateDummyTransaction: () => Omit<Transaction, "id"| "category">[] = () => {
  let ar = [];
  for (let i = 0; i < 50; i++) {
    let amount = 1000;
    let date = new Date();
    if (Math.random() > 0.7) amount = Math.round(Math.random() * 10000);
    else amount = Math.round(Math.random() * 3000);
    let days = Math.round(Math.random() * 28);
    if (Math.random() > 0.6) {
      let months = Math.ceil(Math.random() * 4);
      date = add(new Date(), {
        days,
        months,
      });
    } else {
      date = add(new Date(), {
        days,
      });
    }
    ar.push({ date: startOfDay(date), amount, note: `dummy transaction ${i}`, currency: "INR" });
  }
  return ar;
};
