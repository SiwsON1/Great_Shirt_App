import React from "react";
import { Container, Stack } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {Offcanvas} from "react-bootstrap"
import { useSelector, useDispatch } from "react-redux";
import { closeCart } from "../../../redux/orderRedux";
import { getCartOpen } from "../../../redux/orderRedux";
import { getAllProductsInCart } from "../../../redux/orderRedux";
import Currency from "../Currency/Currency";
import { X, Pencil } from 'lucide-react';
import { removeFromCart } from "../../../redux/orderRedux";
import { getOnlyProductsInCart } from "../../../redux/orderRedux";
import { getTotalProductsInCart } from "../../../redux/orderRedux";
import { useState } from "react";
import { getTotalCartValue } from "../../../redux/orderRedux";
import { Modal } from "react-bootstrap";
import styles from './Cart.module.scss';
import { getProductAmountInCart } from "../../../redux/orderRedux";
import ProductInCart from "../ProductsInCart/ProductsInCart";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();

  const cartOpen = useSelector(getCartOpen);
  const productsInCart = useSelector(getOnlyProductsInCart);
  const [activeNoteInputId, setActiveNoteInputId] = useState(null);
  const totalProductsInCart = useSelector(getTotalProductsInCart);
  const totalCartValue = useSelector(getTotalCartValue);
  const [showModal, setShowModal] = useState(false);
  const [currentNote, setCurrentNote] = useState("");
  const amount = useSelector((state) => getProductAmountInCart(state, productsInCart.id));
  console.log(productsInCart)
  const [quantity, setQuantity] = useState(1|| amount);

  const navigate = useNavigate();

  const handleCloseCart = () => {
    dispatch(closeCart());
  };

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
}



  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentNote(""); // reset notatki
  };

  const handleAddNoteClick = (productId) => {
    setActiveNoteInputId(productId);
    setShowModal(true);
  };

  const handleConfirmNote = () => {
    console.log('Notatka dodana:', currentNote);
    handleCloseModal();
    // Tutaj możesz też przekazać notatkę do store Redux lub gdziekolwiek indziej
  };


  const proceedToCheckout = (e) => {
    e.preventDefault();
    //dispatch(checkout({cartProducts: cartProducts }));
    navigate('/order');
}



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
            <div className="boder-2 border-top mt-3 py-3">
              {
                totalProductsInCart === 0
                ? "No products yet, don't be afraid to add some"
                : `${totalProductsInCart} ${totalProductsInCart === 1 ? 'Product' : 'Products'} in Cart`
              }
            </div>
            <div className="boder-2 border-top mt-3 py-3">
             Total Price: <span className="text-secondary"><Currency value={totalCartValue} /></span>
            </div>
            {totalProductsInCart > 0 && (
              <Button onClick={proceedToCheckout} >Pay</Button>
            )}
          </Stack>
        </Offcanvas.Body>
      </Offcanvas>

    </>
  );
};

export default Cart;