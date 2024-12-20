import React, { useEffect, useState, useContext } from "react";
import { useContract } from "@/context/NFTMarketplaceContext";
import lbr from "@/library";
function History({ tokenId }) {
  const { contractMyNFT } = useContext(useContract);
  const [history, setHistory] = useState([]);
  useEffect(() => {
    CallHistory(tokenId);
  }, [tokenId]);
  const CallHistory = async (tokenId) => {
    try {
      setHistory(await contractMyNFT.getTransferHistory(tokenId));
    } catch (error) {
      console.log("CallHistory false", error);
    }
  };
  return (
    <>
      <h3>Transfer History</h3>
      {history.length > 0 ? (
        <table className="table">
          <thead>
            <tr>
              <th>From</th>
              <th>To</th>
            </tr>
          </thead>
          <tbody>
            {history
              .slice()
              .reverse()
              .map(
                (
                  item,
                  index // Dùng slice() để tạo bản sao của mảng rồi đảo ngược
                ) => (
                  <tr key={index}>
                    <td>{lbr.checkAddress.checkTypeAddress(item.from)}</td>
                    <td>{lbr.checkAddress.checkTypeAddress(item.to)}</td>
                  </tr>
                )
              )}
          </tbody>
        </table>
      ) : (
        <p>No transfer history found.</p>
      )}
    </>
  );
}

export default History;
