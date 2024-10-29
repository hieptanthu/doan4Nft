import { Col, Container, Row } from "react-bootstrap";
import ProductImg from "../common/ProductImg";
import Link from "next/link";
import Button from "react-bootstrap/Button";
import { useEffect, useState, useContext } from "react";
import modal from "./modal";
import Web3 from "web3";
import { useContract } from "@/context/NFTMarketplaceContext";
import lbr from "@/library";
import { useRouter } from "next/router";
function ProductDetail({ _product }) {
  const { contractMyNFT, contractSell, contractAuction, account } =
    useContext(useContract);
  const [product, setProduct] = useState({});
  const [showSell, setShowSell] = useState(false);
  const [showAuction, setShowAuction] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setProduct(_product);
  }, [_product]);

  const sell = async (data) => {
    try {
      if (data < 0) {
        return alert("price < 0");
      }
      if (await contractMyNFT.approveSell(product.tokenId)) {
        if (await contractSell.Sell(product.tokenId, data)) {
          alert("sell");
          router.reload();
        }
      }
    } catch (error) {
      console.log("sell false", error);
    }
  };

  const Auction = async (data) => {
    try {
      if (data < 0) {
        return alert("price < 0");
      }
      if (await contractMyNFT.approveAuction(product.tokenId)) {
        if (
          await contractAuction.Auction(
            product.tokenId,
            data.startPice,
            data.startTime,
            data.endTime
          )
        ) {
          alert("Auction");
          router.push("/MyNFTs");
        }
      }
    } catch (error) {
      console.log("Auction false", error);
    }
  };

  return (
    <>
      {showSell ? (
        <modal.sell
          show={showSell}
          dataOut={sell}
          handleClose={() => {
            setShowSell(!showSell);
          }}
        />
      ) : (
        <></>
      )}

      {showAuction ? (
        <modal.auction
          show={showAuction}
          dataOut={Auction}
          handleClose={() => {
            setShowAuction(!showAuction);
          }}
        />
      ) : (
        <></>
      )}
      <div className={"productDetailContainer"}>
        <div className={"productDetailBackground"}>
          <img
            src="https://c.pxhere.com/images/03/bd/45d44ff74597ecf4d69dbd92d890-1448495.jpg!d"
            alt=""
          />
        </div>
        <div style={{ zIndex: "2" }} className={"productDetailBackgroundItem"}>
          <div className={"productDetailItem"}>
            <Container>
              <Row style={{ textAlign: "center", alignItems: "center" }}>
                <Col xs={7}>
                  <ProductImg
                    size="xl"
                    LinkImg={
                      product?.image
                        ? product.image
                        : "https://mekoong.com/wp-content/uploads/2022/10/7151752393896643867-5.jpg"
                    }
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
                        {product?.title ? product.title : "title"}
                      </Link>
                    </div>
                    <div>
                      <samp style={{ color: "rgb(225 225 225,0.5)" }}>
                        By <br />
                      </samp>
                      <Link href={"/"}>
                        {product?.owner
                          ? lbr.string.shortenAddress(product.owner)
                          : "owner name"}
                      </Link>
                    </div>
                    <div>
                      <p>
                        {product?.Description
                          ? product.Description
                          : "Description"}
                      </p>
                    </div>
                    <div>
                      {product && product.owner === account ? (
                        <>
                          <Button
                            onClick={() => {
                              setShowSell(!showSell);
                            }}
                            variant="light"
                          >
                            <span>Sell</span>
                          </Button>
                          <Button
                            style={{ marginLeft: "10px" }}
                            variant="light"
                            onClick={() => {
                              setShowAuction(!showAuction);
                            }}
                          >
                            <span>Auction</span>
                          </Button>
                        </>
                      ) : (
                        <h4>Contact my address if you want it</h4>
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
    </>
  );
}

export default ProductDetail;
