import React from "react";
import { Expand, ShoppingCart } from "lucide-react";
import Currency from "../Currency/Currency";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from '../../../redux/orderRedux';
import { useSelector } from 'react-redux';
import { getProductById } from '../../../redux/productsRedux';
import { useNavigate } from 'react-router-dom';

const ProductSummary = ({ name, description, id, image, price }) => {

    const dispatch = useDispatch();
    const [isHovered, setIsHovered] = useState(false);

    const product = useSelector((state) => getProductById(state, id));
    const navigate = useNavigate();

    const handleMouseEnter = () => {
      setIsHovered(true);
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
    };

  const viewHandler = () => {
    navigate(`/product/${id}`);
  }

  const orderHandler = (e) => {
    e.preventDefault();
    dispatch(addToCart(product, 1));
  }

  return (
    <div
      className="container bg-white group cursor-pointer rounded-3 border p-3 my-4"
    >
      <div className="ratio ratio-1x1 rounded-3 bg-gray-100 relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
  <img
    src={`./images/products/${image}`}
    alt=""
    style={{objectFit: "cover"}}
    className="ratio ratio-1x1 img-fluid rounded-2"
  />
 {isHovered && (
    <div className="d-flex align-items-end justify-content-center">
      <div className="d-flex justify-content-center gap-2 mb-2">
        <button onClick={viewHandler}  className="btn btn-light">
          <Expand size={20} className="text-muted" />
        </button>
        <button onClick={e => orderHandler(e)} className="btn btn-light">
          <ShoppingCart size={20} className="text-muted" />
        </button>
      </div>
    </div>
 )}
</div>
      <div className="d-flex justify-content-between">
      <p className="fw-bold ">{name}</p>
        <Currency value={price} />
      </div>
    </div>
  );
};

export default ProductSummary;