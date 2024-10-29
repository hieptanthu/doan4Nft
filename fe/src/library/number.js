import Web3 from "web3";
const NumberChange = {
  fromWeiToNumber: (number) => {
    const web3 = new Web3(window.ethereum);

    // Giả sử bạn có giá trị trong Wei
    const priceInWei = number.toString(); // Giả sử giá trị đã ở dạng chuỗi

    // Chuyển đổi từ Wei sang Ether
    const priceInEther = web3.utils.fromWei(priceInWei, "ether");

    // Nếu bạn cần giá trị dưới dạng số (số thực)
    const priceAsNumber = parseFloat(priceInEther);

    return priceAsNumber;
  },
  fromNumberToWei: (weiNumber) => {
    const web3 = new Web3(window.ethereum);
    // Giả sử bạn có giá trị trong Wei
    const priceInNumber = weiNumber.toString(); // Giả sử giá trị đã ở dạng chuỗi

    // Chuyển đổi từ Wei sang Ether
    const priceAsWei = web3.utils.toWei(priceInNumber, "ether");

    return priceAsWei;
  },
};

export default NumberChange;
