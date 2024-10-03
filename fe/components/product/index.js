import ProductImg from "./ProductImg";
import ProductDetail from "./ProductDetail";
import ListProduct from "./ListProduct";

const product = {
  ProductImg: (LinkImg, size) => {
    return <ProductImg LinkImg={LinkImg} size={size}></ProductImg>;
  },
  ProductDetailL: (_state) => {
    return <ProductDetail state={_state} />;
  },
  ListProduct: () => {
    return <ListProduct />;
  },
};

export default product;
