import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import lbr from "@/library";
function ModalAuction({ show, dataOut, handleClose }) {
  const [inputData, setInputData] = useState({
    startPice: 0,
    startTime: "",
    endTime: "",
  });

  const handleSubmit = async () => {
    // Kiểm tra không bỏ trống trường nào
    console.log(inputData);
    if (!inputData.startPice || !inputData.startTime || !inputData.endTime) {
      alert("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    // Tính toán Unix timestamp cho thời gian bắt đầu và kết thúc
    const startTimestamp = lbr.time.setTimeToBlockTime(inputData.startTime);
    const endTimestamp = lbr.time.setTimeToBlockTime(inputData.endTime);
    // Kiểm tra thời gian kết thúc lớn hơn thời gian bắt đầu
    if (endTimestamp <= startTimestamp) {
      alert("Thời gian kết thúc phải lớn hơn thời gian bắt đầu.");
      return;
    }

    // Gửi dữ liệu ra ngoài
    const outputData = {
      ...inputData,
      startTime: startTimestamp,
      endTime: endTimestamp,
    };
    console.log(outputData);
    dataOut(outputData);
    await dataOut(inputData); // Gửi dữ liệu ra component cha thông qua callback
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData({
      ...inputData,
      [name]: value,
    });
  };

  return (
    <Modal style={{ marginTop: "10em" }} show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form style={{ color: "#333" }}>
          <Form.Group controlId="formStartPrice">
            <Form.Label>Start Price</Form.Label>
            <Form.Control
              type="number"
              name="startPice"
              value={inputData.startPice}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formStartTime">
            <Form.Label>Start Time</Form.Label>
            <Form.Control
              type="datetime-local"
              name="startTime"
              value={inputData.startTime}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formEndTime">
            <Form.Label>End Time</Form.Label>
            <Form.Control
              type="datetime-local"
              name="endTime"
              value={inputData.endTime}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Send
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalAuction;
