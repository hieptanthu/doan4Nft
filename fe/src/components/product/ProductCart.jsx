import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ProductImg from "./ProductImg";
import Style from "./style.module.css";
import { Link } from "react-router-dom";
function ProductCart() {
  return (
    <div>
      <Card className={Style.card} style={{ width: "284px", height: "400px " }}>
        <Card.Header
          style={{
            textAlign: "center",
            alignItems: "center",
            borderBottom: "none",
          }}
        >
          <div style={{ marginLeft: "-5px" }}>
            <ProductImg
              size="md"
              LinkImg="https://mekoong.com/wp-content/uploads/2022/10/7151752393896643867-5.jpg"
            />
          </div>
        </Card.Header>
        <Card.Body>
          <Card.Title style={{ display: "flex", flexDirection: "column" }}>
            <Link style={{ fontSize: "13px", color: "rgb(60, 54, 54, 0.7)" }}>
              by shara
            </Link>
            <Link>Card Title</Link>
          </Card.Title>
          <div>oke</div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default ProductCart;