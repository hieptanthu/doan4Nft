
const checkAddress =
{
    checkTypeAddress : (address) => {
        switch (address) {
          case process.env.NEXT_PUBLIC_ADDRESS_NFT_AUCTION:
            return "Auction";
          case process.env.NEXT_PUBLIC_ADDRESS_NFT_MARKET:
            return "SEL";
          default:
            return address;
        }
    }

}


export default checkAddress;

