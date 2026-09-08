import { useContext, useState } from "react";
import axios from "axios";

import GeneralContext from "./GeneralContext.jsx";
import "./BuyActionWindow.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3002";

const BuyActionWindow = ({ uid }) => {
  const { closeBuyWindow } = useContext(GeneralContext);

  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const marginRequired =
    Number(stockQuantity || 0) * Number(stockPrice || 0);

  const handleBuyClick = async (event) => {
    event.preventDefault();
    setError("");

    const quantity = Number(stockQuantity);
    const price = Number(stockPrice);

    if (!Number.isInteger(quantity) || quantity <= 0) {
      setError("Enter a valid quantity.");
      return;
    }

    if (!Number.isFinite(price) || price <= 0) {
      setError("Enter a valid stock price.");
      return;
    }

    try {
      setIsSubmitting(true);

      await axios.post(`${API_URL}/newOrder`, {
        name: uid,
        qty: quantity,
        price,
        mode: "BUY",
      });

      closeBuyWindow();
    } catch (error) {
      console.error("Unable to place order:", error);
      setError("Unable to place the order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancelClick = () => {
    closeBuyWindow();
  };

  return (
    <div className="container" id="buy-window">
      <form onSubmit={handleBuyClick}>
        <div className="regular-order">
          <p className="stock-name">Buy {uid}</p>

          <div className="inputs">
            <fieldset>
              <legend>Qty.</legend>

              <input
                type="number"
                name="qty"
                id="qty"
                min="1"
                step="1"
                value={stockQuantity}
                onChange={(event) =>
                  setStockQuantity(event.target.value)
                }
              />
            </fieldset>

            <fieldset>
              <legend>Price</legend>

              <input
                type="number"
                name="price"
                id="price"
                min="0.05"
                step="0.05"
                value={stockPrice}
                onChange={(event) =>
                  setStockPrice(event.target.value)
                }
              />
            </fieldset>
          </div>
        </div>

        {error && (
          <p className="order-error" role="alert">
            {error}
          </p>
        )}

        <div className="buttons">
          <span>
            Margin required ₹
            {marginRequired.toLocaleString("en-IN", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </span>

          <div>
            <button
              type="submit"
              className="btn btn-blue"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Placing..." : "Buy"}
            </button>

            <button
              type="button"
              className="btn btn-grey"
              onClick={handleCancelClick}
              disabled={isSubmitting}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default BuyActionWindow;