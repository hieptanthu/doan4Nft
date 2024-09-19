import ProductImg from "./ProductImg";
import ProductDetail from "./ProductDetail";
import ListProduct from "./ListProduct";

const product = {
  ProductImg: (LinkImg, size) => {
    return <ProductImg LinkImg={LinkImg} size={size}></ProductImg>;
  },
  ProductDetailL: <ProductDetail />,
  ListProduct: () => {
    return <ListProduct />;
  },
};

export default product;
