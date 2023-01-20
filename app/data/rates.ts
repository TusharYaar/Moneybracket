const RATES = [
  {
    code: "AED",
    decimal_digits: 2,
    name: "United Arab Emirates Dirham",
    name_plural: "UAE dirhams",
    rate: 44.518151,
    rounding: 0,
    symbol: "AED",
    symbol_native: "د.إ.‏",
    isFavorite: true,
  },
  {
    code: "AFN",
    decimal_digits: 0,
    name: "Afghan Afghani",
    name_plural: "Afghan Afghanis",
    rate: 1068.030583,
    rounding: 0,
    symbol: "Af",
    symbol_native: "؋",
  },
  {
    code: "ALL",
    decimal_digits: 0,
    name: "Albanian Lek",
    name_plural: "Albanian lekë",
    rate: 1461.399409,
    rounding: 0,
    symbol: "ALL",
    symbol_native: "Lek",
  },
  {
    code: "AMD",
    decimal_digits: 0,
    name: "Armenian Dram",
    name_plural: "Armenian drams",
    rate: 4789.951512,
    rounding: 0,
    symbol: "AMD",
    symbol_native: "դր.",
  },
  {
    code: "ARS",
    decimal_digits: 2,
    name: "Argentine Peso",
    name_plural: "Argentine pesos",
    rate: 1913.547195,
    rounding: 0,
    symbol: "AR$",
    symbol_native: "$",
  },
  {
    code: "AUD",
    decimal_digits: 2,
    name: "Australian Dollar",
    name_plural: "Australian dollars",
    rate: 19.084196,
    rounding: 0,
    symbol: "AU$",
    symbol_native: "$",
  },
  {
    code: "AZN",
    decimal_digits: 2,
    name: "Azerbaijani Manat",
    name_plural: "Azerbaijani manats",
    rate: 20.613445,
    rounding: 0,
    symbol: "man.",
    symbol_native: "ман.",
  },
  {
    code: "BAM",
    decimal_digits: 2,
    name: "Bosnia-Herzegovina Convertible Mark",
    name_plural: "Bosnia-Herzegovina convertible marks",
    rate: 24.297643,
    rounding: 0,
    symbol: "KM",
    symbol_native: "KM",
  },
  {
    code: "BDT",
    decimal_digits: 2,
    name: "Bangladeshi Taka",
    name_plural: "Bangladeshi takas",
    rate: 1233.729205,
    rounding: 0,
    symbol: "Tk",
    symbol_native: "৳",
  },
  {
    code: "BGN",
    decimal_digits: 2,
    name: "Bulgarian Lev",
    name_plural: "Bulgarian leva",
    rate: 24.276238,
    rounding: 0,
    symbol: "BGN",
    symbol_native: "лв.",
  },
  {
    code: "BHD",
    decimal_digits: 3,
    name: "Bahraini Dinar",
    name_plural: "Bahraini dinars",
    rate: 4.577763,
    rounding: 0,
    symbol: "BD",
    symbol_native: "د.ب.‏",
  },
  {
    code: "BIF",
    decimal_digits: 0,
    name: "Burundian Franc",
    name_plural: "Burundian francs",
    rate: 25003.390337,
    rounding: 0,
    symbol: "FBu",
    symbol_native: "FBu",
  },
  {
    code: "BND",
    decimal_digits: 2,
    name: "Brunei Dollar",
    name_plural: "Brunei dollars",
    rate: 17.206669,
    rounding: 0,
    symbol: "BN$",
    symbol_native: "$",
  },
  {
    code: "BOB",
    decimal_digits: 2,
    name: "Bolivian Boliviano",
    name_plural: "Bolivian bolivianos",
    rate: 83.551483,
    rounding: 0,
    symbol: "Bs",
    symbol_native: "Bs",
  },
  {
    code: "BRL",
    decimal_digits: 2,
    name: "Brazilian Real",
    name_plural: "Brazilian reals",
    rate: 62.015965,
    rounding: 0,
    symbol: "R$",
    symbol_native: "R$",
  },
  {
    code: "BWP",
    decimal_digits: 2,
    name: "Botswanan Pula",
    name_plural: "Botswanan pulas",
    rate: 163.823796,
    rounding: 0,
    symbol: "BWP",
    symbol_native: "P",
  },
  {
    code: "BYN",
    decimal_digits: 2,
    name: "Belarusian Ruble",
    name_plural: "Belarusian rubles",
    rate: 30.534024,
    rounding: 0,
    symbol: "Br",
    symbol_native: "руб.",
  },
  {
    code: "BZD",
    decimal_digits: 2,
    name: "Belize Dollar",
    name_plural: "Belize dollars",
    rate: 24.369881,
    rounding: 0,
    symbol: "BZ$",
    symbol_native: "$",
  },
  {
    code: "CAD",
    decimal_digits: 2,
    name: "Canadian Dollar",
    name_plural: "Canadian dollars",
    rate: 16.569699,
    rounding: 0,
    symbol: "CA$",
    symbol_native: "$",
  },
  {
    code: "CDF",
    decimal_digits: 2,
    name: "Congolese Franc",
    name_plural: "Congolese francs",
    rate: 24838.202605,
    rounding: 0,
    symbol: "CDF",
    symbol_native: "FrCD",
  },
  {
    code: "CHF",
    decimal_digits: 2,
    name: "Swiss Franc",
    name_plural: "Swiss francs",
    rate: 12.245679,
    rounding: 0.05,
    symbol: "CHF",
    symbol_native: "CHF",
  },
  {
    code: "CLP",
    decimal_digits: 0,
    name: "Chilean Peso",
    name_plural: "Chilean pesos",
    rate: 11449.526247,
    rounding: 0,
    symbol: "CL$",
    symbol_native: "$",
  },
  {
    code: "CNY",
    decimal_digits: 2,
    name: "Chinese Yuan",
    name_plural: "Chinese yuan",
    rate: 87.999656,
    rounding: 0,
    symbol: "CN¥",
    symbol_native: "CN¥",
  },
  {
    code: "COP",
    decimal_digits: 0,
    name: "Colombian Peso",
    name_plural: "Colombian pesos",
    rate: 60339.186787,
    rounding: 0,
    symbol: "CO$",
    symbol_native: "$",
  },
  {
    code: "CRC",
    decimal_digits: 0,
    name: "Costa Rican Colón",
    name_plural: "Costa Rican colóns",
    rate: 7465.035005,
    rounding: 0,
    symbol: "₡",
    symbol_native: "₡",
  },
  {
    code: "CVE",
    decimal_digits: 2,
    name: "Cape Verdean Escudo",
    name_plural: "Cape Verdean escudos",
    rate: 1358.687171,
    rounding: 0,
    symbol: "CV$",
    symbol_native: "CV$",
  },
  {
    code: "CZK",
    decimal_digits: 2,
    name: "Czech Republic Koruna",
    name_plural: "Czech Republic korunas",
    rate: 302.530553,
    rounding: 0,
    symbol: "Kč",
    symbol_native: "Kč",
  },
  {
    code: "DJF",
    decimal_digits: 0,
    name: "Djiboutian Franc",
    name_plural: "Djiboutian francs",
    rate: 2152.293264,
    rounding: 0,
    symbol: "Fdj",
    symbol_native: "Fdj",
  },
  {
    code: "DKK",
    decimal_digits: 2,
    name: "Danish Krone",
    name_plural: "Danish kroner",
    rate: 92.1625,
    rounding: 0,
    symbol: "Dkr",
    symbol_native: "kr",
  },
  {
    code: "DOP",
    decimal_digits: 2,
    name: "Dominican Peso",
    name_plural: "Dominican pesos",
    rate: 653.568543,
    rounding: 0,
    symbol: "RD$",
    symbol_native: "RD$",
  },
  {
    code: "DZD",
    decimal_digits: 2,
    name: "Algerian Dinar",
    name_plural: "Algerian dinars",
    rate: 1702.408141,
    rounding: 0,
    symbol: "DA",
    symbol_native: "د.ج.‏",
  },
  {
    code: "EGP",
    decimal_digits: 2,
    name: "Egyptian Pound",
    name_plural: "Egyptian pounds",
    rate: 293.86807,
    rounding: 0,
    symbol: "EGP",
    symbol_native: "ج.م.‏",
  },
  {
    code: "ERN",
    decimal_digits: 2,
    name: "Eritrean Nakfa",
    name_plural: "Eritrean nakfas",
    rate: 181.811615,
    rounding: 0,
    symbol: "Nfk",
    symbol_native: "Nfk",
  },
  {
    code: "ETB",
    decimal_digits: 2,
    name: "Ethiopian Birr",
    name_plural: "Ethiopian birrs",
    rate: 645.300958,
    rounding: 0,
    symbol: "Br",
    symbol_native: "Br",
  },
  {
    code: "EUR",
    decimal_digits: 2,
    name: "Euro",
    name_plural: "euros",
    rate: 12.388364,
    rounding: 0,
    symbol: "€",
    symbol_native: "€",
  },
  {
    code: "GBP",
    decimal_digits: 2,
    name: "British Pound Sterling",
    name_plural: "British pounds sterling",
    rate: 10.791203,
    rounding: 0,
    symbol: "£",
    symbol_native: "£",
  },
  {
    code: "GEL",
    decimal_digits: 2,
    name: "Georgian Lari",
    name_plural: "Georgian laris",
    rate: 33.091014,
    rounding: 0,
    symbol: "GEL",
    symbol_native: "GEL",
  },
  {
    code: "GHS",
    decimal_digits: 2,
    name: "Ghanaian Cedi",
    name_plural: "Ghanaian cedis",
    rate: 165.632819,
    rounding: 0,
    symbol: "GH₵",
    symbol_native: "GH₵",
  },
  {
    code: "GNF",
    decimal_digits: 0,
    name: "Guinean Franc",
    name_plural: "Guinean francs",
    rate: 104187.853138,
    rounding: 0,
    symbol: "FG",
    symbol_native: "FG",
  },
  {
    code: "GTQ",
    decimal_digits: 2,
    name: "Guatemalan Quetzal",
    name_plural: "Guatemalan quetzals",
    rate: 94.556267,
    rounding: 0,
    symbol: "GTQ",
    symbol_native: "Q",
  },
  {
    code: "HKD",
    decimal_digits: 2,
    name: "Hong Kong Dollar",
    name_plural: "Hong Kong dollars",
    rate: 95.149619,
    rounding: 0,
    symbol: "HK$",
    symbol_native: "$",
  },
  {
    code: "HNL",
    decimal_digits: 2,
    name: "Honduran Lempira",
    name_plural: "Honduran lempiras",
    rate: 298.865339,
    rounding: 0,
    symbol: "HNL",
    symbol_native: "L",
  },
  {
    code: "HRK",
    decimal_digits: 2,
    name: "Croatian Kuna",
    name_plural: "Croatian kunas",
    rate: 93.334033,
    rounding: 0,
    symbol: "kn",
    symbol_native: "kn",
  },
  {
    code: "HUF",
    decimal_digits: 0,
    name: "Hungarian Forint",
    name_plural: "Hungarian forints",
    rate: 5020.962481,
    rounding: 0,
    symbol: "Ft",
    symbol_native: "Ft",
  },
  {
    code: "IDR",
    decimal_digits: 0,
    name: "Indonesian Rupiah",
    name_plural: "Indonesian rupiahs",
    rate: 190181.196469,
    rounding: 0,
    symbol: "Rp",
    symbol_native: "Rp",
  },
  {
    code: "ILS",
    decimal_digits: 2,
    name: "Israeli New Sheqel",
    name_plural: "Israeli new sheqels",
    rate: 43.396612,
    rounding: 0,
    symbol: "₪",
    symbol_native: "₪",
  },
  {
    code: "INR",
    decimal_digits: 2,
    name: "Indian Rupee",
    name_plural: "Indian rupees",
    rate: 1000,
    rounding: 0,
    symbol: "Rs",
    symbol_native: "টকা",
    isFavorite: true,
  },
  {
    code: "IQD",
    decimal_digits: 0,
    name: "Iraqi Dinar",
    name_plural: "Iraqi dinars",
    rate: 17644.612954,
    rounding: 0,
    symbol: "IQD",
    symbol_native: "د.ع.‏",
  },
  {
    code: "IRR",
    decimal_digits: 0,
    name: "Iranian Rial",
    name_plural: "Iranian rials",
    rate: 512687.23728,
    rounding: 0,
    symbol: "IRR",
    symbol_native: "﷼",
  },
  {
    code: "ISK",
    decimal_digits: 0,
    name: "Icelandic Króna",
    name_plural: "Icelandic krónur",
    rate: 1794.53569,
    rounding: 0,
    symbol: "Ikr",
    symbol_native: "kr",
  },
  {
    code: "JMD",
    decimal_digits: 2,
    name: "Jamaican Dollar",
    name_plural: "Jamaican dollars",
    rate: 1855.767874,
    rounding: 0,
    symbol: "J$",
    symbol_native: "$",
  },
  {
    code: "JOD",
    decimal_digits: 3,
    name: "Jordanian Dinar",
    name_plural: "Jordanian dinars",
    rate: 8.600816,
    rounding: 0,
    symbol: "JD",
    symbol_native: "د.أ.‏",
  },
  {
    code: "JPY",
    decimal_digits: 0,
    name: "Japanese Yen",
    name_plural: "Japanese yen",
    rate: 1791.916899,
    rounding: 0,
    symbol: "¥",
    symbol_native: "￥",
  },
  {
    code: "KES",
    decimal_digits: 2,
    name: "Kenyan Shilling",
    name_plural: "Kenyan shillings",
    rate: 1469.475116,
    rounding: 0,
    symbol: "Ksh",
    symbol_native: "Ksh",
  },
  {
    code: "KHR",
    decimal_digits: 2,
    name: "Cambodian Riel",
    name_plural: "Cambodian riels",
    rate: 50075.963665,
    rounding: 0,
    symbol: "KHR",
    symbol_native: "៛",
  },
  {
    code: "KMF",
    decimal_digits: 0,
    name: "Comorian Franc",
    name_plural: "Comorian francs",
    rate: 6050.759286,
    rounding: 0,
    symbol: "CF",
    symbol_native: "FC",
  },
  {
    code: "KRW",
    decimal_digits: 0,
    name: "South Korean Won",
    name_plural: "South Korean won",
    rate: 17165.088833,
    rounding: 0,
    symbol: "₩",
    symbol_native: "₩",
  },
  {
    code: "KWD",
    decimal_digits: 3,
    name: "Kuwaiti Dinar",
    name_plural: "Kuwaiti dinars",
    rate: 3.77225,
    rounding: 0,
    symbol: "KD",
    symbol_native: "د.ك.‏",
  },
  {
    code: "KZT",
    decimal_digits: 2,
    name: "Kazakhstani Tenge",
    name_plural: "Kazakhstani tenges",
    rate: 5641.675584,
    rounding: 0,
    symbol: "KZT",
    symbol_native: "тңг.",
  },
  {
    code: "LBP",
    decimal_digits: 0,
    name: "Lebanese Pound",
    name_plural: "Lebanese pounds",
    rate: 18281.736776,
    rounding: 0,
    symbol: "L.L.",
    symbol_native: "ل.ل.‏",
  },
  {
    code: "LKR",
    decimal_digits: 2,
    name: "Sri Lankan Rupee",
    name_plural: "Sri Lankan rupees",
    rate: 4442.87304,
    rounding: 0,
    symbol: "SLRs",
    symbol_native: "SL Re",
  },
  {
    code: "LYD",
    decimal_digits: 3,
    name: "Libyan Dinar",
    name_plural: "Libyan dinars",
    rate: 60.52944,
    rounding: 0,
    symbol: "LD",
    symbol_native: "د.ل.‏",
  },
  {
    code: "MAD",
    decimal_digits: 2,
    name: "Moroccan Dirham",
    name_plural: "Moroccan dirhams",
    rate: 133.527488,
    rounding: 0,
    symbol: "MAD",
    symbol_native: "د.م.‏",
  },
  {
    code: "MDL",
    decimal_digits: 2,
    name: "Moldovan Leu",
    name_plural: "Moldovan lei",
    rate: 233.339795,
    rounding: 0,
    symbol: "MDL",
    symbol_native: "MDL",
  },
  {
    code: "MGA",
    decimal_digits: 0,
    name: "Malagasy Ariary",
    name_plural: "Malagasy Ariaries",
    rate: 51743.750177,
    rounding: 0,
    symbol: "MGA",
    symbol_native: "MGA",
  },
  {
    code: "MKD",
    decimal_digits: 2,
    name: "Macedonian Denar",
    name_plural: "Macedonian denari",
    rate: 759.584362,
    rounding: 0,
    symbol: "MKD",
    symbol_native: "MKD",
  },
  {
    code: "MMK",
    decimal_digits: 0,
    name: "Myanma Kyat",
    name_plural: "Myanma kyats",
    rate: 25388.06512,
    rounding: 0,
    symbol: "MMK",
    symbol_native: "K",
  },
  {
    code: "MOP",
    decimal_digits: 2,
    name: "Macanese Pataca",
    name_plural: "Macanese patacas",
    rate: 97.748598,
    rounding: 0,
    symbol: "MOP$",
    symbol_native: "MOP$",
  },
  {
    code: "MUR",
    decimal_digits: 0,
    name: "Mauritian Rupee",
    name_plural: "Mauritian rupees",
    rate: 542.396246,
    rounding: 0,
    symbol: "MURs",
    symbol_native: "MURs",
  },
  {
    code: "MXN",
    decimal_digits: 2,
    name: "Mexican Peso",
    name_plural: "Mexican pesos",
    rate: 237.593445,
    rounding: 0,
    symbol: "MX$",
    symbol_native: "$",
  },
  {
    code: "MYR",
    decimal_digits: 2,
    name: "Malaysian Ringgit",
    name_plural: "Malaysian ringgits",
    rate: 57.535755,
    rounding: 0,
    symbol: "RM",
    symbol_native: "RM",
  },
  {
    code: "MZN",
    decimal_digits: 2,
    name: "Mozambican Metical",
    name_plural: "Mozambican meticals",
    rate: 774.183982,
    rounding: 0,
    symbol: "MTn",
    symbol_native: "MTn",
  },
  {
    code: "NAD",
    decimal_digits: 2,
    name: "Namibian Dollar",
    name_plural: "Namibian dollars",
    rate: 220.900864,
    rounding: 0,
    symbol: "N$",
    symbol_native: "N$",
  },
  {
    code: "NGN",
    decimal_digits: 2,
    name: "Nigerian Naira",
    name_plural: "Nigerian nairas",
    rate: 5307.263952,
    rounding: 0,
    symbol: "₦",
    symbol_native: "₦",
  },
  {
    code: "NIO",
    decimal_digits: 2,
    name: "Nicaraguan Córdoba",
    name_plural: "Nicaraguan córdobas",
    rate: 435.175579,
    rounding: 0,
    symbol: "C$",
    symbol_native: "C$",
  },
  {
    code: "NOK",
    decimal_digits: 2,
    name: "Norwegian Krone",
    name_plural: "Norwegian kroner",
    rate: 127.134672,
    rounding: 0,
    symbol: "Nkr",
    symbol_native: "kr",
  },
  {
    code: "NPR",
    decimal_digits: 2,
    name: "Nepalese Rupee",
    name_plural: "Nepalese rupees",
    rate: 1603.714424,
    rounding: 0,
    symbol: "NPRs",
    symbol_native: "नेरू",
  },
  {
    code: "NZD",
    decimal_digits: 2,
    name: "New Zealand Dollar",
    name_plural: "New Zealand dollars",
    rate: 20.795156,
    rounding: 0,
    symbol: "NZ$",
    symbol_native: "$",
  },
  {
    code: "OMR",
    decimal_digits: 3,
    name: "Omani Rial",
    name_plural: "Omani rials",
    rate: 4.674234,
    rounding: 0,
    symbol: "OMR",
    symbol_native: "ر.ع.‏",
  },
  {
    code: "PAB",
    decimal_digits: 2,
    name: "Panamanian Balboa",
    name_plural: "Panamanian balboas",
    rate: 12.133269,
    rounding: 0,
    symbol: "B/.",
    symbol_native: "B/.",
  },
  {
    code: "PEN",
    decimal_digits: 2,
    name: "Peruvian Nuevo Sol",
    name_plural: "Peruvian nuevos soles",
    rate: 47.762068,
    rounding: 0,
    symbol: "S/.",
    symbol_native: "S/.",
  },
  {
    code: "PHP",
    decimal_digits: 2,
    name: "Philippine Peso",
    name_plural: "Philippine pesos",
    rate: 707.847718,
    rounding: 0,
    symbol: "₱",
    symbol_native: "₱",
  },
  {
    code: "PKR",
    decimal_digits: 0,
    name: "Pakistani Rupee",
    name_plural: "Pakistani rupees",
    rate: 2683.274678,
    rounding: 0,
    symbol: "PKRs",
    symbol_native: "₨",
  },
  {
    code: "PLN",
    decimal_digits: 2,
    name: "Polish Zloty",
    name_plural: "Polish zlotys",
    rate: 58.08239,
    rounding: 0,
    symbol: "zł",
    symbol_native: "zł",
  },
  {
    code: "PYG",
    decimal_digits: 0,
    name: "Paraguayan Guarani",
    name_plural: "Paraguayan guaranis",
    rate: 87819.632147,
    rounding: 0,
    symbol: "₲",
    symbol_native: "₲",
  },
  {
    code: "QAR",
    decimal_digits: 2,
    name: "Qatari Rial",
    name_plural: "Qatari rials",
    rate: 44.139117,
    rounding: 0,
    symbol: "QR",
    symbol_native: "ر.ق.‏",
  },
  {
    code: "RON",
    decimal_digits: 2,
    name: "Romanian Leu",
    name_plural: "Romanian lei",
    rate: 60.695434,
    rounding: 0,
    symbol: "RON",
    symbol_native: "RON",
  },
  {
    code: "RSD",
    decimal_digits: 0,
    name: "Serbian Dinar",
    name_plural: "Serbian dinars",
    rate: 1451.119079,
    rounding: 0,
    symbol: "din.",
    symbol_native: "дин.",
  },
  {
    code: "RUB",
    decimal_digits: 2,
    name: "Russian Ruble",
    name_plural: "Russian rubles",
    rate: 751.759888,
    rounding: 0,
    symbol: "RUB",
    symbol_native: "₽.",
  },
  {
    code: "RWF",
    decimal_digits: 0,
    name: "Rwandan Franc",
    name_plural: "Rwandan francs",
    rate: 12912.929773,
    rounding: 0,
    symbol: "RWF",
    symbol_native: "FR",
  },
  {
    code: "SAR",
    decimal_digits: 2,
    name: "Saudi Riyal",
    name_plural: "Saudi riyals",
    rate: 45.556402,
    rounding: 0,
    symbol: "SR",
    symbol_native: "ر.س.‏",
  },
  {
    code: "SDG",
    decimal_digits: 2,
    name: "Sudanese Pound",
    name_plural: "Sudanese pounds",
    rate: 6896.443781,
    rounding: 0,
    symbol: "SDG",
    symbol_native: "SDG",
  },
  {
    code: "SEK",
    decimal_digits: 2,
    name: "Swedish Krona",
    name_plural: "Swedish kronor",
    rate: 134.82331,
    rounding: 0,
    symbol: "Skr",
    symbol_native: "kr",
  },
  {
    code: "SGD",
    decimal_digits: 2,
    name: "Singapore Dollar",
    name_plural: "Singapore dollars",
    rate: 17.153396,
    rounding: 0,
    symbol: "S$",
    symbol_native: "$",
  },
  {
    code: "SOS",
    decimal_digits: 0,
    name: "Somali Shilling",
    name_plural: "Somali shillings",
    rate: 6873.179347,
    rounding: 0,
    symbol: "Ssh",
    symbol_native: "Ssh",
  },
  {
    code: "SYP",
    decimal_digits: 0,
    name: "Syrian Pound",
    name_plural: "Syrian pounds",
    rate: 30452.539954,
    rounding: 0,
    symbol: "SY£",
    symbol_native: "ل.س.‏",
  },
  {
    code: "THB",
    decimal_digits: 2,
    name: "Thai Baht",
    name_plural: "Thai baht",
    rate: 454.892806,
    rounding: 0,
    symbol: "฿",
    symbol_native: "฿",
  },
  {
    code: "TND",
    decimal_digits: 3,
    name: "Tunisian Dinar",
    name_plural: "Tunisian dinars",
    rate: 39.230382,
    rounding: 0,
    symbol: "DT",
    symbol_native: "د.ت.‏",
  },
  {
    code: "TOP",
    decimal_digits: 2,
    name: "Tongan Paʻanga",
    name_plural: "Tongan paʻanga",
    rate: 29.291455,
    rounding: 0,
    symbol: "T$",
    symbol_native: "T$",
  },
  {
    code: "TRY",
    decimal_digits: 2,
    name: "Turkish Lira",
    name_plural: "Turkish Lira",
    rate: 225.679764,
    rounding: 0,
    symbol: "TL",
    symbol_native: "TL",
  },
  {
    code: "TTD",
    decimal_digits: 2,
    name: "Trinidad and Tobago Dollar",
    name_plural: "Trinidad and Tobago dollars",
    rate: 82.026434,
    rounding: 0,
    symbol: "TT$",
    symbol_native: "$",
  },
  {
    code: "TWD",
    decimal_digits: 2,
    name: "New Taiwan Dollar",
    name_plural: "New Taiwan dollars",
    rate: 389.074697,
    rounding: 0,
    symbol: "NT$",
    symbol_native: "NT$",
  },
  {
    code: "TZS",
    decimal_digits: 0,
    name: "Tanzanian Shilling",
    name_plural: "Tanzanian shillings",
    rate: 28193.133991,
    rounding: 0,
    symbol: "TSh",
    symbol_native: "TSh",
  },
  {
    code: "UAH",
    decimal_digits: 2,
    name: "Ukrainian Hryvnia",
    name_plural: "Ukrainian hryvnias",
    rate: 446.499276,
    rounding: 0,
    symbol: "₴",
    symbol_native: "₴",
  },
  {
    code: "UGX",
    decimal_digits: 0,
    name: "Ugandan Shilling",
    name_plural: "Ugandan shillings",
    rate: 45867.380539,
    rounding: 0,
    symbol: "USh",
    symbol_native: "USh",
  },
  {
    code: "USD",
    decimal_digits: 2,
    name: "US Dollar",
    name_plural: "US dollars",
    rate: 12.131999,
    rounding: 0,
    symbol: "$",
    symbol_native: "$",
    isFavorite: true,
  },
  {
    code: "UYU",
    decimal_digits: 2,
    name: "Uruguayan Peso",
    name_plural: "Uruguayan pesos",
    rate: 491.480155,
    rounding: 0,
    symbol: "$U",
    symbol_native: "$",
  },
  {
    code: "UZS",
    decimal_digits: 0,
    name: "Uzbekistan Som",
    name_plural: "Uzbekistan som",
    rate: 134402.127512,
    rounding: 0,
    symbol: "UZS",
    symbol_native: "UZS",
  },
  {
    code: "VND",
    decimal_digits: 0,
    name: "Vietnamese Dong",
    name_plural: "Vietnamese dong",
    rate: 301461.650116,
    rounding: 0,
    symbol: "₫",
    symbol_native: "₫",
  },
  {
    code: "XAF",
    decimal_digits: 0,
    name: "CFA Franc BEAC",
    name_plural: "CFA francs BEAC",
    rate: 8122.162885,
    rounding: 0,
    symbol: "FCFA",
    symbol_native: "FCFA",
  },
  {
    code: "XOF",
    decimal_digits: 0,
    name: "CFA Franc BCEAO",
    name_plural: "CFA francs BCEAO",
    rate: 8122.158818,
    rounding: 0,
    symbol: "CFA",
    symbol_native: "CFA",
  },
  {
    code: "YER",
    decimal_digits: 0,
    name: "Yemeni Rial",
    name_plural: "Yemeni rials",
    rate: 3033.104237,
    rounding: 0,
    symbol: "YR",
    symbol_native: "ر.ي.‏",
  },
  {
    code: "ZAR",
    decimal_digits: 2,
    name: "South African Rand",
    name_plural: "South African rand",
    rate: 221.855263,
    rounding: 0,
    symbol: "R",
    symbol_native: "R",
  },
  {
    code: "ZWL",
    decimal_digits: 0,
    name: "Zimbabwean Dollar",
    name_plural: "Zimbabwean Dollar",
    rate: 3902.734813,
    rounding: 0,
    symbol: "ZWL$",
    symbol_native: "ZWL$",
  },
];
export default RATES;
