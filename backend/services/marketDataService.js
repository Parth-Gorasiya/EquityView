const CACHE_DURATION = 60 * 1000;

const quoteCache = new Map();

let yahooFinancePromise;

const getYahooFinance = () => {
  if (!yahooFinancePromise) {
    yahooFinancePromise = import("yahoo-finance2").then(
      ({ default: YahooFinance }) =>
        new YahooFinance({
          suppressNotices: ["yahooSurvey"],
        })
    );
  }

  return yahooFinancePromise;
};

const getStockQuote = async (symbol) => {
  const currentTime = Date.now();
  const cachedQuote = quoteCache.get(symbol);

  if (cachedQuote && cachedQuote.expiresAt > currentTime) {
    return cachedQuote.data;
  }

  const yahooFinance = await getYahooFinance();
  const quote = await yahooFinance.quote(symbol);

  const quoteData = {
    currentPrice: Number(quote.regularMarketPrice),
    previousClose: Number(quote.regularMarketPreviousClose),
    marketTime: quote.regularMarketTime,
  };

  quoteCache.set(symbol, {
    data: quoteData,
    expiresAt: currentTime + CACHE_DURATION,
  });

  return quoteData;
};

module.exports = { getStockQuote };