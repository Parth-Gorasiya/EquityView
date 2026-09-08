import { positions } from "../data/data.js";

const Positions = () => {
  return (
    <>
      <h3 className="title">Positions ({positions.length})</h3>

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

              const currentValue = currentPrice * quantity;
              const profitAndLoss =
                currentValue - averagePrice * quantity;

              const profitClass =
                profitAndLoss >= 0 ? "profit" : "loss";

              const dayClass = stock.isLoss ? "loss" : "profit";

              return (
                <tr key={stock._id || `${stock.product}-${stock.name}`}>
                  <td>{stock.product}</td>
                  <td>{stock.name}</td>
                  <td>{quantity}</td>
                  <td>{averagePrice.toFixed(2)}</td>
                  <td>{currentPrice.toFixed(2)}</td>
                  <td className={profitClass}>
                    {profitAndLoss.toFixed(2)}
                  </td>
                  <td className={dayClass}>{stock.day}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Positions;