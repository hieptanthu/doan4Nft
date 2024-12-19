import React from "react";
import Link from "next/link";
import { Col, Container, Row, Button } from "react-bootstrap";
import ProductImg from "../product/common/ProductImg";
import lbr from "@/library";
import { background } from "@/image";
function CarouselItemShow({ NFT }) {
  console.log(background)
  return (
    <>
      <div className={"productDetailContainer"}>
        <div className={"productDetailBackground"}>
          <img
            src={background.src}
            alt="asas"
          />
        </div>
        <div style={{ zIndex: "2" }} className={"productDetailBackgroundItem"}>
          <div className={"productDetailItem"}>
            <Container>
              <Row style={{ textAlign: "center", alignItems: "center" }}>
                <Col xs={7}>
                  <ProductImg
                    LinkImg={
                      NFT?.image
                        ? NFT.image
                        : background
                    }
                    size="xl"
                  />
                </Col>
                <Col>
                  <div className={"listText"}>
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
                      <Link href={"/"} className={"nameProduct"}>
                        {NFT?.title ? NFT.title : "title"}
                      </Link>
                    </div>
                    <div>
                      <samp style={{ color: "rgb(225 225 225,0.5)" }}>
                        By <br />
                      </samp>
                      <Link href={"/"}>
                        {NFT?.owner
                          ? lbr.string.shortenAddress(NFT.owner)
                          : "owner name"}
                      </Link>
                    </div>
                    <div>
                      <p>
                        {NFT?.Description ? NFT.Description : "Description"}
                      </p>
                    </div>
                    <div>
                      <Button style={{ marginLeft: "10px" }} variant="light">
                        <Link href={" NFTdetail?tokenId="+NFT.tokenId}>
                        See
                      </Link>
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

export default CarouselItemShow;
