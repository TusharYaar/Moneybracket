import React, { createContext, useContext, useState, ReactNode, useMemo, useCallback } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface HeaderProviderContextType {
  isHeaderVisible: boolean;
  isTabbarVisible: boolean;
  setHeaderVisible: (visible: boolean) => void;
  setTabbarVisible: (visible: boolean) => void;
  tabbarHeight: number;
  headerHeight: number;
}

const HeaderProviderContext = createContext<HeaderProviderContextType | undefined>(undefined);

interface HeaderProviderProps {
  children: ReactNode;
}

export const HeaderProvider: React.FC<HeaderProviderProps> = ({ children }) => {
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [isTabbarVisible, setIsTabbarVisible] = useState(true);
  const { bottom, top } = useSafeAreaInsets();

  const tabbarHeight = useMemo(() => {
    return 56 + bottom;
  }, [bottom]);

  const headerHeight = useMemo(() => {
    return 56 + top;
  }, [top]);

  const setHeaderVisible = useCallback((visible: boolean) => {
    setIsHeaderVisible(visible);
  }, []);

  const setTabbarVisible = useCallback((visible: boolean) => {
    setIsTabbarVisible(visible);
  }, []);

  const value: HeaderProviderContextType = {
    isHeaderVisible,
    isTabbarVisible,
    setHeaderVisible,
    setTabbarVisible,
    tabbarHeight,
    headerHeight,
  };

  return (
    <HeaderProviderContext.Provider value={value}>
      {children}
    </HeaderProviderContext.Provider>
  );
};

export const useHeader = (): HeaderProviderContextType => {
  const context = useContext(HeaderProviderContext);
  if (context === undefined) {
    throw new Error('useHeader must be used within a HeaderProvider');
  }
  return context;
};
