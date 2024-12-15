import React, { useContext, useEffect, useState } from "react";
import { useContract } from "@/context/NFTMarketplaceContext";
import { Button } from "react-bootstrap"; // Make sure you import from 'react-bootstrap'


function Layout({ children }) {
  const { account, accountHandler } = useContext(useContract);

  if (!account) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <h1>Welcome to Website Marketplace NFT BY Nguyen Duc Hiep</h1>

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
