import "../styles/globals.css"; // Nhập các file CSS toàn cục
import { ContractProvider } from "@/context/NFTMarketplaceContext";
import { Header } from "@/components/sections/Header";
import { DefaultSeo } from "next-seo";
import Layout from "./_layout";
export default function MyApp({ Component, pageProps }) {
  return (
    <ContractProvider>
      <DefaultSeo
        title="NFT Marketplace - Mua Bán NFT Miễn Phí"
        description="Mua và bán các NFT độc quyền trên nền tảng NFT Marketplace hoàn toàn miễn phí."
        openGraph={{
          type: "website",
          locale: "vi_VN",
          url: "https://tanthucode.io.vn/",
          siteName: "NFT Marketplace - Mua Bán NFT Miễn Phí",
        }}
        additionalMetaTags={[
          {
            name: "keywords",
            content:
              "NFT Marketplace, NFT miễn phí, bán NFT, mua NFT, NFT độc quyền, thị trường NFT, thị trường NFT miễn phí, anh Hiệp đep trai nhất thế giới, ndhnpa",
          },
        ]}
      />
      <Layout>
        <Header />
        <Component {...pageProps} />
      </Layout>
    </ContractProvider>
  );
}
