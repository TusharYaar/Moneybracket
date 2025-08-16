import React, { useContext, createContext, useState, useEffect, useCallback, useMemo, ReactNode } from "react";
import { CURRENCIES } from "../data";

import { ExchangeRatesServerResponse } from "../types";
import { getFromStorageOrDefault, setStorage } from "../utils/storage";
import { useSettings } from "./SettingsProvider";
import { captureException } from "@sentry/react-native";

const SupportedCurrencies = Object.keys(CURRENCIES);

const DEFAULT = {
  rates: {},
  lastUpdated: null as null | Date,
  favorites: JSON.parse(getFromStorageOrDefault("rates/favorites", JSON.stringify(["INR"]), true)),
};

const ExchangeRateContext = createContext({
  rates: {} as Record<string, number>,
  fetchRates: (code: string) => {},
  toggleFavorite: (code: string) => {},
  favorites: [] as string[],
  lastUpdated: DEFAULT.lastUpdated,
});

export const useExchangeRate = () => useContext(ExchangeRateContext);

const ExchangeRatesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const {
    currency: { code },
  } = useSettings();
  const [rates, setRates] = useState(DEFAULT.rates);
  const [favorites, setFavorites] = useState<string[]>(DEFAULT.favorites);
  const [updated, setUpdated] = useState(DEFAULT.lastUpdated);

  const fetchRates = useCallback(async (code: string) => {
    try {
      const request = await fetch(`https://api.fxratesapi.com/latest?base=${code}`);
      const response = (await request.json()) as ExchangeRatesServerResponse;
      const rates = SupportedCurrencies.reduce((acc, curr) => {
        acc[curr] = 1 / response.rates[curr];
        return acc;
      }, {} as Record<string, number>);
      setRates(rates);
      setUpdated(new Date());
    } catch (e) {
      captureException(e, {
        level: "error",
        tags: {
          location: "fetchRates",
          file: "providers/ExchangeRatesProvider.tsx",
          action: "api-fetch-rates",
          timestamp: Date.now(),
        },
      });
    }
  }, []);

  useEffect(() => {
    const getRates = async (code: string) => {
      await fetchRates(code);
    };
    getRates(code);
  }, [code]);

  const toggleFavorite = useCallback((code: string) => {
    setFavorites((prev) => {
      const arr = prev.includes(code) ? prev.filter((a) => a !== code) : [...prev, code];
      setStorage("rates/favorites", JSON.stringify(arr));
      return arr;
    });
  }, []);

  return (
    <ExchangeRateContext.Provider value={{ rates, fetchRates, toggleFavorite, favorites, lastUpdated: updated }}>
      {children}
    </ExchangeRateContext.Provider>
  );
};

export default ExchangeRatesProvider;
