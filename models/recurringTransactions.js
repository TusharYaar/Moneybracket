import {field, text} from '@nozbe/watermelondb/decorators';
import {Model} from '@nozbe/watermelondb';

export default class RecurringPaymentsModel extends Model {
  static table = 'recurringTransactions';

  @text('base_currency') base_currency;
  @text('transaction_currency') transaction_currency;
  @text('transaction_type') transaction_type;
  @text('note') note;
  @text('category') category;
  @text('recurring_period') recurring_period;

  @field('conversion_rate') conversion_rate;
  @field('transaction_amount') transaction_amount;
  @field('created_on') created_on;
  @field('latest_transaction_date') latest_transaction_date;
}
