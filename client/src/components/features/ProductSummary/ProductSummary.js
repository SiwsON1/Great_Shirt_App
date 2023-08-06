import React from "react";
import { Navigate } from "react-router";
import { Expand, ShoppingCart } from "lucide-react";
import Currency from "../Currency/Currency";
import styles from './ProductSummary.module.scss';
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addOrder } from '../../../redux/orderRedux';
import { getOrders } from '../../../redux/orderRedux';
import { useSelector } from 'react-redux';
import { getProductById } from '../../../redux/productsRedux';
import { v4 as uuidv4 } from 'uuid';


const ProductSummary = ({ name, description, id, image, price }) => {

    const dispatch = useDispatch();
    const [isHovered, setIsHovered] = useState(false);
    const [show, setShow] = useState(false);

    const product = useSelector((state) => getProductById(state, id));
    const orders = useSelector(getOrders);

    const handleMouseEnter = () => {
      setIsHovered(true);
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
    };
  const handleClick = () => {
    <Navigate to="/" />;
  };

  const orderHandler = (e) => {
    e.preventDefault();

    const orderItem = {
      id: uuidv4(),
      product: {...product},
      amount: 1,
    };

    dispatch(addOrder(orderItem));
  }

  return (
    <div
      onClick={handleClick}
      className="container bg-white group cursor-pointer rounded-3 border p-3 my-4"
    >
      {/* Image & actions */}
      <div className="ratio ratio-1x1 rounded-3 bg-gray-100 relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
  <img
    src={`./images/products/${image}`}
    alt=""
    fill
    style={{objectFit: "cover"}}
    className="ratio ratio-1x1 object-cover img-fluid rounded-2"
  />
 {isHovered && (
    <div className="d-flex align-items-end justify-content-center">
      <div className="d-flex justify-content-center gap-2 mb-2">
        <button className="btn btn-light">
          <Expand size={20} className="text-muted" />
        </button>
        <button onClick={e => orderHandler(e)} className="btn btn-light">
          <ShoppingCart size={20} className="text-muted" />
        </button>
      </div>
    </div>
 )}
</div>
      {/* Description */}
      <div>
        <p className="font-semibold text-lg">{name}</p>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
      {/* Price & Reiew */}
      <div className="d-flex items-center justify-between">
        <Currency value={price} />
      </div>
    </div>
  );
};

export default ProductSummary;