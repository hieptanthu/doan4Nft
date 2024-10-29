import React, { useState, useEffect } from "react";

const Load = ({ progress }) => {
  const [displayedProgress, setDisplayedProgress] = useState(0);

  // Sử dụng useEffect để từ từ tăng giá trị displayedProgress đến progress
  useEffect(() => {
    if (displayedProgress < progress) {
      const timeout = setTimeout(() => {
        setDisplayedProgress(displayedProgress + 1);
      }, 20); // Tốc độ tăng, có thể điều chỉnh để mượt hơn hoặc nhanh hơn
      return () => clearTimeout(timeout);
    }
  }, [displayedProgress, progress]);

  const overlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.8)", // Màu nền mờ để phủ toàn màn hình
    zIndex: 9999, // Đặt z-index cao để nằm trên tất cả các thẻ khác
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column", // Để có thể hiển thị % trên và thanh tiến trình dưới
  };

  const progressBarContainerStyle = {
    width: "80%",
    backgroundColor: "#e0e0df",
    borderRadius: "8px",
    height: "20px",
    overflow: "hidden",
    marginBottom: "20px",
  };

  const progressBarFillStyle = {
    width: `${displayedProgress}%`, // Điều chỉnh chiều rộng theo giá trị displayedProgress
    backgroundColor: "#76c7c0",
    height: "100%",
    borderRadius: "inherit",
    transition: "width 0.3s ease-in-out", // Tạo hiệu ứng chuyển động
  };

  const percentageStyle = {
    fontSize: "24px", // Kích thước chữ
    fontWeight: "bold",
    color: "#333",
  };

  return (
    <div style={overlayStyle}>
      <span style={percentageStyle}>{displayedProgress}%</span>
      <div style={progressBarContainerStyle}>
        <div style={progressBarFillStyle}></div>
      </div>
    </div>
  );
};

export default Load;
