import React from "react";
import Card from "react-bootstrap/Card";
import Placeholder from "react-bootstrap/Placeholder";
import { useState, useEffect } from "react";
import { LoadImg } from "@/image";

import Image from "next/image";
function LoadFromCard({ text }) {
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowText(true);
    }, 10000); // 20 seconds delay

    return () => clearTimeout(timer); // Cleanup on unmount
  }, []);
  return (
    <>
      {showText ? (
        <div
          style={{
            marginTop: "10px",
            borderTop: "1px solid",
            textAlign: "center",
            paddingTop: "10px",
          }}
        >
          <h3>{text}</h3>
        </div>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          <Card
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
                <Image
                  style={{
                    borderRadius: "7px",
                    objectFit: "cover",
                    width: "256px",
                    height: "256px",
                  }}
                  src={LoadImg}
                  alt="NFT"
                />
              </div>
            </Card.Header>
            <Card.Body>
              <Placeholder as={Card.Title} animation="glow">
                <Placeholder xs={6} />
              </Placeholder>
              <Placeholder as={Card.Text} animation="glow">
                <Placeholder />
              </Placeholder>
            </Card.Body>
          </Card>
          <Card
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
                <Image
                  style={{
                    borderRadius: "7px",
                    objectFit: "cover",
                    width: "256px",
                    height: "256px",
                  }}
                  src={LoadImg}
                  alt="NFT"
                />
              </div>
            </Card.Header>
            <Card.Body>
              <Placeholder as={Card.Title} animation="glow">
                <Placeholder xs={6} />
              </Placeholder>
              <Placeholder as={Card.Text} animation="glow">
                <Placeholder />
              </Placeholder>
            </Card.Body>
          </Card>{" "}
          <Card
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
                <Image
                  style={{
                    borderRadius: "7px",
                    objectFit: "cover",
                    width: "256px",
                    height: "256px",
                  }}
                  alt="NFT"
                  src={LoadImg}
                />
              </div>
            </Card.Header>
            <Card.Body>
              <Placeholder as={Card.Title} animation="glow">
                <Placeholder xs={6} />
              </Placeholder>
              <Placeholder as={Card.Text} animation="glow">
                <Placeholder />
              </Placeholder>
            </Card.Body>
          </Card>{" "}
          <Card
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
                <Image
                  style={{
                    borderRadius: "7px",
                    objectFit: "cover",
                    width: "256px",
                    height: "256px",
                  }}
                  src={LoadImg}
                  alt="NFT"
                />
              </div>
            </Card.Header>
            <Card.Body>
              <Placeholder as={Card.Title} animation="glow">
                <Placeholder xs={6} />
              </Placeholder>
              <Placeholder as={Card.Text} animation="glow">
                <Placeholder />
              </Placeholder>
            </Card.Body>
          </Card>{" "}
          <Card
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
                <Image
                  style={{
                    borderRadius: "7px",
                    objectFit: "cover",
                    width: "256px",
                    height: "256px",
                  }}
                  src={LoadImg}
                  alt="NFT"
                />
              </div>
            </Card.Header>
            <Card.Body>
              <Placeholder as={Card.Title} animation="glow">
                <Placeholder xs={6} />
              </Placeholder>
              <Placeholder as={Card.Text} animation="glow">
                <Placeholder />
              </Placeholder>
            </Card.Body>
          </Card>{" "}
          <Card
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
                <Image
                  style={{
                    borderRadius: "7px",
                    objectFit: "cover",
                    width: "256px",
                    height: "256px",
                  }}
                  src={LoadImg}
                  alt="NFT"
                />
              </div>
            </Card.Header>
            <Card.Body>
              <Placeholder as={Card.Title} animation="glow">
                <Placeholder xs={6} />
              </Placeholder>
              <Placeholder as={Card.Text} animation="glow">
                <Placeholder />
              </Placeholder>
            </Card.Body>
          </Card>{" "}
          <Card
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
                <Image
                  style={{
                    borderRadius: "7px",
                    objectFit: "cover",
                    width: "256px",
                    height: "256px",
                  }}
                  src={LoadImg}
                  alt="NFT"
                />
              </div>
            </Card.Header>
            <Card.Body>
              <Placeholder as={Card.Title} animation="glow">
                <Placeholder xs={6} />
              </Placeholder>
              <Placeholder as={Card.Text} animation="glow">
                <Placeholder />
              </Placeholder>
            </Card.Body>
          </Card>{" "}
          <Card
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
                <Image
                  style={{
                    borderRadius: "7px",
                    objectFit: "cover",
                    width: "256px",
                    height: "256px",
                  }}
                  src={LoadImg}
                  alt="NFT"
                />
              </div>
            </Card.Header>
            <Card.Body>
              <Placeholder as={Card.Title} animation="glow">
                <Placeholder xs={6} />
              </Placeholder>
              <Placeholder as={Card.Text} animation="glow">
                <Placeholder />
              </Placeholder>
            </Card.Body>
          </Card>{" "}
          <Card
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
                <Image
                  style={{
                    borderRadius: "7px",
                    objectFit: "cover",
                    width: "256px",
                    height: "256px",
                  }}
                  src={LoadImg}
                  alt="NFT"
                />
              </div>
            </Card.Header>
            <Card.Body>
              <Placeholder as={Card.Title} animation="glow">
                <Placeholder xs={6} />
              </Placeholder>
              <Placeholder as={Card.Text} animation="glow">
                <Placeholder />
              </Placeholder>
            </Card.Body>
          </Card>{" "}
          <Card
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
                <Image
                  style={{
                    borderRadius: "7px",
                    objectFit: "cover",
                    width: "256px",
                    height: "256px",
                  }}
                  src={LoadImg}
                  alt="NFT"
                />
              </div>
            </Card.Header>
            <Card.Body>
              <Placeholder as={Card.Title} animation="glow">
                <Placeholder xs={6} />
              </Placeholder>
              <Placeholder as={Card.Text} animation="glow">
                <Placeholder />
              </Placeholder>
            </Card.Body>
          </Card>{" "}
          <Card
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
                <Image
                  style={{
                    borderRadius: "7px",
                    objectFit: "cover",
                    width: "256px",
                    height: "256px",
                  }}
                  src={LoadImg}
                  alt="NFT"
                />
              </div>
            </Card.Header>
            <Card.Body>
              <Placeholder as={Card.Title} animation="glow">
                <Placeholder xs={6} />
              </Placeholder>
              <Placeholder as={Card.Text} animation="glow">
                <Placeholder />
              </Placeholder>
            </Card.Body>
          </Card>{" "}
          <Card
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
                <Image
                  style={{
                    borderRadius: "7px",
                    objectFit: "cover",
                    width: "256px",
                    height: "256px",
                  }}
                  src={LoadImg}
                  alt="NFT"
                />
              </div>
            </Card.Header>
            <Card.Body>
              <Placeholder as={Card.Title} animation="glow">
                <Placeholder xs={6} />
              </Placeholder>
              <Placeholder as={Card.Text} animation="glow">
                <Placeholder />
              </Placeholder>
            </Card.Body>
          </Card>{" "}
          <Card
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
                <Image
                  style={{
                    borderRadius: "7px",
                    objectFit: "cover",
                    width: "256px",
                    height: "256px",
                  }}
                  src={LoadImg}
                  alt="NFT"
                />
              </div>
            </Card.Header>
            <Card.Body>
              <Placeholder as={Card.Title} animation="glow">
                <Placeholder xs={6} />
              </Placeholder>
              <Placeholder as={Card.Text} animation="glow">
                <Placeholder />
              </Placeholder>
            </Card.Body>
          </Card>{" "}
          <Card
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
                <Image
                  style={{
                    borderRadius: "7px",
                    objectFit: "cover",
                    width: "256px",
                    height: "256px",
                  }}
                  src={LoadImg}
                  alt="NFT"
                />
              </div>
            </Card.Header>
            <Card.Body>
              <Placeholder as={Card.Title} animation="glow">
                <Placeholder xs={6} />
              </Placeholder>
              <Placeholder as={Card.Text} animation="glow">
                <Placeholder />
              </Placeholder>
            </Card.Body>
          </Card>{" "}
          <Card
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
                <Image
                  style={{
                    borderRadius: "7px",
                    objectFit: "cover",
                    width: "256px",
                    height: "256px",
                  }}
                  src={LoadImg}
                  alt="NFT"
                />
              </div>
            </Card.Header>
            <Card.Body>
              <Placeholder as={Card.Title} animation="glow">
                <Placeholder xs={6} />
              </Placeholder>
              <Placeholder as={Card.Text} animation="glow">
                <Placeholder />
              </Placeholder>
            </Card.Body>
          </Card>{" "}
          <Card
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
                <Image
                  style={{
                    borderRadius: "7px",
                    objectFit: "cover",
                    width: "256px",
                    height: "256px",
                  }}
                  src={LoadImg}
                  alt="NFT"
                />
              </div>
            </Card.Header>
            <Card.Body>
              <Placeholder as={Card.Title} animation="glow">
                <Placeholder xs={6} />
              </Placeholder>
              <Placeholder as={Card.Text} animation="glow">
                <Placeholder />
              </Placeholder>
            </Card.Body>
          </Card>{" "}
          <Card
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
                <Image
                  style={{
                    borderRadius: "7px",
                    objectFit: "cover",
                    width: "256px",
                    height: "256px",
                  }}
                  src={LoadImg}
                  alt="NFT"
                />
              </div>
            </Card.Header>
            <Card.Body>
              <Placeholder as={Card.Title} animation="glow">
                <Placeholder xs={6} />
              </Placeholder>
              <Placeholder as={Card.Text} animation="glow">
                <Placeholder />
              </Placeholder>
            </Card.Body>
          </Card>{" "}
          <Card
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
                <Image
                  style={{
                    borderRadius: "7px",
                    objectFit: "cover",
                    width: "256px",
                    height: "256px",
                  }}
                  src={LoadImg}
                  alt="NFT"
                />
              </div>
            </Card.Header>
            <Card.Body>
              <Placeholder as={Card.Title} animation="glow">
                <Placeholder xs={6} />
              </Placeholder>
              <Placeholder as={Card.Text} animation="glow">
                <Placeholder />
              </Placeholder>
            </Card.Body>
          </Card>{" "}
          <Card
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
                <Image
                  style={{
                    borderRadius: "7px",
                    objectFit: "cover",
                    width: "256px",
                    height: "256px",
                  }}
                  src={LoadImg}
                  alt="NFT"
                />
              </div>
            </Card.Header>
            <Card.Body>
              <Placeholder as={Card.Title} animation="glow">
                <Placeholder xs={6} />
              </Placeholder>
              <Placeholder as={Card.Text} animation="glow">
                <Placeholder />
              </Placeholder>
            </Card.Body>
          </Card>{" "}
          <Card
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
                <Image
                  style={{
                    borderRadius: "7px",
                    objectFit: "cover",
                    width: "256px",
                    height: "256px",
                  }}
                  src={LoadImg}
                  alt="NFT"
                />
              </div>
            </Card.Header>
            <Card.Body>
              <Placeholder as={Card.Title} animation="glow">
                <Placeholder xs={6} />
              </Placeholder>
              <Placeholder as={Card.Text} animation="glow">
                <Placeholder />
              </Placeholder>
            </Card.Body>
          </Card>{" "}
          <Card
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
                <Image
                  style={{
                    borderRadius: "7px",
                    objectFit: "cover",
                    width: "256px",
                    height: "256px",
                  }}
                  src={LoadImg}
                  alt="NFT"
                />
              </div>
            </Card.Header>
            <Card.Body>
              <Placeholder as={Card.Title} animation="glow">
                <Placeholder xs={6} />
              </Placeholder>
              <Placeholder as={Card.Text} animation="glow">
                <Placeholder />
              </Placeholder>
            </Card.Body>
          </Card>{" "}
          <Card
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
                <Image
                  style={{
                    borderRadius: "7px",
                    objectFit: "cover",
                    width: "256px",
                    height: "256px",
                  }}
                  src={LoadImg}
                  alt="NFT"
                />
              </div>
            </Card.Header>
            <Card.Body>
              <Placeholder as={Card.Title} animation="glow">
                <Placeholder xs={6} />
              </Placeholder>
              <Placeholder as={Card.Text} animation="glow">
                <Placeholder />
              </Placeholder>
            </Card.Body>
          </Card>{" "}
          <Card
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
                <Image
                  style={{
                    borderRadius: "7px",
                    objectFit: "cover",
                    width: "256px",
                    height: "256px",
                  }}
                  src={LoadImg}
                  alt="NFT"
                />
              </div>
            </Card.Header>
            <Card.Body>
              <Placeholder as={Card.Title} animation="glow">
                <Placeholder xs={6} />
              </Placeholder>
              <Placeholder as={Card.Text} animation="glow">
                <Placeholder />
              </Placeholder>
            </Card.Body>
          </Card>{" "}
          <Card
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
                <Image
                  style={{
                    borderRadius: "7px",
                    objectFit: "cover",
                    width: "256px",
                    height: "256px",
                  }}
                  src={LoadImg}
                  alt="NFT"
                />
              </div>
            </Card.Header>
            <Card.Body>
              <Placeholder as={Card.Title} animation="glow">
                <Placeholder xs={6} />
              </Placeholder>
              <Placeholder as={Card.Text} animation="glow">
                <Placeholder />
              </Placeholder>
            </Card.Body>
          </Card>
        </div>
      )}
    </>
  );
}

export default LoadFromCard;
