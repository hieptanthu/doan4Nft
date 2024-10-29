// App.js
import React from "react";
import { ListGroup, Placeholder } from "react-bootstrap";
import { useState, useEffect } from "react";
function LoadList({ text }) {
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowText(true);
    }, 30000); // 20 seconds delay

    return () => clearTimeout(timer); // Cleanup on unmount
  }, []);
  return (
    <>
      {showText ? (
        <ListGroup style={{ marginTop: "25px" }}>
          <ListGroup.Item>
            <Placeholder as="span" animation="glow">
              <Placeholder xs={6} />
            </Placeholder>
          </ListGroup.Item>
          <ListGroup.Item>
            <Placeholder as="span" animation="glow">
              <Placeholder xs={8} />
            </Placeholder>
          </ListGroup.Item>
          <ListGroup.Item>
            <Placeholder as="span" animation="glow">
              <Placeholder xs={4} />
            </Placeholder>
          </ListGroup.Item>
          <ListGroup.Item>
            <Placeholder as="span" animation="wave">
              <Placeholder xs={5} />
            </Placeholder>
          </ListGroup.Item>
          <ListGroup.Item>
            <Placeholder as="span" animation="wave">
              <Placeholder xs={7} />
            </Placeholder>
          </ListGroup.Item>
        </ListGroup>
      ) : (
        <div style={{ textAlign: "center" }}>
          <h1> {text}</h1>
        </div>
      )}
    </>
  );
}

export default LoadList;
