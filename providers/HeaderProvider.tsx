import React, { createContext, useCallback, useContext, useState } from "react";
import { HeaderBtn } from "@components/Header";

const HeaderContext = createContext({
  hideHeader: () => {},
  showHeader: () => {},
  hideTabbar: () => {},
  showTabbar: () => {},
  isHeaderVisible: true,
  isTabbarVisible: true,
  setRightHeaderBtn: (btn: HeaderBtn[]) => {},
  headerBtn: [] as HeaderBtn[],
});

export const useHeader = () => useContext(HeaderContext);

const HeaderProvider = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
  const [headerVisible, setHeaderVisible] = useState(true);
  const [tabbarVisible, setTabbarVisible] = useState(true);
  const [headerBtn, setHeaderBtns] = useState<HeaderBtn[]>([]);

  const hideHeader = useCallback(() => setHeaderVisible(false), []);
  const showHeader = useCallback(() => setHeaderVisible(true), []);
  const showTabbar = useCallback(() => setTabbarVisible(true), []);
  const hideTabbar = useCallback(() => setTabbarVisible(false), []);

  return (
    <HeaderContext.Provider
      value={{
        showHeader,
        hideHeader,
        showTabbar,
        hideTabbar,
        isHeaderVisible: headerVisible,
        isTabbarVisible: tabbarVisible,
        headerBtn,
        setRightHeaderBtn: setHeaderBtns,
      }}
    >
      {children}
    </HeaderContext.Provider>
  );
};

export default HeaderProvider;
