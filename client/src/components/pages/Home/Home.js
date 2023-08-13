
import ProductsGrid from "../../features/ProductsGrid/ProductsGrid";
import { useSelector } from 'react-redux';
import FeatureBoxes from "../../features/FeatureBoxes/FeatureBoxes";
import { getProducts } from "../../../redux/productsRedux";


const Home = () => {

  const prod = useSelector(getProducts);

  return (
    <>
    <FeatureBoxes />
    <ProductsGrid prod={prod} />
    </>
  );
};

  export default Home