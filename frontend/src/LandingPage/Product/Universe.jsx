import React from "react";

function Universe() {
  return (
    <div className="container universe-section">
      <div className="text-center">
        <h1>The Zerodha Universe</h1>

        <p className="mt-4">
          Extend your trading and investment experience even further with our
          partner platforms.
        </p>
      </div>

      <div className="row text-center mt-4 gy-5">
        <div className="col-12 col-md-4 universe-item">
          <div className="universe-logo-box">
            <img
              src="/media/images/zerodhaFundhouse.png"
              alt="Zerodha Fund House"
              className="universe-logo"
            />
          </div>

          <p>
            Our asset management venture that is creating simple and transparent
            index funds to help you save for your goals.
          </p>
        </div>

        <div className="col-12 col-md-4 universe-item">
          <div className="universe-logo-box">
            <img
              src="/media/images/sensibullLogo.svg"
              alt="Sensibull"
              className="universe-logo"
            />
          </div>

          <p>
            Options trading platform that lets you create strategies, analyze
            positions, and examine data points like open interest, FII/DII, and
            more.
          </p>
        </div>

        <div className="col-12 col-md-4 universe-item">
          <div className="universe-logo-box">
            <img
              src="/media/images/tijori.svg"
              alt="Tijori"
              className="universe-logo"
            />
          </div>

          <p>
            Investment research platform that offers detailed insights on
            stocks, sectors, supply chains, and more.
          </p>
        </div>

        <div className="col-12 col-md-4 universe-item">
          <div className="universe-logo-box">
            <img
              src="/media/images/streakLogo.png"
              alt="Streak"
              className="universe-logo"
            />
          </div>

          <p>
            Systematic trading platform that allows you to create and backtest
            strategies without coding.
          </p>
        </div>

        <div className="col-12 col-md-4 universe-item">
          <div className="universe-logo-box">
            <img
              src="/media/images/smallcaseLogo.png"
              alt="Smallcase"
              className="universe-logo"
            />
          </div>

          <p>
            Thematic investing platform that helps you invest in diversified
            baskets of stocks or ETFs.
          </p>
        </div>

        <div className="col-12 col-md-4 universe-item">
          <div className="universe-logo-box">
            <img
              src="/media/images/dittoLogo.png"
              alt="Ditto"
              className="universe-logo"
            />
          </div>

          <p>
            Personalized advice on life and health insurance. No spam and no
            mis-selling.
          </p>
        </div>
        <button className='p-2 btn btn-primary fs-5 mb-5 mt-5' style={{width: '20%', margin:"0 auto"}}>Signup for free</button>
      </div>
    </div>
  );
}

export default Universe;