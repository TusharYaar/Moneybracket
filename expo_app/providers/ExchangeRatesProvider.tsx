import React, {
  useContext,
  createContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import RATES from "../data/rates";
import {CURRENCIES} from "../data";

import {ExchangeRatesServerResponse} from "../types";
import {getFromStorageOrDefault, setStorage} from "../utils/storage";
import {format} from "date-fns";
import {useSettings} from "./SettingsProvider";
import {parseISO} from "date-fns/esm";

export type RateType = {
  rate: number;
  symbol: string;
  name: string;
  symbol_native: string;
  decimal_digits: number;
  rounding: number;
  code: string;
  name_plural: string;
  isFavorite?: boolean;
};

const DEFAULT = {
  rates: JSON.parse(
    getFromStorageOrDefault("rates/rates", JSON.stringify(RATES), true),
  ),
  base: getFromStorageOrDefault("rates/base", "INR", true),
  lastUpdated: getFromStorageOrDefault(
    "rates/lastUpdated",
    new Date("2023-01-21").toISOString(),
    true,
  ),
  favorites: JSON.parse(
    getFromStorageOrDefault("rates/favorites", JSON.stringify(["INR"]), true),
  ),
};

const ExchangeRateContext = createContext({
  rates: [] as RateType[],
  fetchRates: () => {},
  toggleFavorite: (code: string) => {},
  favorites: [] as string[],
});

export const useExchangeRate = () => useContext(ExchangeRateContext);

const ExchangeRatesProvider = ({children}: {children: JSX.Element}) => {
  const {
    currency: {code},
  } = useSettings();
  const [rates, setRates] = useState(DEFAULT.rates);
  const [favorites, setFavorites] = useState<string[]>(DEFAULT.favorites);

  const fetchRates = useCallback(async () => {
    try {
      const request = await fetch(
        `https://api.exchangerate.host/latest/?base=${code}&amount=1000&v=${format(
          new Date(),
          "yyyy-MM-dd",
        )}`,
      );
      const response = (await request.json()) as ExchangeRatesServerResponse;
      setStorage("rates/lastUpdated", new Date(response.date).toISOString());
      setStorage("rates/rates", JSON.stringify(response.rates));
      setRates(response.rates);
    } catch (e) {
      console.log(e);
    }
  }, [code]);

  useEffect(() => {
    const getRates = async () => {
      if (
        format(parseISO(DEFAULT.lastUpdated), "yyyy-MM-dd") !==
        format(new Date(), "yyyy-MM-dd")
      )
        await fetchRates();
    };
    getRates();
  }, []);

  const _rates: RateType[] = useMemo(() => {
    return Object.entries(CURRENCIES)
      .map(value => ({
        ...value[1],
        rate: rates[value[0]],
        isFavorite: favorites.includes(value[0]),
      }))
      .filter(rate => rate.rate)
      .sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
  }, [rates, favorites]);

  const toggleFavorite = useCallback((code: string) => {
    setFavorites(prev => {
      const arr = prev.includes(code)
        ? prev.filter(a => a !== code)
        : [...prev, code];
      setStorage("rates/favorites", JSON.stringify(arr));
      return arr;
    });
  }, []);

  return (
    <ExchangeRateContext.Provider
      value={{rates: _rates, fetchRates, toggleFavorite, favorites}}
    >
      {children}
    </ExchangeRateContext.Provider>
  );
};

export default ExchangeRatesProvider;
