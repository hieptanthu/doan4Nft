import ProductCart from "./ProductCart";
import { Row, Col } from "react-bootstrap";
function ListProduct() {
  return (
    <>
      <Row>
        <Col>
          <ProductCart />
        </Col>
        <Col>
          <ProductCart />
        </Col>
        <Col>
          <ProductCart />
        </Col>
        <Col>
          <ProductCart />
        </Col>
        <Col>
          <ProductCart />
        </Col>
        <Col>
          <ProductCart />
        </Col>
        <Col>
          <ProductCart />
        </Col>
      </Row>
    </>
  );
}

export default ListProduct;
