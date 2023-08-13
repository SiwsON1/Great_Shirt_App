
import ProductsGrid from "../../features/ProductsGrid/ProductsGrid";
import { useSelector } from 'react-redux';
import FeatureBoxes from "../../features/FeatureBoxes/FeatureBoxes";
import { getProducts } from "../../../redux/productsRedux";
import Slider from "../../features/Slider/Slider";
const Home = () => {

  const prod = useSelector(getProducts);

  return (
    <>
    <FeatureBoxes />
  <Slider />
    <ProductsGrid prod={prod} />
    </>
  );
};

  export default Home