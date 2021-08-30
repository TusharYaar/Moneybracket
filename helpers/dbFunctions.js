import {Database, Q} from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';

import schema from '../models/schema';

import TransactionModel from '../models/Transaction';
const adapter = new SQLiteAdapter({
  schema,
});

const database = new Database({
  adapter,
  modelClasses: [TransactionModel],
});

export const getTransactions = async () => {
  const newTransactionWriter = await database.write(async () => {
    const query = await database
      .get('transactions')
      .query(Q.where('base_currency', ''))
      .fetch();
    // query.forEach(async res => await res.destroyPermanently());
    console.log(query);
  });
};

export const insertTransactions = async transactionDet => {
  const newTransactionWriter = await database.write(async () => {
    const newTransaction = await database
      .get('transactions')
      .create(transaction => {
        // transaction.transaction_amount = transaction.transaction_amount;
        // transaction.transaction_currency = ;
        // transaction.base_currency = 'INR';
        // transaction.conversion_rate = 1;
        // transaction.transaction_date = new Date();
        // transaction.transaction_type = 'income';
        // transaction.note = 'Salary';
        // transaction.category = 'Salary';
        // transaction.created_at = new Date();
        // transaction.modified_at = new Date();
        transaction = {...transaction, ...transactionDet};
      });
    console.log(newTransaction);
  });
};

// {name: 'transaction_id', type: 'string'},
// {name: 'transaction_amount', type: 'number'},
// {name: 'transaction_currency', type: 'string'},
// {name: 'base_currency', type: 'string'},
// {name: 'conversion_rate', type: 'number'},
// {name: 'modified_at', type: 'number'},
// {name: 'note', type: 'string', isOptional: true},
// {name: 'category', type: 'string'},
// {name: 'transaction_date', type: 'number'},
// {name: 'created_at', type: 'number'},
// {name: 'transaction_type', type: 'string'},
