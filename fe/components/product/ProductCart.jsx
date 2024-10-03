import Card from "react-bootstrap/Card";
import ProductImg from "./ProductImg";
import Style from "./style.module.css";
import { Link } from "next/link";
import { Col, Row } from "react-bootstrap";
function ProductCart() {
  return (
    <div>
      {/* <Link to={"/ProductDetail/1"}> */}
      <Card className={Style.card} style={{ width: "284px", height: "400px " }}>
        <Card.Header
          style={{
            textAlign: "center",
            alignItems: "center",
            borderBottom: "none",
          }}
        >
          <div className={Style.cardImg} style={{ marginLeft: "-5px" }}>
            <ProductImg
              size="md"
              LinkImg="https://mekoong.com/wp-content/uploads/2022/10/7151752393896643867-5.jpg"
            />
            <Link className="btn btn-light">Product details</Link>
          </div>
        </Card.Header>
        <Card.Body>
          <Card.Title style={{ display: "flex", flexDirection: "column" }}>
            <Link
              style={{
                fontSize: "13px",
                color: "rgb(60, 54, 54, 0.7)",
                marginBottom: "5px",
              }}
            >
              by shara
            </Link>
            <Link>Card Title</Link>
          </Card.Title>
          <div className={Style.timeDown}>
            <Row className={Style.timeDownText}>
              <Col>remaining:</Col>
              <Col>23:11:15</Col>
            </Row>
          </div>
        </Card.Body>
      </Card>
      {/* </Link> */}
    </div>
  );
}

export default ProductCart;
