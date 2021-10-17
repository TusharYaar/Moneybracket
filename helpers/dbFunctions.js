import {Database, Q} from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';

import schema from '../models/schema';

import TransactionModel from '../models/transaction';
const adapter = new SQLiteAdapter({
  schema,
});

const database = new Database({
  adapter,
  modelClasses: [TransactionModel],
});

export const getTransactions = async () => {
  // const writer = await database.write(async () => {
  try {
    const query = await database.get('transactions').query().fetch();
    // query.forEach(async res => await res.destroyPermanently());
    var arr = [];
    query.forEach(tran => {
      arr.push(tran._raw);
    });
    return arr;
  } catch (error) {
    console.log(error);
  }
  // });
};

export const insertTransactions = async transactionDet => {
  const writerDb = await database.write(async () => {
    const newTransaction = await database
      .get('transactions')
      .create(transaction => {
        transaction.transaction_amount = transactionDet.transaction_amount;
        transaction.transaction_currency = transactionDet.transaction_currency;
        transaction.base_currency = transactionDet.base_currency;
        transaction.conversion_rate = transactionDet.conversion_rate;
        transaction.transaction_date = transactionDet.transaction_date;
        transaction.transaction_type = transactionDet.transaction_type;
        transaction.note = transactionDet.note;
        transaction.category = transactionDet.category;
        transaction.created_on = transactionDet.created_on;
      });
    return newTransaction._raw;
  });
  return writerDb;
  // return newTransaction._raw;
};

export const deleteTransactionFromDb = async id => {
  try {
    const writerDb = await database.write(async () => {
      const transaction = await database
        .get('transactions')
        .query(Q.where('id', id))
        .fetch();
      if (transaction.length > 0) {
        await transaction[0].destroyPermanently();
        return true;
      }
      return false;
    });
    if (writerDb) return true;
    else throw new Error('No Element Found');
  } catch (err) {
    return false;
  }
};
