export default class ExchangeRate {
  constructor(code, country, flag, symbol) {
    this.code = code;
    this.country = country;
    this.flag = flag ? flag : 'notDefined';
    this.symbol = symbol;
  }
}
