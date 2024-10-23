import { useEffect, useState } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";

import Layout from "./layouts/Layout/Layout";

import Home from "./pages/Home/Home";
import Todo from "./pages/Todo/Todo";
import Calculator from "./pages/Calculator/Calculator";
import Carts from "./pages/Carts/Carts";
import Component from "./pages/Temperatus/Component/Component";
import Products from "./pages/Products/Products";
import Login from "./pages/Login/Login";
import Animation from "./pages/Animation/Animation";

import { fetchProducts } from "./Data/products";

import "./App.css";

const intTap = "layout";
function App() {
  const [tap, setTap] = useState("");

  useEffect(() => {
    setTap(intTap);
  }, []);

  const [role, setRole] = useState("");
  const [token, setToken] = useState("x");

  const [products, setProducts] = useState([]);
  const [carts, setCarts] = useState([]);

  useEffect(() => setProducts(fetchProducts()), []);

  useEffect(() => console.log(products), [products]);

  if (token === "") {
    return <Login setToken={setToken} setRole={setRole} />;
  } else {
    return (
      <div className="App-container">
        <HashRouter>
          <Routes>
            <Route
              element={
                <Layout
                  tap={tap}
                  setTap={setTap}
                  products={products}
                  carts={carts}
                  setToken={setToken}
                />
              }
            >
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/calculator" element={<Calculator />} />
              <Route path="/animation" element={<Animation />} />
              <Route path="/Temperatus" element={<Component />} />
              <Route path="/todo" element={<Todo />} />
              <Route
                path="/products"
                element={
                  <Products
                    products={products}
                    carts={carts}
                    setCarts={setCarts}
                  />
                }
              />
              <Route
                path="/carts"
                element={<Carts carts={carts} setCarts={setCarts} />}
              />
            </Route>
          </Routes>
        </HashRouter>
      </div>
    );
  }
}

export default App;
