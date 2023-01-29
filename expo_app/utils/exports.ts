import { format } from "date-fns";
import { Transaction } from "../realm/Transaction";

export const createHTML = (
  transactions: Realm.Results<Transaction>,
  order = ["category", "createdAt", "note", "amount"],
  dateFormat = "dd MMMM, yyyy"
) => {
  const total = [0, 0, 0];
  const data = transactions.map((item) => {
    let row = "<tr>";
    order.forEach((value) => {
      if (value === "category") row += `<td>${item.category.title}</td>`;
      else if (value === "createdAt") row += `<td>${format(item.date, dateFormat)}</td>`;
      else if (value === "amount") {
        ["income", "expense", "transfer"].forEach((tType, index) => {
          if (tType === item.category.type) {
            row += `<td class='${item.category.type}'>${item.currency} ${item.amount}</td>`;
            total[index] += item.amount;
          } else row += "<td></td>";
        });
      } else row += `<td>${item[value]}</td>`;
    });
    return row + "</tr>";
  });

  const html = `<html>
                    <head>
                        <meta name="viewport" content="width=device-width, initial-scale=1.0,
                         maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
                         <style>
                         table, th, td {
                            border: 1px solid;
                          }
                          .income {
                            color:green;
                         }  
                         .expense {
                            color: red;
                        }
                        .transfer {
                            color: blue;
                        }
                         </style>
                    </head>
                    <body>
                        <h1>Expense Report </h1>
                        <table>
                            ${data.join("")}
                        <table>
                        <table>
                            <tr><td></td> <td>Total</td>
                            <tr><td>Income</td> <td>${total[0]} </td>
                            <tr><td>Expense</td> <td>${total[1]} </td>
                            <tr><td>Transfer</td> <td>${total[2]} </td>

                        </table>
                    </body>
                </html>`;

  return html;
};

export const createCSV = (
  transactions: Realm.Results<Transaction>,
  order = ["category", "createdAt", "note", "amount"]
) => {
  let header = [];

  order.forEach((key) => {
    if (key === "amount") {
      header.push("Income", "Expense", "Transfer");
    } else header.push(`"${key}"`);
  });

  const headerRow = header.join(",") + "\r\n";

  const data = transactions.reduce((acc, item) => {
    let row = [];
    order.forEach((key) => {
      if (key === "amount") {
        ["income", "expense", "transfer"].forEach((tType, index) => {
          if (tType === item.category.type) {
            row.push(`${item.amount}`);
          } else row.push("");
        });
      } else if (key === "category") row.push(`"${item.category.title}"`);
      else if (key === "createdAt") {
        row.push(`"${format(item.date, "dd MMMM, yyyy")}"`);
      } else {
        row.push(`"${item[key]}"`);
      }
    });
    return acc + row.join(",") + "\r\n";
  }, headerRow);

  return data;
};

export const createJSON = (transaction: Realm.Results<Transaction>) => {
  const data = transaction.map((item) => ({
    amount: item.amount,
    note: item.note,
    category: item.category.title,
    type: item.category.type,
    createdAt: item.createdAt,
  }));
  return data;
};
