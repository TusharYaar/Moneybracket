import React, {
  useContext,
  createContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import RATES from "../data/rates";
import {CURRENCIES} from "../data";

type ServerResponse = {
  motd: {
    msg: string;
    url: string;
  };
  success: boolean;
  base: string;
  date: string;
  rates: {
    [key: string]: number;
  };
};

export type Rate = {
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

const ExchangeRateContext = createContext({
  rates: [] as Rate[],
});

export const useExchangeRate = () => useContext(ExchangeRateContext);

const ExchangeRatesProvider = ({children}: {children: JSX.Element}) => {
  const [rates, setRates] = useState<Rate[]>([]);

  const fetchRates = useCallback(async (base: string) => {
    // TODO: remove after done with changes
    return RATES;
    const request = await fetch(
      `https://api.exchangerate.host/latest/?base=${base}&amount=1000`,
    );
    const response = (await request.json()) as ServerResponse;
    const _rates = [];
    for (const curr in response.rates) {
      if (CURRENCIES[curr] !== undefined)
        _rates.push({...CURRENCIES[curr], rate: response.rates[curr]});
    }
    return _rates;
  }, []);

  useEffect(() => {
    const getRates = async () => {
      let result = await fetchRates("INR");
      result.sort((a, b) => a.name.localeCompare(b.name));
      setRates(result as Rate[]);
    };
    getRates();
  }, []);

  return (
    <ExchangeRateContext.Provider value={{rates}}>
      {children}
    </ExchangeRateContext.Provider>
  );
};

export default ExchangeRatesProvider;
