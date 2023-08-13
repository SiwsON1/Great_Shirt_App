import React from 'react';
import { useSelector } from 'react-redux';
import { getProductAmountInCart } from "../../../redux/orderRedux";
import styles from './ProductsInCart.module.scss';
import { Container, Stack } from "react-bootstrap";
import { useState } from 'react';
import Currency from '../Currency/Currency';
import { X, Pencil } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { removeFromCart } from '../../../redux/orderRedux';
import { Modal } from 'react-bootstrap';
import Button from "react-bootstrap/Button";
import { updateCart } from '../../../redux/orderRedux';

const ProductInCart = ({ product }) => {
    const amount = useSelector(state => getProductAmountInCart(state, product.id));
    const [quantity, setQuantity] = useState(amount|| 1);
    const [showModal, setShowModal] = useState(false);
    const [currentNote, setCurrentNote] = useState("");
    const [activeNoteInputId, setActiveNoteInputId] = useState(null);
    const dispatch = useDispatch();

    const handleCloseModal = () => {
        setShowModal(false);
        setCurrentNote("");
      };
    const handleAddNoteClick = (productId) => {
        setActiveNoteInputId(productId);
        setShowModal(true);
      };
      const handleRemoveFromCart = (productId) => {
        dispatch(removeFromCart(productId));
    }
    const handleConfirmNote = () => {
        console.log('Notatka dodana:', currentNote);
        handleCloseModal();
        // Tutaj możesz też przekazać notatkę do store Redux lub gdziekolwiek indziej
      };

      const handleDecrement = () => {
        setQuantity(prevQuantity => {
            const newQuantity = prevQuantity > 1 ? prevQuantity - 1 : prevQuantity;
            dispatch(updateCart({id: product.id, amount: newQuantity}));
            return newQuantity;
        });
    };
      const handleIncrement = () => {
        setQuantity(prevQuantity => {
            const newQuantity = prevQuantity < 10 ? prevQuantity + 1 : prevQuantity;
            dispatch(updateCart({id: product.id, amount: newQuantity}));
            return newQuantity;
        });
    }
    return (
        <Stack key={product.id} direction="horizontal" className="d-flex align-items-center justify-content-center">
                  <Stack >
  <div className="d-flex flex-column align-items-center">
    <img
      src={`../images/products/${product.image}`}
      alt={product.name}
      width={100}
      height={100}
      style={{
        objectFit: "cover",
        objectPosition: "center",
      }}
    />

  </div>
  </Stack>
  <Container>
    <Stack gap={2}>
      <div>{product.name}</div>

      <div>
        <Currency value={product.price* quantity} />
      </div>
    </Stack>
  </Container>

<Stack direction="horizontal" className="mr-5">
  <button onClick={handleDecrement}
                  className={styles.buttonAmount}>-</button>
                            {quantity}
                        <button onClick={handleIncrement}
                        className={` ${styles.buttonAmount}`}>+
                        </button>
                        </Stack>


                  <div className=" d-flex gap-2">
                  <button
                      onClick={() => handleAddNoteClick(product.id)}
                      className="rounded-circle d-flex align-items-center justify-content-center bg-white border shadow p-2 mr-2"
                    >
                      <Pencil size={15} />
                    </button>
                  <button
                    onClick={() => handleRemoveFromCart(product.id)}
                    className="rounded-circle d-flex align-items-center justify-content-center bg-white border shadow p-2"
                  >
                    {<X size={15} />}
                  </button>
                  </div>


                  <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>What would you like to change?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <textarea
            value={currentNote}
            onChange={(e) => setCurrentNote(e.target.value)}
            placeholder="Add your note here..."
            rows="4"
            style={{ width: "100%" }}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleConfirmNote}>
            Add Note
          </Button>
        </Modal.Footer>
      </Modal>
                </Stack>

    );
}

export default ProductInCart;