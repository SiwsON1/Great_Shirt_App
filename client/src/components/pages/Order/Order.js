import { Row, Col, Stack } from 'react-bootstrap';
import styles from './Order.module.scss';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  getOnlyProductsInCart,
  getTotalCartValue,
  getCart,
} from '../../../redux/orderRedux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { IMGS_URL } from '../../../config';
import { v4 as uuidv4 } from 'uuid';
import { purchaseRequest } from '../../../redux/orderRedux';
import Currency from '../../features/Currency/Currency';

const Order = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const cartProducts = useSelector(getCart);

  const totalPrice = useSelector(getTotalCartValue);
  //const comment = useSelector(getComment)
  console.log(cartProducts);

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
    navigate('/thanksPage');
  };

  return (
    <div className={styles.container}>
      <Form className={styles.form} onSubmit={validate(handleSubmit)}>
        <Col className={styles.formCol} lg={7}>
          <h3>Dane Kontaktowe</h3>

          <Row>
            <Col lg={12}>
              <Form.Label>E-MAIL</Form.Label>
              <Form.Control
                {...register('email', {
                  required: true,
                  minLength: 3,
                  maxLength: 50,
                })}
                className={styles.input}
                value={email}
                type="text"
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && (
                <small className="d-block form-text text-danger mt-2">
                  Uzupełnij swój adres e-mail
                </small>
              )}
            </Col>

            <Col lg={4}>
              <Form.Label>Imię*</Form.Label>
              <Form.Control
                {...register('name', {
                  required: true,
                  minLength: 3,
                  maxLength: 25,
                })}
                className={styles.inputShort}
                value={name}
                type="text"
                onChange={(e) => setName(e.target.value)}
              />
              {errors.name && (
                <small className="d-block form-text text-danger mt-2">
                  Uzupełnij swoje imię
                </small>
              )}
            </Col>

            <Col lg={8}>
              <Form.Label>Nazwisko*</Form.Label>
              <Form.Control
                {...register('surname', {
                  required: true,
                  minLength: 3,
                  maxLength: 40,
                })}
                className={styles.inputLong}
                value={surname}
                type="text"
                onChange={(e) => setSurname(e.target.value)}
              />
              {errors.surname && (
                <small className="d-block form-text text-danger mt-2">
                  Uzupełnij swoje nazwisko
                </small>
              )}
            </Col>
          </Row>
          <Form.Label>Adres*</Form.Label>
          <Form.Control
            {...register('address', {
              required: true,
              minLength: 3,
              maxLength: 50,
            })}
            className={styles.input}
            value={address}
            type="text"
            onChange={(e) => setAddress(e.target.value)}
          />
          {errors.address && (
            <small className="d-block form-text text-danger mt-2">
              Uzupełnij swój adres
            </small>
          )}

          <Row>
            <Col lg={4}>
              <Form.Label>Kod pocztowy*</Form.Label>
              <Form.Control
                {...register('code', {
                  required: true,
                  minLength: 3,
                  maxLength: 8,
                })}
                className={styles.inputShort}
                value={code}
                type="text"
                onChange={(e) => setCode(e.target.value)}
              />
              {errors.code && (
                <small className="d-block form-text text-danger mt-2">
                  Uzupełnij kod pocztowy
                </small>
              )}
            </Col>

            <Col lg={8}>
              <Form.Label>Miasto*</Form.Label>
              <Form.Control
                {...register('city', {
                  required: true,
                  minLength: 2,
                  maxLength: 50,
                })}
                className={styles.inputLong}
                value={city}
                type="text"
                onChange={(e) => setCity(e.target.value)}
              />
              {errors.city && (
                <small className="d-block form-text text-danger mt-2">
                  Uzupełnij miasto
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
          <h3>Podsumowanie</h3>
          {cartProducts.map((prod) => (
            <Col key={prod.product.id} className={styles.summary} lg={12}>
              <Row className={styles.summaryCol}>
                <Col lg={3}>
                  <div className={styles.image}>
                    <img
                      src={`../images/products/${prod.product.image}`}
                      alt={prod.product.name}
                      width={100}
                      height={100}
                      style={{
                        objectFit: 'cover',
                        objectPosition: 'center',
                      }}
                    />
                  </div>
                </Col>
                <Col className={styles.title} lg={5}>
                  {prod.product.name}
                </Col>
                <Col lg={2}>{prod.amount}</Col>
                <Col lg={2}><Currency value={prod.amount * prod.product.price}/></Col>
              </Row>
            </Col>
          ))}

          <Col lg={12}>
            <Row className={styles.totalAmount}>
              <Col className={styles.infoPrice} lg={6}>
                Kwota zamówienia:
              </Col>
              <Col className={styles.total} lg={6}>
                <Currency value={totalPrice} />
              </Col>
            </Row>
          </Col>
          <Stack>
            <div className="mb-3 mt-2">
              <h5>Wybierz sposób dostawy</h5>
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
                  <p>DPD Odbiór w punkcie</p>
                  <div className="position-absolute top-55 end-0 translate-middle-y">
                    <img
                      src={`../images/logos/dpd.png`}
                      alt="DPD Icon"
                      className={styles.carrierIcon}
                    />
                  </div>
                  <p>Sam transport zajmie 2 dni</p>
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
                  <p>Sam transport zajmie 2 dni</p>
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
                  <p>Sam transport zajmie 2 dni</p>
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
                  <p>Poczta Polska Paczka48 z dostawą do klienta</p>
                  <div className="position-absolute top-55 end-0 translate-middle-y">
                    <img
                      src={`../images/logos/pp.png`}
                      alt="PP Icon"
                      className={styles.carrierIcon}
                    />
                  </div>
                  <p>Sam transport zajmie 4 dni</p>
                </div>
              </label>

              {errors.deliveryOption && (
                <small className="d-block form-text text-danger mt-2">
                  Proszę wybrać sposób dostawy.
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
