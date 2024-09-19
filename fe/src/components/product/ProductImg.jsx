import { useState } from "react";
import load from "../common/load";

function ProductImg({ LinkImg }) {
  const [loading, setLoading] = useState(true);
  const [img, setImg] = useState("");
  setImg(LinkImg);
  if (img) {
    setLoading(true);
  }
  return (
    <>
      <div>{loading ? <load.LoadLogo /> : <div>img</div>}</div>
    </>
  );
}

export default ProductImg;
