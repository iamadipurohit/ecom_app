import Link from "next/link";
import React from "react";
import { AiOutlineShopping } from "react-icons/ai";

import Cart from "./Cart";
import { useStateContext } from "@/context/StateContext";
const Navbar = () => {
  const { showCart, setshowCart, totalQuantities } = useStateContext();
  return (
    <div className="navbar-container">
      <p className="logo">
        <Link href="/">PARODY</Link>
      </p>

      <button
        type="button"
        onClick={() => {
          setshowCart((prev) => !prev);
        }}
        className="cart-icon"
      >
        <AiOutlineShopping></AiOutlineShopping>
        <span className="cart-item-qty">{totalQuantities}</span>
      </button>
      {showCart && <Cart></Cart>}
    </div>
  );
};

export default Navbar;
