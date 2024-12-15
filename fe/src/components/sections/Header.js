import React, { useContext, useEffect, useState } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Image from "next/image";
import Link from "next/link";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { useContract } from "@/context/NFTMarketplaceContext";
import lbr from "@/library";
import { useRouter } from "next/router";
import { logo, User1 } from "@/image";
export const Header = () => {
  const [selectedOption, setSelectedOption] = useState("1");
  const [inputValue, setInputValue] = useState("");
  const { accountHandler, account } = useContext(useContract);
  const router = useRouter();
  const handleSearch = () => {
    let url = "";
    if (selectedOption === "1") {
      url = `/NFTdetail?tokenId=${inputValue}`;
    } else if (selectedOption === "2") {
      url = `/Userdetail?userId=${inputValue}`;
    }

    // Chuyển hướng sử dụng next/router
    router.push(url);
  };

  return (
    <Navbar
      expand="lg"
      style={{ height: "70px" }}
      className="navbar-dark bg-dark"
    >
      <Navbar.Brand>
        <Link href={"/"}>
          <Image src={logo} alt="Logo" />
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Item>
            {" "}
            <Link
              style={{ color: "#fff", margin: "0 10px 0 10px" }}
              href={"/NFTsSell"}
            >
              {" "}
              NFT Sell
            </Link>
          </Nav.Item>{" "}
          <Nav.Item>
            {" "}
            <Link
              style={{ color: "#fff", margin: "0 10px 0 10px" }}
              href={"/NFTsAuction"}
            >
              NFT Action{" "}
            </Link>
          </Nav.Item>
          <Nav.Item>
            <InputGroup
              style={{ padding: "14px 30px 0px 19px" }}
              className="mb-3"
            >
              <Form.Control
                aria-label="Example text with button addon"
                aria-describedby="basic-addon1"
                placeholder="token id or address user id"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <Form.Select
                style={{ maxWidth: "130px" }}
                aria-label="Default select example"
                value={selectedOption}
                onChange={(e) => setSelectedOption(e.target.value)}
              >
                <option value="1">Token</option>
                <option value="2">User</option>
              </Form.Select>
              <Button
                variant="outline-secondary"
                id="button-addon1"
                onClick={handleSearch}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-search"
                  viewBox="0 0 16 16"
                >
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                </svg>
              </Button>
            </InputGroup>
          </Nav.Item>
        </Nav>

        <Nav className="ms-auto" style={{ marginRight: "20px" }}>
          {account === "" || account == undefined ? (
            <Button
              onClick={() => {
                accountHandler.checkIfWalletConnected();
              }}
              variant="outline-secondary"
              id="button-addon1"
            >
              Connect Wallet
            </Button>
          ) : (
            <NavDropdown
              title={
                <div style={{ display: "flex", textAlign: "center" }}>
                  <p style={{ margin: "0px 11px 0 0", alignSelf: "center" }}>
                    {lbr.string.shortenAddress(account)}
                  </p>
                  <Image
                    style={{
                      maxWidth: "50px",
                      height: "50px",
                      objectFit: "cover",
                      borderRadius: "50%",
                    }}
                    src={User1}
                    className="avatar"
                    alt="Avatar"
                  />
                </div>
              }
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item as="div">
                <Link href="/createMyNFT">Create NFT</Link>
              </NavDropdown.Item>
              <NavDropdown.Item as="div">
                <Link href="/MyNFTs">MyNFT</Link>
              </NavDropdown.Item>
              <NavDropdown.Item as="div">Profile</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as="div">Log Out</NavDropdown.Item>
            </NavDropdown>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
