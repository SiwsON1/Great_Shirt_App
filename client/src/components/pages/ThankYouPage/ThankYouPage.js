import {Col, Row} from 'react-bootstrap';
import { PackagePlus } from 'lucide-react';
import styles from './ThankYouPage.module.scss';
const ThankYouPage = () => {
    return (
        <Row className={`d-flex justify-content-center ${styles.thankYouContainer}`}>
        <Col lg={12} className={`d-flex justify-content-center ${styles.header}`}>
            <div className={styles.thankYouIcon}>
                <PackagePlus />
            </div>
            <h1>Order received</h1>
        </Col>
        <Col lg={8} className={`d-flex justify-content-center ${styles.message}`}>
            <p className='text-center'>
                Thank you for placing an order in our store! Your order has been forwarded for processing.
                Await a confirmation email.
            </p>
        </Col>
        <Col lg={8} className={`d-flex justify-content-center ${styles.info}`}>
            <p className='text-center'>
                Have any questions? Contact us or check the order status in the user panel.
            </p>
        </Col>
      </Row>
    );
};

export default ThankYouPage;