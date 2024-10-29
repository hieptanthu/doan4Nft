// Múi giờ Hà Nội (UTC+7)
const hanoiOffset = new Date().getTimezoneOffset() * 60;

const timeChange = {
  setTimeToBlockTime: (time) => {
    const startTimestamp = Math.floor(
      (new Date(time).getTime() - hanoiOffset) / 1000 // Trừ đi hanoiOffset
    );

    return startTimestamp;
  },

  setBlockTimeToTime: (time) => {
    const timestamp = Number(time);
    // Convert timestamp to milliseconds and adjust for Hanoi timezone
    const dateInHanoi = new Date(timestamp * 1000 + hanoiOffset);

    // Extract components

    // Format the date string
    return dateInHanoi.toLocaleString("vi-VN", {
      timeZone: "Asia/Ho_Chi_Minh",
    });
  },

  getCurrentTimestampAsUint256: () => {
    // Lấy thời gian hiện tại (timestamp) theo giây
    const currentTimestamp = Math.floor(Date.now() / 1000);

    // Chuyển đổi thành BigInt
    const uint256Timestamp = BigInt(currentTimestamp);

    return uint256Timestamp;
  },
};

export default timeChange;
