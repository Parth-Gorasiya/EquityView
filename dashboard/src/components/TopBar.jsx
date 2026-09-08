import Menu from "./Menu.jsx";

const TopBar = () => {
  return (
    <header className="topbar-container">
      <div className="indices-container">
        <div className="nifty">
          <p className="index">NIFTY 50</p>
          <p className="index-points">100.20</p>
          <p className="percent">—</p>
        </div>

        <div className="sensex">
          <p className="index">SENSEX</p>
          <p className="index-points">100.20</p>
          <p className="percent">—</p>
        </div>
      </div>

      <Menu />
    </header>
  );
};

export default TopBar;