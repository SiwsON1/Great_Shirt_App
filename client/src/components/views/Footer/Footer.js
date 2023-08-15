import { Container, Row, Col } from 'react-bootstrap';
import styles from './Footer.module.scss';
import { Instagram, Twitter, Facebook } from 'lucide-react';

const Footer = () => {
    return (
        <footer className={`bg-secondary shadow-sm mb-3 ${styles.footer}`}>
            <Container>
                <Row className={styles.footerTop}>
                    <Col md={4} className={styles.brand}>
                        <h3>StreetShop</h3>
                        <p>Discover the latest street fashion trends.</p>
                    </Col>
                    <Col md={4} className={styles.quickLinks}>
                        <h4>Quick Links</h4>
                        <ul>
                            <li><a href="/about">About Us</a></li>
                            <li><a href="/contact">Contact</a></li>
                            <li><a href="/returns">Returns & Exchanges</a></li>
                            <li><a href="/shipping">Shipping</a></li>
                        </ul>
                    </Col>
                    <Col md={4} className={styles.connect}>
                        <h4>Connect With Us</h4>
                        <div className={styles.socialIcons}>
                        <Instagram className={styles.icon} />
                        <Twitter className={styles.icon} />
                        <Facebook className={styles.icon} />
                    </div>
                    </Col>
                </Row>
                <Row className={styles.footerBottom}>
                    <Col className={styles.copy}>
                        © 2023 StreetShop. All Rights Reserved. Powered by SiwsON1.
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;