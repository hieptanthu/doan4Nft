import axios from "axios";

const ipfs = {
  uploadToNFTStorage: async (fileData) => {
    const fromData = new FormData();
    fromData.append("file", fileData);

    const response = await axios({
      method: "post",
      url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
      data: fromData,
      headers: {
        pinata_api_key: `da91802aa3accdffd5ef`,
        pinata_secret_api_key: `9730ed98f26704e345c35ed0e5e290f2ec98583a7b20b4dde8e09a382018e770`,
      },
    });

    const ImgHash = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
    return ImgHash;
  },
};

export default ipfs;
