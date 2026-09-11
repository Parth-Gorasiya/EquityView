import { useEffect, useState } from "react";
import axios from "axios";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3002";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const fetchOrders = async () => {
      try {
        setError("");

        const response = await axios.get(`${API_URL}/allOrders`, {
          withCredentials: true,
          signal: controller.signal,
        });

        setOrders(response.data);
      } catch (error) {
        if (error.code !== "ERR_CANCELED") {
          console.error("Unable to fetch orders:", error);

          setError(
            error.response?.data?.message ||
              "Unable to load orders."
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    fetchOrders();

    return () => controller.abort();
  }, []);

  const formatPrice = (price) =>
    Number(price).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  const formatDate = (date) => {
    if (!date) {
      return "—";
    }

    return new Date(date).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  if (isLoading) {
    return <p>Loading orders...</p>;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  return (
    <>
      <h3 className="title">Orders ({orders.length})</h3>

      {orders.length === 0 ? (
        <div className="orders">
          <div className="no-orders">
            <p>You have not placed any orders yet.</p>
          </div>
        </div>
      ) : (
        <div className="order-table">
          <table>
            <thead>
              <tr>
                <th>Time</th>
                <th>Instrument</th>
                <th>Type</th>
                <th>Qty.</th>
                <th>Price</th>
                <th>Total</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => {
                const quantity = Number(order.qty);
                const price = Number(order.price);
                const total = quantity * price;
                const isBuyOrder = order.mode === "BUY";

                return (
                  <tr key={order._id}>
                    <td>{formatDate(order.createdAt)}</td>

                    <td>{order.name}</td>

                    <td
                      className={isBuyOrder ? "profit" : "loss"}
                    >
                      {order.mode}
                    </td>

                    <td>{quantity}</td>

                    <td>₹{formatPrice(price)}</td>

                    <td>₹{formatPrice(total)}</td>

                    <td className="profit">Completed</td>
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

export default Orders;