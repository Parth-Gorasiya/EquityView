import { useEffect, useState } from "react";
import axios from "axios";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3002";

const Positions = () => {
  const [positions, setPositions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const fetchPositions = async () => {
      setIsLoading(true);
      setError("");

      try {
        const response = await axios.get(
          `${API_URL}/allPositions`,
          {
            signal: controller.signal,
            withCredentials: true,
          }
        );

        setPositions(response.data);
      } catch (error) {
        if (error.code !== "ERR_CANCELED") {
          console.error("Unable to fetch positions:", error);

          setError(
            error.response?.data?.message ||
              "Unable to load positions."
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    fetchPositions();

    return () => {
      controller.abort();
    };
  }, []);

  const formatNumber = (number) =>
    Number(number).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  if (isLoading) {
    return <p>Loading positions...</p>;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  return (
    <>
      <h3 className="title">
        Positions ({positions.length})
      </h3>

      {positions.length === 0 ? (
        <div className="no-orders">
          <p>You do not have any open positions.</p>
        </div>
      ) : (
        <div className="order-table">
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Instrument</th>
                <th>Qty.</th>
                <th>Avg.</th>
                <th>LTP</th>
                <th>P&amp;L</th>
                <th>Chg.</th>
              </tr>
            </thead>

            <tbody>
              {positions.map((stock) => {
                const quantity = Number(stock.qty);
                const averagePrice = Number(stock.avg);
                const currentPrice = Number(stock.price);

                const currentValue =
                  currentPrice * quantity;

                const investment =
                  averagePrice * quantity;

                const profitAndLoss =
                  currentValue - investment;

                const profitClass =
                  profitAndLoss >= 0
                    ? "profit"
                    : "loss";

                const dayChange =
                  Number.parseFloat(stock.day);

                const dayClass =
                  Number.isFinite(dayChange) &&
                  dayChange < 0
                    ? "loss"
                    : "profit";

                return (
                  <tr
                    key={
                      stock._id ||
                      `${stock.product}-${stock.name}`
                    }
                  >
                    <td>{stock.product}</td>
                    <td>{stock.name}</td>
                    <td>{quantity}</td>

                    <td>
                      {formatNumber(averagePrice)}
                    </td>

                    <td>
                      {formatNumber(currentPrice)}
                    </td>

                    <td className={profitClass}>
                      {formatNumber(profitAndLoss)}
                    </td>

                    <td className={dayClass}>
                      {stock.day || "0.00%"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default Positions;