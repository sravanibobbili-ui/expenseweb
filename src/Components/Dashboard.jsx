import React, { useEffect, useState } from "react";
// import Page from "./Navmenu";
// import View from "./DonutChart";
import Header from "./Header";
import Navmenu from "./Navmenu";
import Balance from "./Balance";
import "./Dashboard.css";
import DonutChart from "./DonutChart";
const Dashboard = () => {
  const [user, setUser] = useState("");

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
    }
  }, []);

  return (
    <div className="dashboard-container">
      <Navmenu />
      <Header user={user} />
      <Balance user={user ? user.user_id : null} />
      <div className="content">
        <DonutChart userId={user ? user.user_id : null} />
      </div>
    </div>
  );
};

export default Dashboard;
