import smartContract from "./smartContract";

const startListeningToEvents = async (setEvents) => {
  try {
    // Kiểm tra nếu setEvents là một hàm
    if (typeof setEvents !== "function") {
      console.error("setEvents is not a function");
      return; // Dừng hàm nếu setEvents không phải là một hàm
    }

    const contract = await smartContract.Sell.connectingWithSmartContract();
    if (contract && contract.events) {
      contract.events
        .allEvents({ fromBlock: "latest" })
        .on("data", (event) => {
          console.log("Event Data:", event);
          setEvents((prevEvents) => ({
            ...prevEvents,
            [event.transactionHash]: event,
          }));
        })
        .on("error", (err) => {
          console.error("Error while listening to events:", err);
        });
    } else {
      console.error("Contract or contract.events is not available");
    }
  } catch (error) {
    console.error("Error while connecting to contract:", error);
  }
};
export const stopListeningToAllEvents = (contract) => {
  try {
    contract.removeAllListeners(); // Hủy lắng nghe tất cả sự kiện
    console.log("Stopped listening to all events.");
  } catch (error) {
    console.error("Error while stopping to listen to events:", error);
  }
};

const listen = {
  nft: {
    listen: (setEvents) => {
      startListeningToEvents(
        smartContract.NFTs.connectingWithSmartContract(),
        setEvents
      );
    },
    stop: () => {
      startListeningToEvents(smartContract.NFTs.connectingWithSmartContract());
    },
  },

  sell: {
    listen: (setEvents) => {
      startListeningToEvents(
        smartContract.Sell.connectingWithSmartContract(),
        setEvents
      );
    },
    stop: () => {
      startListeningToEvents(smartContract.Sell.connectingWithSmartContract());
    },
  },

  auction: {
    listen: (setEvents) => {
      startListeningToAllEvents(
        smartContract.Auction.connectingWithSmartContract(),
        setEvents
      );
    },
    stop: () => {
      stopListeningToAllEvents(
        smartContract.Auction.connectingWithSmartContract()
      );
    },
  },
};

export default listen;
