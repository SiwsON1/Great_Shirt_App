
import ProductsGrid from "../../features/ProductsGrid/ProductsGrid";
import { useSelector } from 'react-redux';
import { getProducts } from "../../../redux/productsRedux";

const Home = () => {

  const prod = useSelector(getProducts);

  return (
    <>
    <ProductsGrid prod={prod} />
    </>
  );
};

  export default Home