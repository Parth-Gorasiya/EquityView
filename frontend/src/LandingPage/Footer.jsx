import React from 'react'

function Footer() {
  return (
    <footer style={{backgroundColor:"rgb(250,250,250)"}}>
    <div className='container border-top mt-5 ' >
      <div className="row mt-5">
        <div className="col-12 col-md-6 col-lg-3 mb-4">
          <img src='media/images/logo.svg' style={{width:"50%"}}/>
          <p>&copy; 2010 - 2026, Zerodha Broking Ltd.<br/>
          All rights reserved.</p>
        </div>

        <div className="col ">
          <p>Account</p>

          <a href="" >Open demat account</a><br/>
          <a href="" >Minor demat account</a><br/>
          <a href=""  >NRI demat account</a><br/>
          <a href=""    >HUF demat account</a><br/>
          <a href=""    >Commodity</a><br/>
          <a href=""    >Dematerialisation</a><br/>
          <a href=""    >Fund transfer</a><br/>
          <a href=""    >MTF</a><br/>
        </div>

        <div className="col">
          <p>Support</p>

          <a href=""     >Contact us</a><br/>
          <a href=""    >Support portal</a><br/>
          <a href=""    >How to file a complaint?</a><br/>
          <a href=""    >Status of your complaints</a><br/>
          <a href=""    >Bulletin</a><br/>
          <a href=""    >Zerodha.tech</a><br/>
          <a href=""    >Circular</a><br/>
          <a href=""    >Z-Connect blog</a><br/>
        </div>

        <div className="col">
          <p>Company</p>

          <a href=""    >About</a><br/>
          <a href=""    >Philosophy</a><br/>
          <a href=""    >Press & media</a><br/>
          <a href=""    >Careers</a><br/>
          <a href=""    >Zerodha Cares (CSR)</a><br/>
          <a href=""    >Zerodha.tech</a><br/>
          <a href=""    >Open source</a><br/>
          <a href=""    >Referral program</a><br/>
        </div>
        
      </div>
      <div className="footer-disclaimer  mt-5 text-muted">
  <p>
    Zerodha Broking Ltd.: Member of NSE, BSE, MCX & MSEI – SEBI Registration
    no.: INZ000031633 CDSL/NSDL: Depository services through Zerodha Broking
    Ltd. – SEBI Registration no.: IN-DP-431-2019 Registered Address: Zerodha
    Broking Ltd., #153/154, 4th Cross, Dollars Colony, Opp. Clarence Public
    School, J.P Nagar 4th Phase, Bengaluru - 560078, Karnataka, India. For any
    complaints pertaining to securities broking please write to{" "}
    <a href="mailto:complaints@zerodha.com">complaints@zerodha.com</a>, for DP
    related to <a href="mailto:dp@zerodha.com">dp@zerodha.com</a>. Please ensure
    you carefully read the Risk Disclosure Document as prescribed by SEBI | ICF
  </p>

  <p>
    Procedure to file a complaint on{" "}
    <a href="#" target="_blank" rel="noreferrer">
      SEBI SCORES/SMARTODR
    </a>
    : Register on SCORES portal & SMARTODR. Mandatory details for filing
    complaints on SCORES: Name, PAN, Address, Mobile Number, E-mail ID.
    Benefits: Effective Communication, Speedy redressal of grievances
  </p>

  <p>
    <a href="#" target="_blank" rel="noreferrer">
      Smart Online Dispute Resolution
    </a>
    {" | "}
    <a href="#" target="_blank" rel="noreferrer">
      Grievances Redressal Mechanism
    </a>
  </p>

  <p>
    Investments in securities market are subject to market risks; read all the
    related documents carefully before investing.
  </p>

  <p>
    Attention investors: 1) Stock brokers can accept securities as margins from
    clients only by way of pledge in the depository system w.e.f September 01,
    2020. 2) Update your e-mail and phone number with your stock broker /
    depository participant and receive OTP directly from depository on your
    e-mail and/or mobile number to create pledge. 3) Check your securities / MF /
    bonds in the consolidated account statement issued by NSDL/CDSL every month.
  </p>

  <p>
    India's largest broker based on networth as per NSE.{" "}
    <a href="#" target="_blank" rel="noreferrer">
      NSE broker factsheet
    </a>
  </p>

  <p>
    "Prevent unauthorised transactions in your account. Update your mobile
    numbers/email IDs with your stock brokers/depository participants. Receive
    information of your transactions directly from Exchange/Depositories on your
    mobile/email at the end of the day. Issued in the interest of investors. KYC
    is one time exercise while dealing in securities markets - once KYC is done
    through a SEBI registered intermediary (broker, DP, Mutual Fund etc.), you
    need not undergo the same process again when you approach another
    intermediary." Dear Investor, if you are subscribing to an IPO, there is no
    need to issue a cheque. Please write the Bank account number and sign the IPO
    application form to authorize your bank to make payment in case of
    allotment. In case of non allotment the funds will remain in your bank
    account. As a business we don't give stock tips, and have not authorized
    anyone to trade on behalf of others. If you find anyone claiming to be part
    of Zerodha and offering such services, please{" "}
    <a href="#" target="_blank" rel="noreferrer">
      create a ticket here
    </a>
    .
  </p>

  <p>
    *Customers availing insurance advisory services offered by Ditto (Tacterial
    Consulting Private Limited | IRDAI Registered Corporate Agent (Composite)
    License No CA0738) will not have access to the exchange investor grievance
    redressal forum, SEBI SCORES/ODR, or arbitration mechanism for such products.
  </p>

  <p>
    Fixed deposit products offered on this platform are third-party products
    (TPP) and are not Exchange traded products. These are offered through Blostem
    Fintech Private Limited. Zerodha Broking Limited (SEBI Registration No.:
    INZ000031633) is acting solely as a distributor for these products. Any
    disputes arising with respect to such distribution activity will not have
    access to SEBI SCORES/ODR, Exchange Investor Grievance Redressal Forum, or
    Arbitration mechanism. Fixed deposits are regulated by the Reserve Bank of
    India (RBI).
  </p>
</div>
</div>
</footer>
  )
}

export default Footer