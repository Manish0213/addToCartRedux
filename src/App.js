import { useEffect, useState } from "react";
import "./App.css";
import CartItems from "./components/CartItems";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/cart" element={<CartItems/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
