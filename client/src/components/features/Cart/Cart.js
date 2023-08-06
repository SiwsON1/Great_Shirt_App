import React from "react";
import { Container, Stack } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {Offcanvas} from "react-bootstrap"
import { useSelector, useDispatch } from "react-redux";
import { closeCart } from "../../../redux/orderRedux";
import { getCartOpen } from "../../../redux/orderRedux";

const Cart = () => {
  const dispatch = useDispatch();

  const cartOpen = useSelector(getCartOpen);
  const cartItems = useSelector();

  const handleCloseCart = () => {
    dispatch(closeCart());
  };

  return (
    <>
      <Offcanvas show={cartOpen} placement="end" onHide={handleCloseCart}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Cart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Stack gap={2}>
            {cartItems.length > 0 ? (
              cartItems.map((product) => (
                <Stack key={product.id} direction="horizontal">
                  {/* Wyświetl zawartość produktu */}
                </Stack>
              ))
            ) : (
              <div>No products in cart</div>
            )}

            <div className="boder-2 border-top mt-3 py-3">
              Total:<span className="text-secondary">1</span>
            </div>
            {cartItems.length > 0 && (
              <Button>Pay</Button>
            )}
          </Stack>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Cart;