import React, { useContext } from "react";
import Link from "next/link";
import ProductImg from "../common/ProductImg";
import { Col, Container, Row, Button } from "react-bootstrap";
import lbr from "@/library";
import { useContract } from "@/context/NFTMarketplaceContext";
import { useRouter } from "next/router";

function ProductDetailSell({ NFT, NFTSell }) {
  const router = useRouter();
  const { contractSell, account } = useContext(useContract);
  const buyNFT = async () => {
    try {
      const data = await contractSell.Buy(NFT.tokenId, NFTSell.price);
      if (data) {
        alert("Buy Ok Token");
        router.push("/MyNFTs");
      } else {
        alert("error Buy");
      }
    } catch (error) {
      console.log("error Buy ", error);
    }
  };
  const cancelSell = async () => {
    try {
      const data = await contractSell.cancel(NFT.tokenId);
      if (data) {
        alert("cancelSell Ok Token");
        router.push("/MyNFTs");
      } else {
        alert("error cancelSell");
      }
    } catch (error) {
      console.log("error cancelSell ", error);
    }
  };

  return (
    <>
      {NFT != null ? (
        <div className={"productDetailContainer"}>
          <div className={"productDetailBackground"}>
            <img
              src="https://c.pxhere.com/images/03/bd/45d44ff74597ecf4d69dbd92d890-1448495.jpg!d"
              alt="asas"
            />
          </div>
          <div
            style={{ zIndex: "2" }}
            className={"productDetailBackgroundItem"}
          >
            <div className={"productDetailItem"}>
              <Container>
                <Row style={{ textAlign: "center", alignItems: "center" }}>
                  <Col xs={7}>
                    <ProductImg
                      LinkImg={
                        NFT?.image
                          ? NFT.image
                          : "https://mekoong.com/wp-content/uploads/2022/10/7151752393896643867-5.jpg"
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
                        {NFT && NFT.owner == account ? (
                          <>
                            <Button
                              style={{ marginLeft: "10px" }}
                              variant="light"
                              onClick={cancelSell}
                            >
                              <span>
                                Close Sell Sell with{" "}
                                {NFTSell && NFTSell.price
                                  ? lbr.number
                                      .fromWeiToNumber(NFTSell.price)
                                      .toString()
                                  : "Price not available"}{" "}
                              </span>
                            </Button>
                          </>
                        ) : (
                          <Button
                            style={{ marginLeft: "10px" }}
                            variant="light"
                            onClick={buyNFT}
                          >
                            <span>
                              Buy With{" "}
                              {NFTSell && NFTSell.price
                                ? lbr.number.fromWeiToNumber(NFTSell.price)
                                : "Price not available"}{" "}
                              ETH
                            </span>
                          </Button>
                        )}
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
      ) : (
        <></>
      )}
    </>
  );
}

export default ProductDetailSell;
