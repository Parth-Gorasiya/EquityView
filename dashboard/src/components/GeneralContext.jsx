import { createContext, useCallback, useMemo, useState } from "react";

import BuyActionWindow from "./BuyActionWindow.jsx";

const GeneralContext = createContext({
  selectedStockUID: "",
  isBuyWindowOpen: false,
  openBuyWindow: () => {},
  closeBuyWindow: () => {},
});

export const GeneralContextProvider = ({ children }) => {
  const [isBuyWindowOpen, setIsBuyWindowOpen] = useState(false);
  const [selectedStockUID, setSelectedStockUID] = useState("");

  const openBuyWindow = useCallback((uid) => {
    setSelectedStockUID(uid);
    setIsBuyWindowOpen(true);
  }, []);

  const closeBuyWindow = useCallback(() => {
    setIsBuyWindowOpen(false);
    setSelectedStockUID("");
  }, []);

  const contextValue = useMemo(
    () => ({
      selectedStockUID,
      isBuyWindowOpen,
      openBuyWindow,
      closeBuyWindow,
    }),
    [
      selectedStockUID,
      isBuyWindowOpen,
      openBuyWindow,
      closeBuyWindow,
    ],
  );

  return (
    <GeneralContext.Provider value={contextValue}>
      {children}

      {isBuyWindowOpen && (
        <BuyActionWindow uid={selectedStockUID} />
      )}
    </GeneralContext.Provider>
  );
};

export default GeneralContext;