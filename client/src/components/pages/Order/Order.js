import { Row, Col, Stack } from 'react-bootstrap';
import styles from './Order.module.scss';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { getTotalCartValue, getCart } from '../../../redux/orderRedux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { purchaseRequest } from '../../../redux/orderRedux';
import Currency from '../../features/Currency/Currency';
import { clearCart } from '../../../redux/orderRedux';
import { getNoteFromCartById } from '../../../redux/orderRedux';

const Order = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartProducts = useSelector(getCart);
   const state = useSelector(state => state);
  const cartProductsComments = cartProducts.map(prod => getNoteFromCartById(state, prod.product.id));

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [address, setAddress] = useState('');
  const [code, setCode] = useState('');
  const [city, setCity] = useState('');
  const [payment, setPayment] = useState('');
  const [deliveryOption, setDeliveryOption] = useState('');

  const {
    register,
    handleSubmit: validate,
    formState: { errors },
  } = useForm();



  const totalPrice = useSelector(getTotalCartValue);
  console.log('produkty w koszyku', cartProducts);

  const handleSubmit = () => {
    dispatch(
      purchaseRequest({
        products: cartProducts,
        totalPrice: totalPrice,
        client: {
          id: uuidv4(),
          email: email,
          name: name,
          surname: surname,
          address: address,
          code: code,
          city: city,
          payment: payment,
          delivery: deliveryOption,
        },
        id: uuidv4(),
      }),
    );
    dispatch(clearCart());
    navigate('/thankYouPage');
  };

  return (
    <div className={styles.container}>
      <Form className={styles.form} onSubmit={validate(handleSubmit)}>
        <Col className={styles.formCol} lg={7}>
          <h3>Contact Details</h3>
          <Row>
            <Col lg={12}>
              <Form.Label>E-MAIL</Form.Label>
              <Form.Control
                {...register('email', {
                  required: 'You have to use a valid email',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: 'You have to use a valid email',
                  },
                })}
                className={styles.input}
                value={email}
                type="text"
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && (
                <small className="d-block form-text text-danger mt-2">
                  {errors.email.message}
                </small>
              )}
            </Col>
            <Col lg={4}>
              <Form.Label>First Name</Form.Label>
              <Form.Control
                {...register('name', {
                  required: 'Please enter your first name',
                  minLength: {
                    value: 3,
                    message: 'First name should be at least 3 characters long',
                  },
                  maxLength: {
                    value: 25,
                    message: 'First name should not exceed 25 characters',
                  },
                  pattern: {
                    value: /^[a-zA-Z\s]+$/,
                    message: 'First name can only contain letters and spaces',
                  },
                })}
                className={styles.inputShort}
                value={name}
                type="text"
                onChange={(e) => setName(e.target.value)}
              />
              {errors.name && (
                <small className="d-block form-text text-danger mt-2">
                  {errors.name.message}
                </small>
              )}
            </Col>
            <Col lg={8}>
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                {...register('surname', {
                  required: 'Please enter your last name',
                  minLength: {
                    value: 3,
                    message: 'Last name should be at least 3 characters long',
                  },
                  maxLength: {
                    value: 40,
                    message: 'Last name should not exceed 40 characters',
                  },
                  pattern: {
                    value: /^[a-zA-Z\s]+$/,
                    message: 'Last name can only contain letters and spaces',
                  },
                })}
                className={styles.inputLong}
                value={surname}
                type="text"
                onChange={(e) => setSurname(e.target.value)}
              />
              {errors.surname && (
                <small className="d-block form-text text-danger mt-2">
                  {errors.surname.message}
                </small>
              )}
            </Col>
          </Row>
          <Form.Label>Address</Form.Label>
          <Form.Control
            {...register('address', {
              required: 'Please fill in your address',
              minLength: {
                value: 3,
                message: 'Address should be at least 3 characters long',
              },
              maxLength: {
                value: 50,
                message: 'Address should not exceed 50 characters',
              },
              pattern: {
                value: /^[a-zA-Z0-9\s.,-]+$/,
                message:
                  'Address can contain only letters, numbers, spaces, dots, commas, and hyphens',
              },
            })}
            className={styles.input}
            value={address}
            type="text"
            onChange={(e) => setAddress(e.target.value)}
          />
          {errors.address && (
            <small className="d-block form-text text-danger mt-2">
              {errors.address.message}
            </small>
          )}

          <Row>
            <Col lg={4}>
              <Form.Label>Post Code</Form.Label>
              <Form.Control
                {...register('code', {
                  required: 'Please fill in your Post Code',
                  minLength: {
                    value: 3,
                    message: 'Post Code should be at least 3 characters long',
                  },
                  maxLength: {
                    value: 8,
                    message: 'Post Code should not exceed 8 characters',
                  },
                  pattern: {
                    value: /^[a-zA-Z0-9\s-]+$/,
                    message:
                      'Please provide valid post code',
                  },
                })}
                className={styles.inputShort}
                value={code}
                type="text"
                onChange={(e) => setCode(e.target.value)}
              />
              {errors.code && (
                <small className="d-block form-text text-danger mt-2">
                  {errors.code.message}
                </small>
              )}
            </Col>
            <Col lg={8}>
              <Form.Label>City</Form.Label>
              <Form.Control
                {...register('city', {
                  required: 'Please fill in your city',
                  minLength: {
                    value: 2,
                    message: 'City name should be at least 2 characters long',
                  },
                  maxLength: {
                    value: 50,
                    message: 'City name should not exceed 50 characters',
                  },
                  pattern: {
                    value: /^[a-zA-Z\s\-']+$/,
                    message:
                      'Please provide valid City',
                  },
                })}
                className={styles.inputLong}
                value={city}
                type="text"
                onChange={(e) => setCity(e.target.value)}
              />
              {errors.city && (
                <small className="d-block form-text text-danger mt-2">
                  {errors.city.message}
                </small>
              )}
            </Col>
          </Row>

          <Row>
            <Col lg={4}>
              <Form.Label>Payment</Form.Label>
              <Form.Control
                {...register('payment', { required: true })}
                as="select"
                value={payment}
                onChange={(e) => setPayment(e.target.value)}
              >
                <option value="">Select Payment method</option>
                <option key="PayPal" value="PayPal">
                  PayPal
                </option>
                <option key="CreditCard" value="CreditCard">
                  Credit card
                </option>
                <option key="DebitCard" value="DebitCard">
                  Debit card
                </option>
              </Form.Control>
              {errors.payment && (
                <small className="d-block form-text text-danger mt-2">
                  Please select a payment method
                </small>
              )}
            </Col>
          </Row>
        </Col>
        <Col lg={5}>
          <h3>Summary</h3>
          {cartProducts.map((prod, index) => (
  <Col key={prod.product.id} className={styles.summary} lg={12}>
    <Row className={styles.summaryCol}>
      <Col lg={3}>
        <div className={styles.imageContainer}>
          <img
            className={styles.productImage}
            src={`../images/products/${prod.product.image}`}
            alt={prod.product.name}
            width={100}
            height={100}
            style={{
              objectFit: 'cover',
              objectPosition: 'center',
            }}
          />
          {/* Comment is now absolutely positioned */}
          <div className={styles.comment}>
            {cartProductsComments[index]}
          </div>
        </div>
      </Col>
                <Col className={styles.title} lg={5}>
                  {prod.product.name}
                </Col>
                <Col lg={2}>{prod.amount}</Col>
                <Col lg={2}>
                  <Currency value={prod.amount * prod.product.price} />
                </Col>
              </Row>
            </Col>
          ))}

          <Col lg={12}>
            <Row className={styles.totalAmount}>
              <Col className={styles.infoPrice} lg={6}>
                Order amount:
              </Col>
              <Col className={styles.total} lg={6}>
                <Currency value={totalPrice} />
              </Col>
            </Row>
          </Col>
          <Stack>
            <div className="mb-3 mt-2">
              <h5>Please choose delivery method</h5>
              <label
                className="form-check  border-top position-relative d-block"
                htmlFor="DpdSelfPick"
              >
                <input
                  {...register('deliveryOption', { required: true })}
                  className="form-check-input position-absolute top-50 translate-middle-y"
                  type="radio"
                  name="deliveryOption"
                  id="DpdSelfPick"
                  value="DpdSelfPick"
                  checked={deliveryOption === 'DpdSelfPick'}
                  onChange={(e) => setDeliveryOption(e.target.value)}
                />
                <div>
                  <p>DPD Pick-up Point</p>
                  <div className="position-absolute top-55 end-0 translate-middle-y">
                    <img
                      src={`../images/logos/dpd.png`}
                      alt="DPD Icon"
                      className={styles.carrierIcon}
                    />
                  </div>
                  <p>The shipping itself will take 2 days</p>
                </div>
              </label>

              <label
                className="form-check  border-top position-relative d-block"
                htmlFor="DPD"
              >
                <input
                  {...register('deliveryOption', { required: true })}
                  className="form-check-input position-absolute top-50 translate-middle-y"
                  type="radio"
                  name="deliveryOption"
                  id="DPD"
                  value="DPD"
                  checked={deliveryOption === 'DPD'}
                  onChange={(e) => setDeliveryOption(e.target.value)}
                />
                <div>
                  <p>DPD</p>
                  <div className="position-absolute top-55 end-0 translate-middle-y">
                    <img
                      src={`../images/logos/dpd.png`}
                      alt="DPD Icon"
                      className={styles.carrierIcon}
                    />
                  </div>
                  <p>The shipping itself will take 2 days</p>
                </div>
              </label>
              <label
                className="form-check  border-top position-relative d-block"
                htmlFor="UPS"
              >
                <input
                  {...register('deliveryOption', { required: true })}
                  className="form-check-input position-absolute top-50 translate-middle-y"
                  type="radio"
                  name="deliveryOption"
                  id="UPS"
                  value="UPS"
                  checked={deliveryOption === 'UPS'}
                  onChange={(e) => setDeliveryOption(e.target.value)}
                />
                <div>
                  <p>UPS Standard</p>
                  <div className="position-absolute top-55 end-0 translate-middle-y">
                    <img
                      src={`../images/logos/ups.png`}
                      alt="UPS Icon"
                      className={styles.carrierIconUps}
                    />
                  </div>
                  <p>The shipping itself will take 2 days</p>
                </div>
              </label>
              <label
                className="form-check  border-top position-relative d-block"
                htmlFor="PP"
              >
                <input
                  {...register('deliveryOption', { required: true })}
                  className="form-check-input position-absolute top-50 translate-middle-y"
                  type="radio"
                  name="deliveryOption"
                  id="PP"
                  value="PP"
                  checked={deliveryOption === 'PP'}
                  onChange={(e) => setDeliveryOption(e.target.value)}
                />
                <div>
                  <p>Polish Post Parcel48 with delivery to the customer</p>
                  <div className="position-absolute top-55 end-0 translate-middle-y">
                    <img
                      src={`../images/logos/pp.png`}
                      alt="PP Icon"
                      className={styles.carrierIcon}
                    />
                  </div>
                  <p>The shipping itself will take 4 days</p>
                </div>
              </label>

              {errors.deliveryOption && (
                <small className="d-block form-text text-danger mt-2">
                  Please choose shipping method
                </small>
              )}
            </div>
          </Stack>
          <button type="submit" class="btn btn-danger text-uppercase w-25 mt-5">
            Pay
          </button>
        </Col>
      </Form>
    </div>
  );
};

export default Order;
