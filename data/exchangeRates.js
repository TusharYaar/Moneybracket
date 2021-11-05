import ExchangeRate from '../models/exchangeRate.js'; //(key, code, country, flag, symbol)
const rates = [
  new ExchangeRate('india', 'INR', 'India', 'in', '₹'),
  new ExchangeRate(
    'united_states_of_america',
    'USD',
    'United States of America',
    'us',
    '$',
  ),
  new ExchangeRate('united_kingdom', 'GBP', 'United Kingdom', 'gb', '£'),
  new ExchangeRate('japan', 'JPY', 'Japan', 'jp', '¥'),
  new ExchangeRate('canada', 'CAD', 'Canada', 'ca', '$'),
  new ExchangeRate('australia', 'AUD', 'Australia', 'au', '$'),

  new ExchangeRate('switzerland', 'CHF', 'Switzerland', 'ch', 'CHF'),
  new ExchangeRate('russia', 'RUB', 'Russia', 'ru', 'RUB'),
  new ExchangeRate('new_zealand', 'NZD', 'New Zealand', 'nz', '$'),
  new ExchangeRate('singapore', 'SGD', 'Singapore', 'sg', '$'),
  new ExchangeRate('mexico', 'MXN', 'Mexico', 'mx', '$'),
  new ExchangeRate('brazil', 'BRL', 'Brazil', 'br', 'R$'),
  new ExchangeRate('south_korea', 'KRW', 'South Korea', 'kr', '₩'),
  new ExchangeRate('malaysia', 'MYR', 'Malaysia', 'my', 'RM'),
  new ExchangeRate('china', 'CNY', 'China', 'cn', '¥'),
  new ExchangeRate('thailand', 'THB', 'Thailand', 'th', '฿'),
  new ExchangeRate('czech_republic', 'CZK', 'Czech Republic', 'cz', 'Kč'),
  new ExchangeRate('hong_kong', 'HKD', 'Hong Kong', 'hk', 'HK$'),
];

export default avalibleExchangeRates = rates.sort((a, b) => {
  return a.country.localeCompare(b.country);
});
