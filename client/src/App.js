
import { Routes, Route } from "react-router-dom";
import Home from './components/pages/Home/Home';

import Header from "./components/views/Header/Header";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {loadProdRequest} from "./redux/productsRedux";
import Container from "./components/views/Container/Container";
import "bootstrap/dist/css/bootstrap.min.css";
import CartLayout from "./components/features/Cart/Cart";
import SingleProduct from "./components/pages/SingleProduct/SingleProduct";
import Order from "./components/pages/Order/Order";
import ThankYouPage from "./components/pages/ThankYouPage/ThankYouPage";
import Footer from "./components/views/Footer/Footer";
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadProdRequest())
  }, [dispatch]);


  return (
      <Container>
        <Header />
         <CartLayout />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<SingleProduct />} />
          <Route path="/order" element={<Order />} />
          <Route path="/thankYouPage" element={<ThankYouPage />} />
        </Routes>
        <Footer />
    </Container>
  );
}

export default App;
