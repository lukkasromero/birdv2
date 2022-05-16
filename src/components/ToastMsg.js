import { walletAddressSlicer, timeDifference } from "../utils/util";
const ToastMsg = ({ receipt, type }) => {
  return (
    <>
      <p className="rec big">
        <span className="key">Your Receipt</span>
      </p>
      <p className=" rec small">
        <span className="key">TransactionHash: </span>{" "}
        <a href={`https://bscscan.com/tx/${receipt.blockHash}`} target="_blank">
          <b className="value"> {walletAddressSlicer(receipt.blockHash)}</b>
        </a>
      </p>
      <p className="rec small">
        <span className="key">Status:</span>{" "}
        <b className="value">{receipt.status && "Success"}</b>
      </p>
      <p className="rec small msg-last">
        <span className="key">BlockNumber:</span>{" "}
        <b className="value">{receipt.blockNumber}</b>
      </p>
      <a
        className="receipt-btn"
        href={
          process.env.REACT_APP_NETWORK_TYPE === "mainnet"
            ? `https://bscscan.com/tx/${receipt.transactionHash}`
            : `https://testnet.bscscan.com/tx/${receipt.transactionHash}`
        }
        target="_blank"
      >
        Show More
      </a>
    </>
  );
};

export default ToastMsg;
