import {Database, Q} from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';

import schema from '../models/schema';

import TransactionModel from '../models/transaction';
import RecurringTransactionsModel from '../models/recurringTransactions';

const adapter = new SQLiteAdapter({
  schema,
});
const database = new Database({
  adapter,
  modelClasses: [TransactionModel, RecurringTransactionsModel],
});

/**
 *
 * @returns aLL transactions
 */
export const getTransactions = async () => {
  try {
    const query = await database.get('transactions').query().fetch();
    var arr = [];
    query.forEach(tran => {
      arr.push(tran._raw);
    });
    return arr;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

/**
 *
 * @param {object} transactionDet
 * @returns transaction object
 */
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
};

/**
 *
 * @param {string} id
 * @returns {boolean} true if deleted
 * @throws {error} if id doesnot exists
 */
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

/**
 *
 * @returns {object} all recurring Transactions
 */
export const getAllRecurringTransactions = async () => {
  try {
    const query = await database.get('recurringTransactions').query().fetch();
    var arr = [];
    query.forEach(tran => {
      arr.push(tran._raw);
    });
    return arr;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const insertRecurringTransaction = async recurringPaymentDet => {
  const writerDb = await database.write(async () => {
    const newRecurringPayment = await database
      .get('recurringTransactions')
      .create(recurringPayment => {
        recurringPayment.base_currency = recurringPaymentDet.base_currency;
        recurringPayment.transaction_currency =
          recurringPaymentDet.transaction_currency;
        recurringPayment.transaction_type =
          recurringPaymentDet.transaction_type;
        recurringPayment.conversion_rate = recurringPaymentDet.conversion_rate;
        recurringPayment.transaction_amount =
          recurringPaymentDet.transaction_amount;
        recurringPayment.recurring_period =
          recurringPaymentDet.recurring_period;
        recurringPayment.note = recurringPaymentDet.note;
        recurringPayment.category = recurringPaymentDet.category;
        recurringPayment.latest_transaction_date =
          recurringPaymentDet.latest_transaction_date;
        recurringPayment.created_on = recurringPaymentDet.created_on;
      });
    return newRecurringPayment._raw;
  });
  return writerDb;
};
