import { useContext, useEffect, useState } from "react";
import BlockchainContext from "./store/BlockchainContext";
import axios from "axios";
import Countdown from "react-countdown";
import StakeSection from "./components/StakeSection";
import BoxesSection from "./components/BoxesSection";
import WelcomeSection from "./components/WelcomeSection";
import HeaderSection from "./components/HeaderSection";
import DonateSection from "./components/DonateSection";
import FooterSection from "./components/FooterSection";
import NetworkModal from "./components/NetworkModal";
import FeatureSection from "./components/FeatureSection";
const HomeScreen = () => {
  const { networkOpen } = useContext(BlockchainContext);
  const [links, setLinks] = useState();

  useEffect(() => {
    if (window.location.href.includes("?ref=")) {
      let getAddress = window.location.href.split("?ref=")[1];
      let final = getAddress;
      localStorage.setItem("baseRef", final);
    }
    fetchLinks();
  }, []);

  const fetchLinks = async () => {
    const response = await axios.get("/config.json");
    setLinks(response.data.urls);
  };

  const rendererCountdown = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return "";
    } else {
      return (
        <div className="text-center p-4">
          {" "}
          <p className="text-center font-size19">
            Launch date is Saturday 14th May 2022 at 7pm UTC
          </p>
          <p className="timer text-center font-size40">
            <span className="days">{String(days).padStart(2, "0")}</span> :{" "}
            <span className="hours">{String(hours).padStart(2, "0")}</span>:{" "}
            <span className="minutes">{String(minutes).padStart(2, "0")}</span>{" "}
            : <span className="second">{String(seconds).padStart(2, "0")}</span>
          </p>
        </div>
      );
    }
  };
  return (
    <>
      <div style={{ backgroundColor: "#eeb70b" }}>
        {new Date().getTime() < 1652554800000 && (
          <div className="time-holder">
            <b>
              <Countdown date={1652554800000} renderer={rendererCountdown} />
            </b>
          </div>
        )}
      </div>
      <div className="bg-gray-100">
        <HeaderSection />
        <WelcomeSection />
        <div className="beams-header absolute inset-0 lg:top-[720px] top-[620px] bg-bottom bg-no-repeat bg-slate-50"></div>
        <StakeSection />
        <BoxesSection />
        <FeatureSection />
        <DonateSection />
        <FooterSection />
        {networkOpen && <NetworkModal />}
      </div>
    </>
  );
};

export default HomeScreen;
