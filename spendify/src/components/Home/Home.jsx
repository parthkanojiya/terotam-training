import React from "react";
import "../../global.less";
import Dashboard from "../Dashboard/Dashboard";
import TransactionsList from "../Transactions/TransactionsList";

function Home() {
  return (
    <>
      <main>
        <Dashboard />
        <TransactionsList />
      </main>
    </>
  );
}

export default Home;
