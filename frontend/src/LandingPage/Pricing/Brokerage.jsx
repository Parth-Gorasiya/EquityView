import React from "react";

function Brokerage() {
  return (
    <div className="container">
      <div className="row py-5 mt-5 text-center border-top">
        <div className="col-12 col-md-8 p-4">
          <a href="#" className="brokerage-link">
            <h3 className="fs-5">Brokerage Calculator</h3>
          </a>

          <ul className="brokerage-list text-muted">
            <li>
              Call & Trade and RMS auto-square-off: Additional charges of ₹50 +
              GST per order.
            </li>

            <li>Digital contract notes will be sent via email.</li>

            <li>
              Physical copies of contract notes, if required, shall be charged
              ₹20 per contract note. Courier charges apply.
            </li>

            <li>
              For NRI accounts (non-PIS), 0.5% or ₹100 per executed equity order,
              whichever is lower.
            </li>

            <li>
              For NRI accounts (PIS), 0.5% or ₹200 per executed equity order,
              whichever is lower.
            </li>

            <li>
              If the account has a debit balance, any order placed will be
              charged ₹40 per executed order instead of ₹20 per executed order.
            </li>
          </ul>
        </div>

        <div className="col-12 col-md-4 p-4">
  <a href="" className="brokerage-link">
    <h3 className="fs-5">List of Charges</h3>
  </a>

  <ul className="brokerage-list text-muted">
    <li>₹0 brokerage on equity delivery investments.</li>
    <li>₹20 or 0.03% per executed intraday order, whichever is lower.</li>
    <li>₹20 per executed futures and options order.</li>
    <li>₹300 annual account maintenance charge plus GST.</li>
    <li>Depository charges apply when shares are sold.</li>
    <li>Applicable taxes and regulatory charges are added separately.</li>
  </ul>
</div>
      </div>
    </div>
  );
}

export default Brokerage;