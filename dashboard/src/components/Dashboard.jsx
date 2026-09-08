import { Route, Routes } from "react-router-dom";

import Apps from "./Apps.jsx";
import Funds from "./Funds.jsx";
import Holdings from "./Holdings.jsx";
import Orders from "./Orders.jsx";
import Positions from "./Positions.jsx";
import Summary from "./Summary.jsx";
import WatchList from "./WatchList.jsx";
import { GeneralContextProvider } from "./GeneralContext.jsx";

const Dashboard = () => {
  return (
    <GeneralContextProvider>
      <div className="dashboard-container">
        <WatchList />

        <div className="content">
          <Routes>
            <Route path="/" element={<Summary />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/holdings" element={<Holdings />} />
            <Route path="/positions" element={<Positions />} />
            <Route path="/funds" element={<Funds />} />
            <Route path="/apps" element={<Apps />} />
          </Routes>
        </div>
      </div>
    </GeneralContextProvider>
  );
};

export default Dashboard;