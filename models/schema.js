import {appSchema, tableSchema} from '@nozbe/watermelondb';

export default mySchema = appSchema({
  version: 4,
  tables: [
    tableSchema({
      name: 'transactions',
      columns: [
        {name: 'transaction_type', type: 'string'},
        {name: 'transaction_amount', type: 'number'},
        {name: 'transaction_currency', type: 'string'},
        {name: 'base_currency', type: 'string'},
        {name: 'conversion_rate', type: 'number'},
        {name: 'note', type: 'string', isOptional: true},
        {name: 'category', type: 'string'},
        {name: 'transaction_date', type: 'string'},
        {name: 'created_on', type: 'string'},
      ],
    }),
    tableSchema({
      name: 'recurringTransactions',
      columns: [
        {name: 'transaction_type', type: 'string'},
        {name: 'transaction_amount', type: 'number'},
        {name: 'transaction_currency', type: 'string'},
        {name: 'base_currency', type: 'string'},
        {name: 'conversion_rate', type: 'number'},
        {name: 'note', type: 'string', isOptional: true},
        {name: 'category', type: 'string'},
        {name: 'letest_transaction_date', type: 'string'},
        {name: 'recurring_period', type: 'string'},
        {name: 'created_on', type: 'string'},
      ],
    }),
  ],
});
