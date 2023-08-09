import React from "react";
import { ShoppingCart } from "lucide-react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getTotalProductsInCart } from "../../../redux/orderRedux";
import { openCart } from "../../../redux/orderRedux";

const NavbarActions = () => {


  const dispatch = useDispatch();


  const handleOpenCart = () => {
    dispatch(openCart(true));
  };
  const totalProductsInCart = useSelector(getTotalProductsInCart);



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
          {totalProductsInCart}
        </span>
      </button>
    </div>
  );
};

export default NavbarActions;