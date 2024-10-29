// pages/_app.js

import "@styles/globals.css"; // Nhập các file CSS toàn cục
import { ContractProvider } from "@/context/NFTMarketplaceContext";
import { Header } from "@/components/sections/Header";
import Layout from "./_layout";
export default function MyApp({ Component, pageProps }) {
  return (
    <ContractProvider>
      <Layout>
        <Header />
        <Component {...pageProps} />
      </Layout>
    </ContractProvider>
  );
}
