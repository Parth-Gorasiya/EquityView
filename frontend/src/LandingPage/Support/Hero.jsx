import React from "react";

function Hero() {
  return (
    <section className="container-fluid" id="supportHero">
      <div className="container">
        <div className="py-4" id="supportWrapper">
          <h4 className="mb-0">Support Portal</h4>
          <a href="#">Track Tickets</a>
        </div>

        <div className="row py-5">
          <div className="col-12 col-lg-7 pe-lg-5">
            <h1 className="fs-3">
              Search for an answer or browse help topics to create a ticket
            </h1>

            <input
              type="search"
              className="mt-4"
              placeholder="Eg. how do I activate F&O?"
              aria-label="Search support topics"
            />

            <div className="support-links mt-4">
              <a href="#">Track account opening</a>
              <a href="#">Track segment activation</a>
              <a href="#">Intraday margins</a>
              <a href="#">Kite user manual</a>
            </div>
          </div>

          <div className="col-12 col-lg-5 mt-5 mt-lg-0 ps-lg-5">
            <h2 className="fs-3">Featured</h2>

            <ol className="featured-list mt-4">
              <li>
                <a href="#">
                  Current Takeovers and Delisting – January 2026
                </a>
              </li>

              <li>
                <a href="#">Latest Intraday leverages – MIS & CO</a>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;