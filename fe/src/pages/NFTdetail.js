import React, { useState, useContext, useEffect } from "react";
import { useContract } from "@/context/NFTMarketplaceContext";
import { useRouter } from "next/router";
import ProductDetail from "@/components/product/detail/ProductDetail";
import ProductDetailSell from "@/components/product/detail/ProductDetailSell";
import ProductDetailAuction from "@/components/product/detail/ProductDetailAuction";
import LoadCarouselItemShow from "@/components/Load/LoadCarouselItemShow";
const NFTdetail = () => {
  const { contractMyNFT, contractSell, contractAuction, account } =
    useContext(useContract);
  const router = useRouter();

  const [NFT, setNFT] = useState(null);
  const [additionalNFT, setAdditionalNFT] = useState("");
  const [type, setType] = useState("MyNFT");

  //get token Id
  const { tokenId } = router.query;

  useEffect(() => {
    const callNFT = async () => {
      try {
        if (tokenId) {
          const data = await contractMyNFT.CallNFTDetails(tokenId);
          if (data) {
            setNFT(data);
          }
        }
      } catch (error) {
        console.log("Call NFT error", error);
      }
    };

    callNFT();
  }, [tokenId, contractMyNFT]);

  useEffect(() => {
    const callSell = async () => {
      try {
        const data = await contractSell.CallDetails(tokenId);
        setAdditionalNFT(data);
        setType("SellNFT");
      } catch (err) {
        console.log("Call NFT error", error);
      }
    };

    const callAuction = async () => {
      if (tokenId) {
        try {
          const data = await contractAuction.CallDetails(tokenId);
          setAdditionalNFT(data);

          setType("AuctionNFT");
        } catch (err) {
          console.log("Call NFT error", error);
        }
      }
    };
    if (NFT) {
      if (NFT.status.toString() == "1") {
        callSell();
      } else if (NFT.status.toString() == "2") {
        callAuction();
      }
    }
  }, [NFT, contractSell, contractAuction, tokenId]);

  return (
    <div>
      {NFT === null ? (
        <LoadCarouselItemShow text="Not Find NFT"></LoadCarouselItemShow>
      ) : (
        <>
          {(() => {
            switch (type) {
              case "MyNFT":
                return (
                  <div>
                    <ProductDetail _product={NFT} />
                  </div>
                );

              case "SellNFT":
                return (
                  <div>
                    <ProductDetailSell NFT={NFT} NFTSell={additionalNFT} />
                  </div>
                );

              case "AuctionNFT":
                return (
                  <div>
                    <ProductDetailAuction
                      NFT={NFT}
                      NFTAuction={additionalNFT}
                    />
                  </div>
                );

              default:
                return <div>Invalid call type</div>;
            }
          })()}
        </>
      )}
    </div>
  );
};

export default NFTdetail;
