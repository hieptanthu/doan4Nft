import React, { useContext, useEffect, useState } from "react";
import cart from "@/components/product/cart";
import LoadFromCard from "@/components/Load/LoadFromCard";
import { useContract } from "@/context/NFTMarketplaceContext";

function NFTsAuction() {
  const { contractMyNFT } = useContext(useContract);
  const [NFTs, setNFTs] = useState(null);

  useEffect(() => {
    const CallNFTs = async () => {
      try {
        const dataOut = await contractMyNFT.CallNFTsAuction();
        setNFTs(dataOut);
      } catch (error) {
        console.log("call error NFTs Auction", error);
      }
    };
    CallNFTs();
  }, []);

  return (
    <div style={{ marginTop: "37px" }}>
      <div style={{ textAlign: "center", borderBottom: "1px solid" }}>
        <h4>NFTs Action</h4>
      </div>

      <div>
        {NFTs && NFTs.length > 0 ? (
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {NFTs.map((item, index) => (
              <cart.Auction key={index} state={item} />
            ))}
          </div>
        ) : (
          <LoadFromCard text="Not Have NFTs Auction" />
        )}
      </div>
    </div>
  );
}

export default NFTsAuction;
