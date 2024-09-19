import { Link } from "react-router-dom";

function ProductImg({ LinkImg, size }) {
  const ListSize = {
    sm: {
      height: "132px",
      with: "132px",
    },
    md: {
      height: "259px",
      with: "259px",
    },
    lg: {
      height: "540px",
      with: "540px",
    },
    xl: {
      height: "540px",
      with: "540px",
    },
    xxl: {
      height: "540px",
      with: "540px",
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
      <div>
        <div>
          <Link to="/d">
            <img style={divStyle} src={LinkImg} alt="" />
          </Link>
        </div>
      </div>
    </>
  );
}

export default ProductImg;
