import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Col, Container, Row, Button } from "react-bootstrap";
import Image from "react-bootstrap/Image"; // Correct import for Image
import Placeholder from "react-bootstrap/Placeholder";
import { LoadImg, backgroundLoad } from "@/image";
function LoadCarouselItemShow({ text }) {
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowText(true);
    }, 20000); // 20 seconds delay

    return () => clearTimeout(timer); // Cleanup on unmount
  }, []);
  return (
    <>
      {showText ? (
        <div className={"productDetailContainer"} style={{ color: "#333" }}>
          <div className={"productDetailBackground"}>
            <img src={backgroundLoad.blurDataURL} />
          </div>
          <div
            style={{ zIndex: "2" }}
            className={"productDetailBackgroundItem"}
          >
            <div className={"productDetailItem"}>
              <Container>
                <Row style={{ textAlign: "center", alignItems: "center" }}>
                  <Col xs={7}>
                    <Image
                      src={LoadImg.blurDataURL}
                      alt="placeholder"
                      height={504}
                      width={360}
                      style={{
                        borderRadius: "7px",
                        objectFit: "cover",
                      }}
                    />
                  </Col>
                  <Col>
                    <div className={"listText"}>
                      <Placeholder as="h5" animation="glow">
                        <Placeholder xs={6} />
                      </Placeholder>
                      <Placeholder as="p" animation="glow">
                        <Placeholder />
                      </Placeholder>
                      <Placeholder as="p" animation="glow">
                        <Placeholder xs={4} />
                      </Placeholder>
                      <div>
                        <Placeholder
                          as="span"
                          animation="glow"
                          style={{ width: "50px", marginLeft: "10px" }}
                        >
                          {" "}
                          <Placeholder xs={2} />
                        </Placeholder>
                      </div>
                      <div>
                        <span>
                          <Placeholder
                            as="span"
                            animation="glow"
                            style={{ width: "70px" }}
                          />
                        </span>
                        <samp>
                          <Placeholder
                            as="span"
                            animation="glow"
                            style={{ width: "150px" }}
                          />
                        </samp>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Container>
            </div>
          </div>
        </div>
      ) : (
        <div style={{ textAlign: "center" }}>
          <h1> {text}</h1>
        </div>
      )}
    </>
  );
}

export default LoadCarouselItemShow;
