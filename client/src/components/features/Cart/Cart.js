import React from "react";
import { Container, Stack } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {Offcanvas} from "react-bootstrap"
import { useSelector, useDispatch } from "react-redux";
import { closeCart } from "../../../redux/orderRedux";
import { getCartOpen } from "../../../redux/orderRedux";
import { getAllProductsInCart } from "../../../redux/orderRedux";
import Currency from "../Currency/Currency";
import { X } from 'lucide-react';
import { removeFromCart } from "../../../redux/orderRedux";
import { getOnlyProductsInCart } from "../../../redux/orderRedux";
import { getTotalProductsInCart } from "../../../redux/orderRedux";
import { getTotalCartValue } from "../../../redux/orderRedux";

const Cart = () => {
  const dispatch = useDispatch();

  const cartOpen = useSelector(getCartOpen);
  const productsInCart = useSelector(getOnlyProductsInCart);

  const totalProductsInCart = useSelector(getTotalProductsInCart);
  const totalCartValue = useSelector(getTotalCartValue);

  const handleCloseCart = () => {
    dispatch(closeCart());
  };

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
}


  return (
    <>
      <Offcanvas show={cartOpen} onHide={handleCloseCart} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Cart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Stack gap={2}>
            {productsInCart.length > 0 ? (
              productsInCart.map((product) => (
                <Stack key={product.id} direction="horizontal">
                  <img
                    src={`./images/products/${product.image}`}
                    alt={product.name}
                    fill
                    width={100}
                    height={100}
                    style={{ objectFit: "cover",
                             objectPosition: "center",
                          }}
                  />
                  <Container>
                    <Stack gap={2}>
                      <div>{product.name}</div>
                      <div>
                      <Currency value={product.price} />
                      </div>
                    </Stack>
                  </Container>
                  <div className="absolute right-4 top-4">
                  <button
                    onClick={() => handleRemoveFromCart(product.id)}
                    className="rounded-circle d-flex align-items-center justify-content-center bg-white border shadow p-2"
                  >
                    {<X size={15} />}
                  </button>
                  </div>
                </Stack>
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
              <Button >Pay</Button>
            )}
          </Stack>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Cart;