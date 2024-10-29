import React, { useState, useEffect } from "react";

const CountdownTimer = ({ countdownTime }) => {
  const [timeLeft, setTimeLeft] = useState(countdownTime);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(timer);
          return 0; // Đảm bảo thời gian không âm
        }
        return prevTime - 1; // Giảm thời gian còn lại
      });
    }, 1000); // Cập nhật mỗi giây

    return () => clearInterval(timer); // Dọn dẹp khi component bị unmount
  }, []);

  // Hàm để chuyển đổi thời gian còn lại thành định dạng
  const getTimeLeft = (time) => {
    const days = Math.floor(time / (24 * 60 * 60));
    const hours = Math.floor((time % (24 * 60 * 60)) / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    if (days > 0) {
      return `${days} d ${hours} h ${minutes} m ${seconds} s`;
    } else if (hours > 0) {
      return `${hours} h ${minutes} m ${seconds} s`;
    } else if (minutes > 0) {
      return `${minutes} m ${seconds} s`;
    } else {
      return `${seconds} s`;
    }
  };

  return <div style={{ fontSize: "30px" }}>{getTimeLeft(timeLeft)}</div>;
};

export default CountdownTimer;
