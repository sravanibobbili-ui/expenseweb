import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
// import Expense from "./Components/Expense";
import Create from "./Components/Create";
import Home from "./Components/Home";
import DonutChart from "./Components/DonutChart";
import Addexp from "./Components/Addexp";
import Navmenu from "./Components/Navmenu";
// import Signin from "./Components/Signin";
import Dashboard from "./Components/Dashboard";
import Header from "./Components/Header";
// import Account from "./Components/Account";
import Balance from "./Components/Balance";
import Profile from "./Components/Profile";
import Dataview from "./Components/Dataview";
import AddAccount from "./Components/AddAccount";
import AccountList from "./Components/AccountList";
// import DonutChart from "./Components/DonutChart";
const App = () => {
  return (
    <Router>
      {/* <div className="App"> */}
      <Routes>
        <Route path="/" exact element={<Login />} />
        <Route path="/Create" element={<Create />} />
        <Route exact path="/Login" element={<Login />} />
        {/* <Route path="/Create" exact element={<Create />} /> */}
        <Route path="/Addexp" element={<Addexp />} />
        {/* <Route path="/View:user" element={<View />} /> */}
        <Route path="/DonutChart" element={<DonutChart />} />
        <Route path="/Dataview" element={<Dataview />} />
        <Route path="/Navmenu/:user" element={<Navmenu />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        {/* <Route path="/Dashboard/:user/:username" element={<Dashboard />} /> */}
        <Route path="/Header/:user" element={<Header />} />
        {/* <Route path="/Account/:user" element={<Account />} /> */}
        <Route path="/Balance/:user" element={<Balance />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/AddAccount" element={<AddAccount />} />
        <Route path="/AccountList" element={<AccountList />} />
      </Routes>
      {/* </div> */}
    </Router>
    // <Expcat />
    // <Expensedata />
  );
};

export default App;
