import React, { useContext, useEffect, useState } from "react";
import { useContract } from "@/context/NFTMarketplaceContext";
import { Button } from "react-bootstrap"; // Make sure you import from 'react-bootstrap'
import UserApi from "@/api/userAPi";

function Layout({ children }) {
  const { account, accountHandler } = useContext(useContract);

  // ["none", "notAcc", "haveAcc"]
  const [checkAcc, setCheckAcc] = useState("");

  const [showCreateAcc, setShowCreateAcc] = useState(false);

  useEffect(() => {
    const callUser = async () => {
      const data = await UserApi.getById(account);
      if (data) {
        setCheckAcc("notAcc");
      } else {
        setShowCreateAcc();
      }
    };
  }, [account]);

  if (!account) {
    return (
      <div>
        <h1>{showCreateAcc}</h1>
        <h1>Connect Wallet</h1>
        <Button
          onClick={() => {
            accountHandler.checkIfWalletConnected();
          }}
        >
          Connect
        </Button>
      </div>
    );
  }

  return <div>{children}</div>;
}

export default Layout;
