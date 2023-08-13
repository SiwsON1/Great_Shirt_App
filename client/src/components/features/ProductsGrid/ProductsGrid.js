
import { Col, Row } from "react-bootstrap";
import ProductSummary from "../ProductSummary/ProductSummary";

const ProductsGrid = ({prod}) => {

  if (prod.length === 0) return 'No products to display'

  return (
    <Row xs={1} md={2} lg={3}>
      {prod.map(p =>
        <Col key={p.id}>
            <ProductSummary {...p} />
        </Col>
        )}
    </Row>
  );
};

  export default ProductsGrid;