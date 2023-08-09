import { useParams } from 'react-router-dom';
import { getProductById } from '../../../redux/productsRedux';
import { useSelector } from 'react-redux';
import { Star } from 'lucide-react';
import styles from './SingleProduct.module.scss';
import { Button } from "react-bootstrap"
import { decrementAmount, getTotalProductsInCart, incrementAmount } from '../../../redux/orderRedux';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { addToCart } from '../../../redux/orderRedux';

const SingleProduct = () => {
  const { id } = useParams();
  const product = useSelector((state) => getProductById(state, id));
  console.log(product);
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);


  const handleIncrement = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
}

const orderHandler = (e) => {
  e.preventDefault();
  dispatch(addToCart(product, quantity));
}
const handleDecrement = () => {
  setQuantity(prevQuantity => prevQuantity > 1 ? prevQuantity - 1 : prevQuantity);
}
  if (!product) {
    return <div>Loading...</div>; // lub inny komponent / wiadomość, który chcesz wyświetlić w tym przypadku
  }
  return (

  <div className="card">
    <div className="row g-0">
      <div className="col-md-6 border-end">
        <div className="d-flex flex-column justify-content-center">
          <div className={styles.main_image}>
            <img
              src={`../images/products/${product.image}`}
              alt={product.name}
              width="350"
            />
          </div>
          <div className={styles.thumbnail_images}>
            <ul id="thumbnail">
              <li>
                <img
                  onclick="changeImage(this)"
                  src="https://i.imgur.com/TAzli1U.jpg"
                  width="70"
                />
              </li>
              <li>
                <img
                  onclick="changeImage(this)"
                  src="https://i.imgur.com/w6kEctd.jpg"
                  width="70"
                />
              </li>
              <li>
                <img
                  onclick="changeImage(this)"
                  src="https://i.imgur.com/L7hFD8X.jpg"
                  width="70"
                />
              </li>
              <li>
                <img
                  onclick="changeImage(this)"
                  src="https://i.imgur.com/6ZufmNS.jpg"
                  width="70"
                />
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <div className="p-3 position-relative">
          <div className="d-flex justify-content-center">
            <h3>{product.name}</h3>
          </div>
          <div className="mt-2 pr-3">
            <p className={styles.description}>
              {product.description}
            </p>
          </div>
          <h3>$430.99</h3>
          <div className={`d-flex flex-row align-items-center ${styles.ratings}`}>
            <div className="d-flex flex-row">
                <Star />
                <Star />
                <Star />
                <Star />
                <Star />
            </div>
          </div>
          <div className="row mt-3 mb-3">
                    <div className="row mb-2">
                    <div className="col-3">
                        Type:
                    </div>
                    <div className="col-9">
                        "t-shirt"
                    </div>
                </div>
                <div className="row mb-2">
                    <div className="col-3">
                        Color:
                    </div>
                    <div className="col-9">
                        "white"
                    </div>
                </div>
                <div className="row mb-2">
                    <div className="col-3">
                        Material:
                    </div>
                    <div className="col-9">
                        "cotton"
                    </div>
                </div>
                <div className="row">
                    <div className="col-3">
                        Brand:
                    </div>
                    <div className="col-9">
                        "Nike"
                    </div>
                </div>
                </div>
<div className="row mb-4">
    <div className="col-md-4 col-6 mb-2">
        <label className="form-label">Size</label>
        <select className="form-select">
            <option value="x">X</option>
            <option value="s">S</option>
            <option value="m">M</option>
            <option value="l">L</option>
        </select>
    </div>
    <div className="col-md-4 col-6 mb-3">
        <label className="form-label d-block">Quantity</label>
        <div className={`input-group ${styles.inputGroup}`}>
            <button className={`btn btn-outline-secondary ${styles.btn}`}
            onClick={handleDecrement}
            type="button">-</button>
            <input type="text" className={`form-control text-center ${styles.formControl}`} value={quantity} />
            <button className={`btn btn-outline-secondary ${styles.btn}`}
            onClick={handleIncrement}
            type="button">+</button>
        </div>
    </div>
    <div className="mb-3">
<div class="cart mt-4 align-items-center">
   <button class="btn btn-danger text-uppercase mr-2 px-4" onClick={e => orderHandler(e)}>
    Add to cart
    </button>
   </div>
</div>
</div>

        </div>
      </div>
    </div>
  </div>
  );
};
export default SingleProduct;
