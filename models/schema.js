import {appSchema, tableSchema} from '@nozbe/watermelondb';

export default mySchema = appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: 'transactions',
      columns: [
        {name: 'transaction_type', type: 'string'},
        {name: 'transaction_amount', type: 'number'},
        {name: 'transaction_currency', type: 'string'},
        {name: 'base_currency', type: 'string'},
        {name: 'conversion_rate', type: 'number'},
        {name: 'modified_at', type: 'number'},
        {name: 'note', type: 'string', isOptional: true},
        {name: 'category', type: 'string'},
        {name: 'transaction_date', type: 'number'},
        {name: 'created_at', type: 'number'},
      ],
    }),
  ],
});
