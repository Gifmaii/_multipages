import { Link } from "react-router-dom";

import "./Navbar.css";

function Navbar({ tap, setTap, products, carts, setToken }) {
  return (
    <div className="navbar-container">
      <Link to={"/home"}>
        <button
          className={
            "btn " + (tap === "home" ? " btn-primary" : "btn-outline-primary")
          }
          onClick={() => setTap("home")}
        >
          HOME
        </button>
      </Link>

      <Link to={"/calculator"}>
        <button
          className={
            "btn " +
            (tap === "calculator" ? " btn-primary" : "btn-outline-primary")
          }
          onClick={() => setTap("calculator")}
        >
          CALCULATOR
        </button>
      </Link>
      <Link to={"/animation"}>
        <button
          className={
            "btn " +
            (tap === "animation" ? " btn-primary" : "btn-outline-primary")
          }
          onClick={() => setTap("animation")}
        >
          ANIMATION
        </button>
      </Link>

      <Link to={"/Temperatus"}>
        <button
          className={
            "btn " +
            (tap === "Temperatus" ? " btn-primary" : "btn-outline-primary")
          }
          onClick={() => setTap("Temperatus")}
        >
          TEMPERATUS
        </button>
      </Link>

      <Link to={"/todo"}>
        <button
          className={
            "btn " + (tap === "todo" ? " btn-primary" : "btn-outline-primary")
          }
          onClick={() => setTap("todo")}
        >
          TODO
        </button>
      </Link>
      <Link to={"/products"}>
        <button
          className={
            "btn " +
            (tap === "products" ? " btn-primary" : "btn-outline-primary")
          }
          onClick={() => setTap("products")}
        >
          PRODUCT ({products.length})
        </button>
      </Link>
      <Link to={"/carts"}>
        <button
          style={{ boxShadow: "0 0 0.25rem gray", position: "relative" }}
          className={
            "btn " + (tap === "carts" ? " btn-primary" : "btn-outline-primary")
          }
          onClick={() => setTap("carts")}
        >
          CART
          {carts.length > 0 && (
            <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              {carts.length < 10 ? carts.length : "9+"}
              <span class="visually-hidden">unread messages</span>
            </span>
          )}
        </button>
      </Link>
      <button className="btn btn-outline-danger" style={{ marginLeft: "1rem"}} 
      onClick={(() => {setToken("")})}
      >LOGOUT</button>
    </div>
  );
}

export default Navbar;
