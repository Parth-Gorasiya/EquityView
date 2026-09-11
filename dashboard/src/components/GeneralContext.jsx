import { createContext, useCallback, useMemo, useState } from "react";

import OrderActionWindow from "./OrderActionWindow";

const GeneralContext = createContext({
  openBuyWindow: () => {},
  openSellWindow: () => {},
  closeOrderWindow: () => {},
});

export const GeneralContextProvider = ({ children }) => {
  const [orderWindow, setOrderWindow] = useState({
    isOpen: false,
    uid: "",
    mode: "BUY",
  });

  const openBuyWindow = useCallback((uid) => {
    setOrderWindow({
      isOpen: true,
      uid,
      mode: "BUY",
    });
  }, []);

  const openSellWindow = useCallback((uid) => {
    setOrderWindow({
      isOpen: true,
      uid,
      mode: "SELL",
    });
  }, []);

  const closeOrderWindow = useCallback(() => {
    setOrderWindow({
      isOpen: false,
      uid: "",
      mode: "BUY",
    });
  }, []);

  const contextValue = useMemo(
    () => ({
      openBuyWindow,
      openSellWindow,
      closeOrderWindow,
    }),
    [openBuyWindow, openSellWindow, closeOrderWindow]
  );

  return (
    <GeneralContext.Provider value={contextValue}>
      {children}

      {orderWindow.isOpen && (
        <OrderActionWindow
          uid={orderWindow.uid}
          mode={orderWindow.mode}
        />
      )}
    </GeneralContext.Provider>
  );
};

export default GeneralContext;