import Carousel from "react-bootstrap/Carousel";
import CarouselItemShow from "@/components/Carousel/CarouselItemShow";
import cart from "@/components/product/cart";
import LoadFromCard from "@/components/Load/LoadFromCard";
import LoadCarouselItemShow from "@/components/Load/LoadCarouselItemShow";
import { useContract } from "@/context/NFTMarketplaceContext";
import { useContext, useEffect, useState } from "react";

export default function Home() {
  const { contractMyNFT } = useContext(useContract);
  const [NFTs, setNFTs] = useState(null);

  useEffect(() => {
    const CallNFTs = async () => {
      try {
        const dataOut = await contractMyNFT.CallNFTs();
        setNFTs(dataOut);
      } catch (error) {
        console.log("call error NFTs", error);
      }
    };
    CallNFTs();
  }, []);

  return (
    <div>
      {" "}
      <Carousel>
        {NFTs && NFTs.length > 0 ? (
          NFTs.slice(0, 6).map((item, index) => (
            <Carousel.Item key={index} interval={1000}>
              <CarouselItemShow NFT={item} />
            </Carousel.Item>
          ))
        ) : (
          <Carousel.Item interval={1000}>
            <LoadCarouselItemShow text="Not find Carousel" />
          </Carousel.Item>
        )}
      </Carousel>
      <div style={{ marginTop: "37px" }}>
        <div style={{ textAlign: "center", borderBottom: "1px solid" }}>
          <h4>NFTs</h4>
        </div>

        <div>
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
        </div>
      </div>
    </div>
  );
}
