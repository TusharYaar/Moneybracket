import ExchangeRate from '../models/exchangeRate.js'; //(key, code, country, flag, symbol)
const rates = [
  new ExchangeRate(
    'india',
    'INR',
    'India',
    'https://www.countryflags.io/in/flat/64.png',
    '₹',
  ),
  new ExchangeRate(
    'united_states_of_america',
    'USD',
    'United States of America',
    'https://www.countryflags.io/us/flat/64.png',
    '$',
  ),
  new ExchangeRate(
    'united_kingdom',
    'GBP',
    'United Kingdom',
    'https://www.countryflags.io/gb/flat/64.png',
    '£',
  ),
  new ExchangeRate(
    'japan',
    'JPY',
    'Japan',
    'https://www.countryflags.io/jp/flat/64.png',
    '¥',
  ),
  new ExchangeRate(
    'canada',
    'CAD',
    'Canada',
    'https://www.countryflags.io/ca/flat/64.png',
    '$',
  ),
  new ExchangeRate(
    'australia',
    'AUD',
    'Australia',
    'https://www.countryflags.io/au/flat/64.png',
    '$',
  ),

  new ExchangeRate(
    'switzerland',
    'CHF',
    'Switzerland',
    'https://www.countryflags.io/ch/flat/64.png',
    'CHF',
  ),
  new ExchangeRate(
    'russia',
    'RUB',
    'Russia',
    'https://www.countryflags.io/ru/flat/64.png',
    'RUB',
  ),
  new ExchangeRate(
    'new_zealand',
    'NZD',
    'New Zealand',
    'https://www.countryflags.io/nz/flat/64.png',
    '$',
  ),
  new ExchangeRate(
    'singapore',
    'SGD',
    'Singapore',
    'https://www.countryflags.io/sg/flat/64.png',
    '$',
  ),
  new ExchangeRate(
    'mexico',
    'MXN',
    'Mexico',
    'https://www.countryflags.io/mx/flat/64.png',
    '$',
  ),
  new ExchangeRate(
    'brazil',
    'BRL',
    'Brazil',
    'https://www.countryflags.io/br/flat/64.png',
    'R$',
  ),
  new ExchangeRate(
    'south_korea',
    'KRW',
    'South Korea',
    'https://www.countryflags.io/kr/flat/64.png',
    '₩',
  ),
  new ExchangeRate(
    'malaysia',
    'MYR',
    'Malaysia',
    'https://www.countryflags.io/my/flat/64.png',
    'RM',
  ),
  new ExchangeRate(
    'china',
    'CNY',
    'China',
    'https://www.countryflags.io/cn/flat/64.png',
    '¥',
  ),
  new ExchangeRate(
    'thailand',
    'THB',
    'Thailand',
    'https://www.countryflags.io/th/flat/64.png',
    '฿',
  ),
  new ExchangeRate(
    'czech_republic',
    'CZK',
    'Czech Republic',
    'https://www.countryflags.io/cz/flat/64.png',
    'Kč',
  ),
  new ExchangeRate(
    'hong_kong',
    'HKD',
    'Hong Kong',
    'https://www.countryflags.io/hk/flat/64.png',
    'HK$',
  ),
];

export default avalibleExchangeRates = rates.sort((a, b) => {
  return a.country.localeCompare(b.country);
});
