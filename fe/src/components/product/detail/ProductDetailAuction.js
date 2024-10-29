import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import ProductImg from "../common/ProductImg";
import {
  Col,
  Container,
  Row,
  Button,
  ListGroup,
  InputGroup,
  Form,
} from "react-bootstrap";
import lbr from "@/library";
import { useContract } from "@/context/NFTMarketplaceContext";
import { useRouter } from "next/router";
import LoadList from "@/components/Load/LoadList";
import LoadCarouselItemShow from "@/components/Load/LoadCarouselItemShow";
import CountdownTimer from "@/components/Other/CountdownTimer";

function ProductDetailAuction({ NFT, NFTAuction }) {
  const router = useRouter();
  const { contractAuction, account } = useContext(useContract);
  const [history, setHistory] = useState(null);
  console.log(history);
  const [price, setPrice] = useState(0);

  const [chats, setChats] = useState(null);

  useEffect(() => {
    const callHistory = async () => {
      const data = await contractAuction.getBidHistory(NFT);
      if (data) {
        setHistory(data);
      }
    };
    callHistory();
  }, [NFT]);

  const PlaceBid = async () => {
    const PriceIn = Number(price);

    if (!(PriceIn > lbr.number.fromWeiToNumber(NFTAuction.highestBid))) {
      return alert("not value < highest price ");
    }
    if (!(PriceIn > lbr.number.fromWeiToNumber(NFTAuction.highestBid))) {
      return alert("not value < highest price ");
    }
    const data = await contractAuction.PlaceBid(NFTAuction.tokenId, PriceIn);
    if (data) {
      alert("placeBid true");
    } else {
      alert("placeBid false");
    }

    try {
    } catch (error) {
      console.log("error cancel Auction", error);
    }
  };
  const cancelAuction = async () => {
    try {
      const data = await contractAuction.Cancel(NFT.tokenId);
      if (data) {
        alert("cancel Token Auction");
        router.push("/MyNFTs");
      } else {
        alert("error cancel Auction");
      }
    } catch (error) {
      console.log("error cancel Auction", error);
    }
  };

  const endAuction = async () => {
    try {
      const data = await contractAuction.endAuction(NFT.tokenId);
      if (data) {
        alert("End Auction");
        router.push("/MyNFTs");
      } else {
        alert("error cancel Auction");
      }
    } catch (error) {
      console.log("error cancel Auction", error);
    }
  };
  return (
    <>
      {NFT != null ? (
        <>
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
                          {lbr.time.getCurrentTimestampAsUint256() -
                            NFTAuction.endTime >
                          0 ? (
                            <h3>The Auction Has Ended</h3>
                          ) : (
                            <>
                              {Number(
                                NFTAuction.startTime -
                                  lbr.time.getCurrentTimestampAsUint256()
                              ) > 0 ? (
                                <samp
                                  style={{
                                    fontFamily: "inherit",
                                    fontSize: "16px",
                                    lineHeight: "20px",
                                    fontWeight: 500,
                                  }}
                                >
                                  Preparations begin in <br />
                                  <CountdownTimer
                                    countdownTime={Number(
                                      NFTAuction.startTime -
                                        lbr.time.getCurrentTimestampAsUint256()
                                    )}
                                  />
                                </samp>
                              ) : (
                                <samp
                                  style={{
                                    fontFamily: "inherit",
                                    fontSize: "16px",
                                    lineHeight: "20px",
                                    fontWeight: 500,
                                  }}
                                >
                                  there is time left <br />
                                  <CountdownTimer
                                    countdownTime={Number(
                                      NFTAuction.endTime - NFTAuction.startTime
                                    )}
                                  />
                                </samp>
                              )}
                            </>
                          )}
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
                          <p>
                            starting price{" "}
                            {lbr.number.fromWeiToNumber(
                              NFTAuction.startingPrice
                            )}
                          </p>
                        </div>
                        <div>
                          {lbr.time.getCurrentTimestampAsUint256() -
                            NFTAuction.endTime >
                          0 ? (
                            <>
                              {" "}
                              <Button
                                style={{ marginLeft: "10px" }}
                                variant="light"
                                onClick={endAuction}
                              >
                                <span>End Auction </span>
                              </Button>
                            </>
                          ) : (
                            <>
                              {NFT && NFT.owner == account ? (
                                <>
                                  <Button
                                    style={{ marginLeft: "10px" }}
                                    variant="light"
                                    onClick={cancelAuction}
                                  >
                                    <span>Close Sell Auction with </span>
                                  </Button>
                                </>
                              ) : (
                                <>
                                  {Number(
                                    NFTAuction.startTime -
                                      lbr.time.getCurrentTimestampAsUint256()
                                  ) > 0 ? (
                                    <h4>
                                      {"The starting time hasn't come yet"}
                                    </h4>
                                  ) : (
                                    <>
                                      {" "}
                                      {NFTAuction.highestBidder === account ? (
                                        <h3>
                                          You are the highest priced person with{" "}
                                          {lbr.number.fromWeiToNumber(
                                            NFTAuction.highestBid
                                          )}
                                        </h3>
                                      ) : (
                                        <InputGroup className="mb-3">
                                          <Form.Control
                                            placeholder={`value > ${lbr.number.fromWeiToNumber(
                                              NFTAuction.highestBid
                                            )}`}
                                            aria-label={`value > ${lbr.number.fromWeiToNumber(
                                              NFTAuction.highestBid
                                            )}`}
                                            onChange={(e) => {
                                              setPrice(e.target.value);
                                            }}
                                            type="number"
                                            aria-describedby="basic-addon2"
                                          />
                                          <Button
                                            variant="light"
                                            onClick={PlaceBid}
                                          >
                                            <span>Place Bid</span>
                                          </Button>
                                        </InputGroup>
                                      )}
                                    </>
                                  )}
                                </>
                              )}
                            </>
                          )}
                        </div>
                        <div>
                          <span>
                            {" "}
                            From:{" "}
                            {lbr.time.setBlockTimeToTime(
                              NFTAuction.startTime || "11111111"
                            )}{" "}
                            <br></br>
                            To:{" "}
                            {lbr.time.setBlockTimeToTime(
                              NFTAuction.endTime || "11111111"
                            )}
                          </span>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Container>
              </div>
            </div>
          </div>
          <Container>
            <Row>
              <Col>
                <div
                  style={{
                    textAlign: "center",
                  }}
                >
                  <h3 style={{ margin: "0px" }}>Bidding History</h3>
                </div>
                {history && history.length > 0 ? (
                  <>
                    <div style={{ height: "400px" }}>
                      <Row
                        style={{
                          fontWeight: "bold",
                        }}
                      >
                        <Row
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <Col>Address User</Col>
                          <Col>Value </Col>
                          <Col>Time</Col>
                        </Row>
                      </Row>
                      <ListGroup style={{ height: "400px", overflowY: "auto" }}>
                        {history.map((item, index) => (
                          <ListGroup.Item key={index}>
                            <Row
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              <Col>
                                {lbr.string.shortenAddress(item.bidder)}
                              </Col>
                              <Col>
                                {lbr.number.fromWeiToNumber(item.amount)}{" "}
                              </Col>
                              <Col>
                                {" "}
                                {lbr.time.setBlockTimeToTime(item.timestamp)}
                              </Col>
                            </Row>
                          </ListGroup.Item>
                        ))}
                      </ListGroup>
                    </div>
                  </>
                ) : (
                  <LoadList ext="Not Have History" />
                )}
              </Col>
              <Col>
                <div
                  style={{
                    textAlign: "center",
                  }}
                >
                  <h3 style={{ margin: "0px" }}>Chats</h3>

                  {chats && chats.length > 0 ? (
                    <></>
                  ) : (
                    <LoadList text="Not Have Chat" />
                  )}
                </div>
              </Col>
            </Row>
          </Container>
        </>
      ) : (
        <LoadCarouselItemShow text={"Not Find this NFT"} />
      )}
    </>
  );
}

export default ProductDetailAuction;
