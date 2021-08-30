import {field, text} from '@nozbe/watermelondb/decorators';
import {Model} from '@nozbe/watermelondb';

export default class TransactionModel extends Model {
  static table = 'transactions';

  @text('base_currency') base_currency;
  @text('transaction_currency') transaction_currency;
  @text('transaction_type') transaction_type;
  @text('note') note;
  @text('selectedCategory') selectedCategory;

  @field('transaction_amount') transaction_amount;
  @field('transaction_date') transaction_date;
  @field('created_on') created_on;
}
