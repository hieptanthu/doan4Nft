import React, { useState, useContext, useEffect } from "react";
import { useContract } from "../context/NFTMarketplaceContext";
import cart from "@/components/product/cart";
import LoadFromCard from "@/components/Load/LoadFromCard";

const MyNFTs = () => {
  const { contractMyNFT, account } = useContext(useContract);
  const [NFTs, setNFTs] = useState(null);
  const [callType, setCallType] = useState("MyNFTs");
  const [content, setContent] = useState(null); // State to store rendered content

  useEffect(() => {
    async function fetchData() {
      let data = null;
      switch (callType) {
        case "MyNFTs":
          data = await contractMyNFT.CallMyNFTsOfOwner(account);
          break;
        case "SellNFTs":
          data = await contractMyNFT.CallSellNFTsOfOwner(account);
          break;
        case "AuctionNFTs":
          data = await contractMyNFT.CallAuctionNFTsOwner(account);
          break;
        default:
          console.error("Invalid call type");
      }

      if (data) {
        setNFTs(data);
      }
    }

    if (account) {
      fetchData();
    }
  }, [callType, account, contractMyNFT]);

  useEffect(() => {
    const renderContent = () => {
      switch (callType) {
        case "MyNFTs":
          return (
            <>
              {NFTs && NFTs.length > 0 ? (
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                  {NFTs.map((item, index) => (
                    <cart.MyNFT key={index} state={item} />
                  ))}
                </div>
              ) : (
                <LoadFromCard text="You Not NFTs" />
              )}
            </>
          );

        case "SellNFTs":
          return (
            <>
              {NFTs && NFTs.length > 0 ? (
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                  {NFTs.map((item, index) => (
                    <cart.Sell key={index} state={item} />
                  ))}
                </div>
              ) : (
                <LoadFromCard text="You Not NFTs Sell" />
              )}
            </>
          );

        case "AuctionNFTs":
          return (
            <>
              {NFTs && NFTs.length > 0 ? (
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                  {NFTs.map((item, index) => (
                    <cart.Auction key={index} state={item} />
                  ))}
                </div>
              ) : (
                <LoadFromCard text="You Not NFTs Auction" />
              )}
            </>
          );

        default:
          return <div>Invalid call type</div>;
      }
    };

    setContent(renderContent());
  }, [callType, NFTs]);

  return (
    <div style={{ marginTop: "20px" }}>
      {" "}
      <div>
        <ul id="toggle-list">
          <li
            className={
              callType == "MyNFTs" ? " toggle-item active" : "toggle-item"
            }
            onClick={() => {
              setCallType("MyNFTs");
            }}
          >
            My NFTs
          </li>
          <li
            className={
              callType == "SellNFTs" ? " toggle-item active" : "toggle-item"
            }
            onClick={() => {
              setCallType("SellNFTs");
            }}
          >
            My Sell NFTs{" "}
          </li>
          <li
            className={
              callType == "AuctionNFTs" ? " toggle-item active" : "toggle-item"
            }
            onClick={() => {
              setCallType("AuctionNFTs");
            }}
          >
            My Auction NFTs{" "}
          </li>
        </ul>
      </div>
      {content}
    </div>
  );
};

export default MyNFTs;
