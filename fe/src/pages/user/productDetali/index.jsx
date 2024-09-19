import { useParams } from "react-router-dom";
function ProductDetail() {
  const { id, oke } = useParams();
  return <>ProductDetail {id + oke}</>;
}

export default ProductDetail;
