export default class ExchangeRate {
  constructor(key, code, country, flag, symbol) {
    this.key = key;
    this.code = code;
    this.country = country;
    this.flag = flag ? flag : 'notDefined';
    this.symbol = symbol;
  }
}
