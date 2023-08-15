import React from "react";
import { Stack } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {Offcanvas} from "react-bootstrap"
import { useSelector, useDispatch } from "react-redux";
import { closeCart } from "../../../redux/orderRedux";
import { getCartOpen } from "../../../redux/orderRedux";
import Currency from "../Currency/Currency";
import { getOnlyProductsInCart } from "../../../redux/orderRedux";
import { getTotalProductsInCart } from "../../../redux/orderRedux";
import { useState } from "react";
import { getTotalCartValue } from "../../../redux/orderRedux";
import styles from './Cart.module.scss';
import ProductInCart from "../ProductsInCart/ProductsInCart";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { loadCartFromStorage } from "../../../redux/orderRedux";
import { saveCartToStorage } from "../../../redux/orderRedux";

const Cart = () => {
  const dispatch = useDispatch();

  const cartOpen = useSelector(getCartOpen);
  const productsInCart = useSelector(getOnlyProductsInCart);
  const [activeNoteInputId, setActiveNoteInputId] = useState(null);
  const totalProductsInCart = useSelector(getTotalProductsInCart);
  const totalCartValue = useSelector(getTotalCartValue);
  const [currentNote, setCurrentNote] = useState("");
  console.log(productsInCart)

  const navigate = useNavigate();

  const handleCloseCart = () => {
    dispatch(closeCart());
  };


  const proceedToCheckout = (e) => {
    e.preventDefault();
    handleCloseCart();
    navigate('/order');
}

useEffect(() => {
  dispatch(loadCartFromStorage());
}, [dispatch]);

useEffect(() => {
  dispatch(saveCartToStorage());
}, [productsInCart, dispatch]);

  return (
    <>
      <Offcanvas show={cartOpen} onHide={handleCloseCart} placement="end" className={styles.customWidth}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Cart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Stack gap={2}>
            {productsInCart.length > 0 ? (
              productsInCart.map((product) => (
                <ProductInCart
                key={product.id}
                product={product}
            />

              ))
            ) : (
              <div>No products in cart</div>
            )}
            <div className="border-2 border-top mt-3 py-3">
              {
                totalProductsInCart === 0
                ? "No products yet, don't be afraid to add some"
                : `${totalProductsInCart} ${totalProductsInCart === 1 ? 'Product' : 'Products'} in Cart`
              }
            </div>
            <div className="border-2 border-top mt-3 px-3">
             Total Price: <span className="text-secondary"><Currency value={totalCartValue} /></span>
            </div>
            {totalProductsInCart > 0 && (
              <Button onClick={proceedToCheckout} >Proceed To Checkout</Button>
            )}
          </Stack>
        </Offcanvas.Body>
      </Offcanvas>

    </>
  );
};

export default Cart;