import PropTypes from "prop-types";

function ProductImg({ LinkImg, size = "md" }) {
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
      height: "440px",
      width: "440px",
    },
    xxl: {
      height: "540px",
      width: "540px",
    },
  };

  // Ensure a valid size is provided, default to 'md' if not found
  const sizeKey = ListSize[size] ? size : "md";

  const divStyle = {
    height: ListSize[sizeKey].height,
    width: ListSize[sizeKey].width,
    borderRadius: "7px",
    objectFit: "cover",
  };

  return <img style={divStyle} src={LinkImg} alt="Product Image" />;
}

ProductImg.propTypes = {
  LinkImg: PropTypes.string.isRequired, // Ensure that LinkImg is a required string
  size: PropTypes.oneOf(["sm", "md", "lg", "xl", "xxl"]), // Limit size to valid options
};

export default ProductImg;
