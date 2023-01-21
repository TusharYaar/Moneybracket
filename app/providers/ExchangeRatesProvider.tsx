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
};

const ExchangeRateContext = createContext({
  rates: [] as RateType[],
  fetchRates: () => {},
});

export const useExchangeRate = () => useContext(ExchangeRateContext);

const ExchangeRatesProvider = ({children}: {children: JSX.Element}) => {
  const {
    currency: {code},
  } = useSettings();
  const [rates, setRates] = useState(DEFAULT.rates);

  const fetchRates = useCallback(async () => {
    console.log("Fetching Rates");
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
      await fetchRates();
    };
    getRates();
  }, []);

  const _rates = useMemo(() => {
    return Object.entries(CURRENCIES).map(value => ({
      ...value[1],
      rate: rates[value[0]],
    }));
  }, [rates]);

  return (
    <ExchangeRateContext.Provider value={{rates: _rates, fetchRates}}>
      {children}
    </ExchangeRateContext.Provider>
  );
};

export default ExchangeRatesProvider;
