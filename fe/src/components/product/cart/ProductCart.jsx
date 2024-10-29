import Card from "react-bootstrap/Card";
import ProductImg from "../common/ProductImg";
import Link from "next/link"; // Correct import
import { Col, Row } from "react-bootstrap";
import lbr from "@/library";
import { useState, useEffect } from "react";

const ProductCart = ({ state }) => {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (state) {
      setProduct(state);
    }
  }, [state]);

  if (!state) {
    return null; // Avoid rendering empty fragment
  }

  return (
    <Card
      className={"s"}
      style={{ width: "284px", height: "450px", margin: "10px 10px" }}
    >
      <Card.Header
        style={{
          textAlign: "center",
          alignItems: "center",
          borderBottom: "none",
        }}
      >
        <div className={"cardImg"} style={{ marginLeft: "-5px" }}>
          <ProductImg
            size="md"
            LinkImg={
              product && product.image && product.image !== ""
                ? product.image
                : "https://mekoong.com/wp-content/uploads/2022/10/7151752393896643867-5.jpg"
            }
          />
          <Link href={"/NFTdetail/?tokenId=" + product?.tokenId}>
            <button className="btn btn-light"> Details</button>
          </Link>
        </div>
      </Card.Header>
      <Card.Body>
        <Card.Title style={{ display: "flex", flexDirection: "column" }}>
          <Link href="#">
            <span
              style={{
                fontSize: "13px",
                color: "rgba(60, 54, 54, 0.7)",
                marginBottom: "5px",
              }}
            >
              by{" "}
              {lbr.string.shortenAddress(
                product && product.owner && product.owner ? product.owner : ""
              )}
            </span>
          </Link>
          <Link href="#">
            <span>
              {product && product.title ? product.title : "NFT test1"}
            </span>
          </Link>
        </Card.Title>
        <div className={"timeDown"}>
          <Row className={"timeDownText"}>
            <Col>NFT</Col>
          </Row>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCart;
