import {field, text} from '@nozbe/watermelondb/decorators';
import {Model} from '@nozbe/watermelondb';

export default class RecurringPayments extends Model {
  static table = 'recurringPayments';

  @text('base_currency') base_currency;
  @text('transaction_currency') transaction_currency;
  @text('transaction_type') transaction_type;
  @text('note') note;
  @text('category') category;

  @field('transaction_amount') transaction_amount;
  @field('recurring_period') recurring_period;
}
