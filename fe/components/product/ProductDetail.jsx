import { Col, Container, Row } from "react-bootstrap";
import Style from "./style.module.css";
import ProductImg from "./ProductImg";
import Link from "next/link";
import Button from "react-bootstrap/Button";
function ProductDetail({ _state }) {
  return (
    <>
      <div className={Style.productDetailContainer}>
        <div className={Style.productDetailBackground}>
          <img
            src="https://v5.airtableusercontent.com/v3/u/33/33/1726783200000/SiC8cuMZW1vkkK3mx9DyiQ/VMd8jAm_6RUj-8aEnPbgyLcTU4SRuMcTQmcgVzqrI9sjQqgEwbrMDXkxn_lhcu70dO9VtcBPjl-GD4nm60X5PQXq6FsU-i_zSJrjJ3Q5JiLltucDPcLviAxl-k2BqkEvph6gfq8acXP8pjLRy7O5bQ/jS8X2WPpdHyYcVc7O75XImlu5oT7NTYuAoLkoe2UMs8"
            alt=""
          />
        </div>
        <div className={Style.productDetailBackgroundItem}>
          <div className={Style.productDetailItem}>
            <Container>
              <Row style={{ textAlign: "center", alignItems: "center" }}>
                <Col xs={7}>
                  <ProductImg
                    size="xl"
                    LinkImg="https://mekoong.com/wp-content/uploads/2022/10/7151752393896643867-5.jpg"
                  />
                </Col>
                <Col>
                  <div className={Style.listText}>
                    <div>
                      <samp
                        style={{
                          fontFamily: "inherit",
                          fontSize: "16px",
                          lineHeight: "20px",
                          fontWeight: 500,
                        }}
                      >
                        MINTING NOW
                      </samp>
                    </div>
                    <div>
                      <Link className={Style.nameProduct}>
                        Toshi in Singapore
                      </Link>
                    </div>
                    <div>
                      <samp style={{ color: "rgb(225 225 225,0.5)" }}>By</samp>
                      <Link> Toshi_base</Link>
                    </div>
                    <div>
                      <p>
                        BASE's favorite blue cat has arrived in Singapore for
                        Token2049! To celebrate, mint the exclusive 'Toshi in
                        Singapore' artwork, only available during Token2049.
                        Don't miss out on this limited edition drop!
                      </p>
                    </div>
                    <div>
                      <Button variant="light">
                        <span>Mint for 0.0003 ETH</span>
                      </Button>
                    </div>
                    <div>
                      <span>22:06:49 </span>
                      <samp>Thursday, 19 September 2024</samp>
                    </div>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetail;
