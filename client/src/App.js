
import { Routes, Route } from "react-router-dom";
import Home from './components/pages/Home/Home';

import Header from "./components/views/Header/Header";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {loadProdRequest} from "./redux/productsRedux";
import Container from "./components/views/Container/Container";
import "bootstrap/dist/css/bootstrap.min.css";
import CartLayout from "./components/features/Cart/Cart";

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
        </Routes>
    </Container>
  );
}

export default App;
