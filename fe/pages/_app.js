import "../styles/globals.css";
import RootLayout from "../layout/RootLayout";
import { ContractProvider } from "../context/NFTMarketplaceContext.js";

const MyApp = ({ Component, pageProps }) => (
  <ContractProvider>
    <RootLayout>
      <Component {...pageProps} />
    </RootLayout>
  </ContractProvider>
);

export default MyApp;
