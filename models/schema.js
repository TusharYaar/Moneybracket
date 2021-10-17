import {appSchema, tableSchema} from '@nozbe/watermelondb';

export default mySchema = appSchema({
  version: 2,
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
  ],
});
