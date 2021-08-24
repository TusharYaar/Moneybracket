import uuid from 'react-native-uuid';
export default class Transaction {
  constructor(amount, currency, description, category, date) {
    this.id = uuid.v4();
    this.date = date ? date : new Date();
    this.amount = amount;
    this.currency = currency;
    this.description = description ? description : 'No description provided';
    this.category = category ? category : 'general';
  }
}
