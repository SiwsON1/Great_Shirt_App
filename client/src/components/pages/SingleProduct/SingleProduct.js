import { useParams } from 'react-router-dom';
import { getProductById } from '../../../redux/productsRedux';
import styles from './SingleProduct.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { addToCart } from '../../../redux/orderRedux';
import { useEffect } from 'react';
import ProductRating from '../../features/ProductRating/ProductRating';
import Currency from '../../features/Currency/Currency'

const SingleProduct = () => {
  const { id } = useParams();
  const product = useSelector((state) => getProductById(state, id));
  console.log(product);
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [mainImageSrc, setMainImageSrc] = useState(null);
  const [thumbnailImages, setThumbnailImages] = useState([]);

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

useEffect(() => {
  if (product) {
    setMainImageSrc(`../images/products/${product.image}`);
  }
}, [product]);

const changeImage = (clickedImageSrc, clickedIndex) => {
  if (clickedImageSrc === mainImageSrc) return;

  let newThumbnails = [...thumbnailImages];
  newThumbnails[clickedIndex] = mainImageSrc;

  setMainImageSrc(clickedImageSrc);
  setThumbnailImages(newThumbnails);
};


useEffect(() => {
  if (product) {
    const mainImgSrc = `../images/products/${product.image}`;
    setMainImageSrc(mainImgSrc);

    const allImages = [
      mainImgSrc,
      `../images/products/${product.imageTop}`,
      `../images/products/${product.imageBottom}`,
      `../images/products/${product.imageLeft}`,
      `../images/products/${product.imageRight}`
    ];

    const filteredImages = allImages.filter(src => src !== mainImgSrc);
    setThumbnailImages(filteredImages.slice(0, 4)); // Zwraca maksymalnie cztery miniaturki
  }
}, [product]);



  if (!product) {
    return <div>Loading...</div>;
  }
  return (

  <div className="card">
    <div className="row g-0">
      <div className="col-md-6 border-end">
        <div className="d-flex flex-column justify-content-center">
          <div className={styles.main_image}>
            <img
              src={mainImageSrc}
              alt={product.name}
              width="350"
            />
          </div>
          <div className={styles.thumbnail_images}>
      <ul id="thumbnail">
        {thumbnailImages.map((src, index) => (
          <li key={index}>
            <img
               onClick={() => changeImage(src, index)}
              src={src}
              width="70"
              alt={product.name}
            />
          </li>
        ))}
      </ul>
    </div>
        </div>
      </div>
      <div className="col-md-6">
        <div className="p-3 position-relative">
          <div className="d-flex justify-content-center">
            <h3>{product.name}</h3>
          </div>
          <div className="d-flex justify-content-between mt-3 align-items-center">
          <div className="d-flex align-items-center gap-1">
            <strong className="mr-2">Price: </strong>
            <Currency value={product.price} />
          </div>
          <ProductRating id={id} name={product.name} stars={product.rating} />
        </div>
          <div className="mt-3 pr-3">
            <p className={styles.description}>
            Product details
            </p>
            {product.description}
          </div>
          <div className="row mt-3 mb-3 border-bottom border-dark" >
                    <div className="row mb-2">
                    <div className="col-3">
                      <span className="fw-bold">Type:</span>
                    </div>
                    <div className="col-9">
                        {product.type}
                    </div>
                </div>
                <div className="row mb-2">
                    <div className="col-3">
                        <span className="fw-bold">Color:</span>
                    </div>
                    <div className="col-9">
                    {product.color}
                    </div>
                </div>
                <div className="row mb-2">
                    <div className="col-3">
                        <span className="fw-bold">Material:</span>
                    </div>
                    <div className="col-9">
                        {product.material}
                    </div>
                </div>
                <div className="row">
                    <div className="col-3">
                        <span className="fw-bold">Brand:</span>
                    </div>
                    <div className="col-9">
                        {product.brand}
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
