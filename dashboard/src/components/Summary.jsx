import { useEffect, useState } from "react";
import axios from "axios";

import { useAuth } from "../context/AuthContext.jsx";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3002";

const Summary = () => {
  const { user } = useAuth();

  const [holdings, setHoldings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const fetchHoldings = async () => {
      try {
        setError("");

        const response = await axios.get(`${API_URL}/allHoldings`, {
          withCredentials: true,
          signal: controller.signal,
        });

        setHoldings(response.data);
      } catch (error) {
        if (error.code !== "ERR_CANCELED") {
          console.error("Unable to load dashboard summary:", error);

          setError(
            error.response?.data?.message ||
              "Unable to load portfolio summary."
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    fetchHoldings();

    return () => controller.abort();
  }, []);

  const totalInvestment = holdings.reduce(
    (total, stock) =>
      total + Number(stock.avg) * Number(stock.qty),
    0
  );

  const currentValue = holdings.reduce(
    (total, stock) =>
      total + Number(stock.price) * Number(stock.qty),
    0
  );

  const profitAndLoss = currentValue - totalInvestment;

  const profitAndLossPercentage =
    totalInvestment > 0
      ? (profitAndLoss / totalInvestment) * 100
      : 0;

  const formatCurrency = (value) =>
    Number(value).toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  if (isLoading) {
    return <p>Loading dashboard...</p>;
  }

  return (
    <>
      <div className="username">
        <h6>Hi, {user?.name || "User"}!</h6>
        <hr className="divider" />
      </div>

      {error && <p className="error">{error}</p>}

      <div className="section">
        <span>
          <p>Equity</p>
        </span>

        <div className="data">
          <div className="first">
            <h3>{formatCurrency(0)}</h3>
            <p>Margin available</p>
          </div>

          <hr />

          <div className="second">
            <p>
              Margins used <span>{formatCurrency(0)}</span>
            </p>

            <p>
              Opening balance <span>{formatCurrency(0)}</span>
            </p>
          </div>
        </div>

        <hr className="divider" />
      </div>

      <div className="section">
        <span>
          <p>Holdings ({holdings.length})</p>
        </span>

        <div className="data">
          <div className="first">
            <h3 className={profitAndLoss >= 0 ? "profit" : "loss"}>
              {formatCurrency(profitAndLoss)}{" "}
              <small>
                ({profitAndLossPercentage >= 0 ? "+" : ""}
                {profitAndLossPercentage.toFixed(2)}%)
              </small>
            </h3>

            <p>P&amp;L</p>
          </div>

          <hr />

          <div className="second">
            <p>
              Current value{" "}
              <span>{formatCurrency(currentValue)}</span>
            </p>

            <p>
              Investment{" "}
              <span>{formatCurrency(totalInvestment)}</span>
            </p>
          </div>
        </div>

        <hr className="divider" />
      </div>
    </>
  );
};

export default Summary;