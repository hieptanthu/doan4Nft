import React, { useState, useContext } from "react";
import { useContract } from "../context/NFTMarketplaceContext";
import { Col, Row, Container } from "react-bootstrap";
import { useRouter } from "next/router";
import ProductImg from "@/components/product/common/ProductImg";
import Load from "@/components/Load/Load";

function CreateMyNFT() {
  const { contractMyNFT, account, ipfs } = useContext(useContract);
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [loadingCount, setLoadingCount] = useState(10);
  const [formParams, updateFormParams] = useState({
    title: "",
    Description: "",
  });
  const [fileURL, setFileURL] = useState(
    "https://t4.ftcdn.net/jpg/01/64/16/59/360_F_164165971_ELxPPwdwHYEhg4vZ3F4Ej7OmZVzqq4Ov.jpg"
  );
  const [file, setFile] = useState(null);
  const [message, updateMessage] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const createNFTSmartContract = async (formInput, file) => {
    const { title, Description } = formInput;
    if (!title || !Description || !file || !account) {
      return console.log("Data Is Missing");
    }
    setLoading(true);

    const url = await ipfs.uploadToNFTStorage(file);
    if (url) {
      setLoadingCount(40);
      const dataOut = await contractMyNFT.createNFT(url, title, Description);
      if (dataOut) {
        setLoadingCount(100);
        setLoading(false);
        router.push("/MyNFTs");
      } else {
        alert("UploadNFT false");
      }
    }
  };

  const onChangeFile = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    try {
      setFile(selectedFile);
      const linkImg = URL.createObjectURL(selectedFile);
      setIsButtonDisabled(true);
      updateMessage("Uploading image... Please wait.");
      setFileURL(linkImg);

      // Simulate upload complete (in real case, you'd wait for upload completion)
      setTimeout(() => {
        setIsButtonDisabled(false);
        updateMessage("");
      }, 2000);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createNFTSmartContract(formParams, file);
  };

  return (
    <Container>
      {loading && <Load progress={loadingCount} />}
      <Row>
        <Col>
          <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
            <ProductImg LinkImg={fileURL} size="xl" />
          </div>
        </Col>
        <Col>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: "2.5rem",
            }}
          >
            <form
              onSubmit={handleSubmit}
              style={{
                backgroundColor: "white",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                borderRadius: "0.5rem",
                padding: "2rem",
                marginBottom: "1rem",
              }}
            >
              <h3
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                  color: "#805AD5",
                  marginBottom: "2rem",
                }}
              >
                Upload your NFT to the marketplace
              </h3>
              <div style={{ marginBottom: "1rem" }}>
                <label
                  htmlFor="title"
                  style={{
                    display: "block",
                    color: "#805AD5",
                    fontSize: "0.875rem",
                    fontWeight: "bold",
                    marginBottom: "0.5rem",
                  }}
                >
                  NFT Name
                </label>
                <input
                  id="title"
                  type="text"
                  placeholder="Axie#4563"
                  value={formParams.title}
                  onChange={(e) =>
                    updateFormParams({
                      ...formParams,
                      title: e.target.value,
                    })
                  }
                  style={{
                    boxShadow: "0 0 0 1px rgba(0, 0, 0, 0.1)",
                    border: "1px solid #e2e8f0",
                    borderRadius: "0.25rem",
                    width: "100%",
                    padding: "0.5rem 0.75rem",
                  }}
                />
              </div>
              <div style={{ marginBottom: "1.5rem" }}>
                <label
                  htmlFor="description"
                  style={{
                    display: "block",
                    color: "#805AD5",
                    fontSize: "0.875rem",
                    fontWeight: "bold",
                    marginBottom: "0.5rem",
                  }}
                >
                  NFT Description
                </label>
                <textarea
                  id="description"
                  cols="40"
                  rows="5"
                  placeholder="Axie Infinity Collection"
                  value={formParams.Description}
                  onChange={(e) =>
                    updateFormParams({
                      ...formParams,
                      Description: e.target.value,
                    })
                  }
                  style={{
                    boxShadow: "0 0 0 1px rgba(0, 0, 0, 0.1)",
                    border: "1px solid #e2e8f0",
                    borderRadius: "0.25rem",
                    width: "100%",
                    padding: "0.5rem 0.75rem",
                    resize: "none",
                  }}
                ></textarea>
              </div>

              <div>
                <label
                  htmlFor="image"
                  style={{
                    display: "block",
                    color: "#805AD5",
                    fontSize: "0.875rem",
                    fontWeight: "bold",
                    marginBottom: "0.5rem",
                  }}
                >
                  Upload Image (&lt;500 KB)
                </label>
                <input type="file" onChange={onChangeFile} />
              </div>
              <br />
              <div style={{ textAlign: "center", color: "#f56565" }}>
                {message}
              </div>
              <button
                type="submit"
                disabled={isButtonDisabled}
                style={{
                  fontWeight: "bold",
                  marginTop: "2.5rem",
                  width: "100%",
                  backgroundColor: isButtonDisabled ? "grey" : "#805AD5",
                  color: "white",
                  borderRadius: "0.25rem",
                  padding: "0.5rem",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  opacity: isButtonDisabled ? 0.5 : 1,
                }}
                id="list-button"
              >
                Create NFT
              </button>
            </form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default CreateMyNFT;
