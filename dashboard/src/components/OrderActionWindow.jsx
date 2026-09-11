import { useContext, useState } from "react";
import axios from "axios";

import GeneralContext from "./GeneralContext";
import "./BuyActionWindow.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3002";

const OrderActionWindow = ({ uid, mode }) => {
  const generalContext = useContext(GeneralContext);

  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const isBuyOrder = mode === "BUY";

  const handleSubmit = async () => {
    const quantity = Number(stockQuantity);
    const price = Number(stockPrice);

    if (
      !Number.isFinite(quantity) ||
      quantity <= 0 ||
      !Number.isFinite(price) ||
      price < 0
    ) {
      setError("Enter a valid quantity and price.");
      return;
    }

    try {
      setIsSubmitting(true);
      setError("");

      const response = await axios.post(
        `${API_URL}/newOrder`,
        {
          name: uid,
          qty: quantity,
          price,
          mode,
        },
        {
          withCredentials: true,
        },
      );

      console.log(response.data.message);
      generalContext.closeOrderWindow();
    } catch (error) {
      console.error(`Unable to ${mode.toLowerCase()} stock:`, error);

      setError(
        error.response?.data?.message ||
          `Unable to ${mode.toLowerCase()} the stock.`,
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container" id="buy-window">
      <div
        className="order-window-header"
        style={{
          backgroundColor: isBuyOrder ? "#4184f3" : "#ff5722",
        }}
      >
        <h3>
          {mode} {uid}
        </h3>
      </div>

      <div className="regular-order">
        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>

            <input
              type="number"
              min="1"
              step="1"
              value={stockQuantity}
              onChange={(event) => setStockQuantity(event.target.value)}
            />
          </fieldset>

          <fieldset>
            <legend>Price</legend>

            <input
              type="number"
              min="0"
              step="0.05"
              value={stockPrice}
              onChange={(event) => setStockPrice(event.target.value)}
            />
          </fieldset>
        </div>

        {error && <p className="order-error">{error}</p>}
      </div>

      <div className="buttons">
        <span>
          {isBuyOrder ? "Margin required" : "Estimated credit"} ₹
          {(Number(stockQuantity) * Number(stockPrice) || 0).toFixed(2)}
        </span>

        <div>
          <button
            type="button"
            className={isBuyOrder ? "btn btn-blue" : "btn btn-orange"}
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Processing..." : mode}
          </button>

          <button
            type="button"
            className="btn btn-grey"
            onClick={generalContext.closeOrderWindow}
            disabled={isSubmitting}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderActionWindow;
