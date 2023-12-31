import React from 'react';
import { Navbar, Nav, Image } from 'react-bootstrap';
import logo from './logo.png';
import styles from './NavBar.module.scss';
import NavbarActions from '../../features/NavActions/NavActions';
import Container from '../Container/Container';

const NavBar = () => {

  return (
    <Navbar collapseOnSelect expand="lg" className="bg-light shadow-sm mb-3" fixed="top">
      <Container>
        <Nav.Link className={styles.navlink} variant="dark" href="/"><h3 className="font-bold text-xl">GSA</h3></Nav.Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Navbar.Brand className="d-none d-lg-block">
                <Image className={styles.logo} src={logo} alt="logo" height={40} />
            </Navbar.Brand>
          </Nav>
          <Nav>
          <Nav.Link href="/aboutUsPage">About US</Nav.Link>
            <Nav.Link href="/delivery">Delivery</Nav.Link>
            <NavbarActions />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;