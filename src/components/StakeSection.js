import { useState, useContext } from "react";
import BlockchainContext from "../store/BlockchainContext";
import { walletAddressSlicer, numberWithCommas } from "../utils/util";
import whiteSpinner from "../assets/img/spin.svg";
import Countdown from "react-countdown";
import { toast } from "react-toastify";

const StakeSection = () => {
  const [amount, setAmount] = useState();
  const {
    account,
    walletBalance,
    myMiner,
    myreward,
    userCheckPoint,
    hatchpending,
    Sellpending,
    pending,
    approveBusd,
    busdStakeText,
    buyBird,
    hatchBird,
    sellBird,
  } = useContext(BlockchainContext);

  const rendererCountdown = ({ days, hours, minutes, seconds, completed }) => {
    // completed ? <Completionist /> : <span>{days}d {hours}h {minutes}m {seconds}</span>;
    if (completed) {
      return "";
    } else {
      return (
        <p className="count-text">
          {String(hours).padStart(2, "0")} : {String(minutes).padStart(2, "0")}{" "}
          : {String(seconds).padStart(2, "0")}
        </p>
      );
    }
  };

  const handleBuyBird = () => {
    if (new Date().getTime() > 1652554800000) {
      if (busdStakeText === "Enable") {
        approveBusd(account);
      } else {
        if (Number(amount) > 0) {
          buyBird(amount);
        } else {
          toast.error("Enter valid amount", {
            position: "bottom-right",
          });
        }
      }
    } else {
      toast.warn("Launch date is Saturday 14th May 2022 at 7pm UTC", {
        position: "bottom-right",
      });
    }
  };

  return (
    <main
      id="dashboard"
      className="pt-32 mx-auto max-w-7xl px-4 sm:pt-40 sm:px-6 lg:pt-48 pb-8"
      style={{ opacity: "1" }}
    >
      <div className="grid grid-cols-2 gap-2 md:grid-cols-1 xl:gap-5 sm:gap-3 mb-8 max-w-7xl mx-auto">
        <div className="col-start-1 col-span-2">
          <div className="rounded-md w-full h-full transition-all ease-in-out duration-200 shadow-xl relative overflow-hidden bg-white rounded-lg">
            <div className="box-padding">
              <div className="flex-card first" index="0">
                <p className="box-title">Contract</p>
                <h5 className="box-amount contract-text">
                  <a
                    className="text-xs "
                    href={process.env.REACT_APP_BNB_FACTOR_CONRACT}
                    target="_blank"
                  >
                    {process.env.REACT_APP_CONTRACT}
                  </a>
                </h5>
              </div>
              <div className="flex-card" index="1">
                <p className="box-title">Wallet</p>
                <h5 className="box-amount">
                  {numberWithCommas(walletBalance, 2)}
                </h5>
              </div>
              <div className="flex-card" index="2">
                <p className="box-title">Your Birds</p>
                <h5 className="box-amount">{myMiner}</h5>
              </div>
              <div className="stake-bottom">
                <div className="stake-bottom-item">
                  <div className="">
                    <div className="relative">
                      <input
                        className="input-plan focus:ring-red-500 focus:border-red-500"
                        type="text"
                        value={amount}
                        step={0.00001}
                        onChange={(event) => {
                          if (
                            event.target.value >= 0 ||
                            event.target.value === ""
                          ) {
                            setAmount(event.target.value);
                          }
                        }}
                      />
                      <p className="input-current">BUSD</p>
                    </div>
                  </div>
                  <div className="">
                    <button
                      className="button-secondary hover:bg-rose-700"
                      onClick={() => handleBuyBird()}
                    >
                      {pending ? (
                        <>
                          <img src={whiteSpinner} className="spinner" />
                        </>
                      ) : (
                        <>{busdStakeText}</>
                      )}
                    </button>
                  </div>
                </div>
                <div className="stake-bottom-item">
                  <div className="flex-card reward">
                    <p className="text-secondary">Your Rewards</p>
                    <h5 className="text-secondary-bold">
                      {numberWithCommas(myreward, 2)} BUSD
                    </h5>
                  </div>
                  <div className="box-border flex flex-row">
                    <div className="box-button">
                      <button
                        className="button-100"
                        onClick={() => hatchBird()}
                      >
                        {hatchpending ? (
                          <>
                            <img src={whiteSpinner} className="spinner" />
                          </>
                        ) : (
                          <>Hatch eggs</>
                        )}
                      </button>
                    </div>
                    <div className="box-button">
                      <button
                        className={`button-100 ${
                          Number(userCheckPoint) > +new Date() ? "disable" : ""
                        }`}
                        disabled={userCheckPoint > +new Date() ? true : ""}
                        onClick={() => sellBird()}
                      >
                        {userCheckPoint > +new Date() ? (
                          <Countdown
                            date={userCheckPoint}
                            renderer={rendererCountdown}
                          />
                        ) : Sellpending ? (
                          <>
                            <img src={whiteSpinner} className="spinner" />
                          </>
                        ) : (
                          <>Eat eggs</>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default StakeSection;
