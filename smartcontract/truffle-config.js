module.exports = {
  networks: {
    ganache: {
      host: "127.0.0.1",  // Địa chỉ của Ganache
      port: 7545,         // Cổng Ganache đang lắng nghe
      network_id: "*",    // Khớp với bất kỳ network ID nào (Ganache tạo ID mạng tự động)
    },
  },
  compilers: {
    solc: {
      version: "0.8.13",  // Phiên bản Solidity bạn đang sử dụng
    },
  },
};
