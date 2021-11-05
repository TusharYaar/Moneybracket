export default class ExchangeRate {
  constructor(key, code, country, flag, symbol) {
    this.key = key;
    this.code = code;
    this.country = country;
    this.flag = `https://flagcdn.com/64x48/${flag ? flag : 'in'}.png`;
    this.symbol = symbol;
  }
}
