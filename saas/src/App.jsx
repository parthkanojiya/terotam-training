import React from "react";
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import LogoTicker from "./components/LogoTicker/LogoTicker";
import Product from "./components/Product/Product";
import EverythingNeed from "./components/EverythingNeed/EverythingNeed";
import Pricing from "./components/Pricing/Pricing";
import Testimonials from "./components/Testimonials/Testimonials";
import SignUp from "./components/SignUp/SignUp";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <LogoTicker />
        <Product />
        <EverythingNeed />
        <Pricing />
        <Testimonials />
        <SignUp />
        <Footer />
      </main>
    </>
  );
}

export default App;
