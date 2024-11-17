import React from "react";
import "../../global.less";
import Dashboard from "../Dashboard/Dashboard";
import SearchBar from "../SearchBar/SearchBar";
import TransactionsList from "../Transactions/TransactionsList";

function Home() {
  return (
    <>
      <main>
        <Dashboard />
        <SearchBar />
        <TransactionsList />
      </main>
    </>
  );
}

export default Home;
