import { Link } from "react-router-dom";

function ProductImg({ LinkImg, size }) {
  const ListSize = {
    sm: {
      height: "132px",
      width: "132px",
    },
    md: {
      height: "265px",
      width: "265px",
    },
    lg: {
      height: "540px",
      width: "540px",
    },
    xl: {
      height: "540px",
      width: "540px",
    },
    xxl: {
      height: "540px",
      width: "540px",
    },
  };

  const divStyle = {
    height: ListSize[size].height,
    width: ListSize[size].width,
    borderRadius: "7px",
    objectFit: "cover",
  };

  return (
    <>
      <Link style={divStyle} to="/d">
        <img style={divStyle} src={LinkImg} alt="" />
      </Link>
    </>
  );
}

export default ProductImg;
