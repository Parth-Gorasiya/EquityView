import { useEffect, useState } from "react";
import axios from "axios";
import { VerticalGraph } from "./VerticalGraph.jsx";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3002";

const Holdings = () => {
  const [allHoldings, setAllHoldings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const fetchHoldings = async () => {
      try {
        const response = await axios.get(`${API_URL}/allHoldings`, {
          signal: controller.signal,
        });

        setAllHoldings(response.data);
      } catch (error) {
        if (error.code !== "ERR_CANCELED") {
          console.error("Unable to fetch holdings:", error);
          setError("Unable to load holdings.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchHoldings();

    return () => controller.abort();
  }, []);

  const totalInvestment = allHoldings.reduce(
    (total, stock) => total + Number(stock.avg) * Number(stock.qty),
    0,
  );

  const currentValue = allHoldings.reduce(
    (total, stock) => total + Number(stock.price) * Number(stock.qty),
    0,
  );

  const totalProfitAndLoss = currentValue - totalInvestment;

  const profitAndLossPercentage =
    totalInvestment > 0
      ? (totalProfitAndLoss / totalInvestment) * 100
      : 0;

  const formatNumber = (number) =>
    number.toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  const graphData = {
    labels: allHoldings.map((stock) => stock.name),
    datasets: [
      {
        label: "Stock Price",
        data: allHoldings.map((stock) => Number(stock.price)),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  if (isLoading) {
    return <p>Loading holdings...</p>;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  return (
    <>
      <h3 className="title">Holdings ({allHoldings.length})</h3>

      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg. cost</th>
              <th>LTP</th>
              <th>Cur. val</th>
              <th>P&amp;L</th>
              <th>Net chg.</th>
              <th>Day chg.</th>
            </tr>
          </thead>

          <tbody>
            {allHoldings.map((stock) => {
              const quantity = Number(stock.qty);
              const averagePrice = Number(stock.avg);
              const currentPrice = Number(stock.price);
              const currentStockValue = currentPrice * quantity;
              const profitAndLoss =
                currentStockValue - averagePrice * quantity;

              const profitClass =
                profitAndLoss >= 0 ? "profit" : "loss";

              const dayClass = stock.isLoss ? "loss" : "profit";

              return (
                <tr key={stock._id || stock.name}>
                  <td>{stock.name}</td>
                  <td>{quantity}</td>
                  <td>{formatNumber(averagePrice)}</td>
                  <td>{formatNumber(currentPrice)}</td>
                  <td>{formatNumber(currentStockValue)}</td>
                  <td className={profitClass}>
                    {formatNumber(profitAndLoss)}
                  </td>
                  <td className={profitClass}>{stock.net}</td>
                  <td className={dayClass}>{stock.day}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="row">
        <div className="col">
          <h5>{formatNumber(totalInvestment)}</h5>
          <p>Total investment</p>
        </div>

        <div className="col">
          <h5>{formatNumber(currentValue)}</h5>
          <p>Current value</p>
        </div>

        <div className="col">
          <h5 className={totalProfitAndLoss >= 0 ? "profit" : "loss"}>
            {formatNumber(totalProfitAndLoss)} (
            {profitAndLossPercentage >= 0 ? "+" : ""}
            {profitAndLossPercentage.toFixed(2)}%)
          </h5>
          <p>P&amp;L</p>
        </div>
      </div>

      <VerticalGraph data={graphData} />
    </>
  );
};

export default Holdings;