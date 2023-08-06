import React, { useEffect, useState, } from "react";
import { ShoppingCart } from "lucide-react";
import { useNavigate} from 'react-router-dom';
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { openCart } from "../../../redux/orderRedux";
const NavbarActions = () => {


  const dispatch = useDispatch();


  const handleOpenCart = () => {
    dispatch(openCart(true));
  };




  return (
    <div className="ml-auto d-flex align-items-center gap-3">
      <button
        onClick={handleOpenCart}
        className="btn btn-dark d-flex align-items-center rounded-pill px-4"
      >
        <ShoppingCart
          size={20}
          color="white"
        />
        <span className="ms-2 fs-sm font-weight-bold text-white">
          0
        </span>
      </button>
    </div>
  );
};

export default NavbarActions;