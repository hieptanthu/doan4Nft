import { Container } from "@mui/material";
import product from "../../../components/product";

var Home = () => {
  return (
    <>
      {/* {product.ProductIm(
        "https://mekoong.com/wp-content/uploads/2022/10/7151752393896643867-5.jpg",
        "md"
      )} */}

      <Container maxWidth="xxl">
        {product.ProductDetailL}
        {product.ListProduct()}
      </Container>
    </>
  );
};

export default Home;
