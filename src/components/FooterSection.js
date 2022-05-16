import { useState, useEffect } from "react";
import axios from "axios";
const FooterSection = () => {
  const [links, setLinks] = useState();

  useEffect(() => {
    fetchLinks();
  }, []);

  const fetchLinks = async () => {
    const response = await axios.get("/config.json");
    setLinks(response.data.urls);
  };

  return (
    <footer>
      <div className="mt-12 border-t border-gray-200 pt-8 pb-12">
        <p className="text-base text-gray-400 text-center">
          © 2022 Bird Staking.
        </p>
        <div className="footer-top d-flex flex-wrap align-items-center justify-content-center gap-5 p-4">
          <a target="_blank" href={links && links.telegram}>
            <img
              src="/assets/img/telegram.png"
              alt="telegram"
              className="footer-bottom-img social"
            />
          </a>
          <a target="_blank" href={links && links.dappradar}>
            <img
              src="/assets/img/dappradar.png"
              alt="dapp radar"
              className="footer-bottom-img radar"
            />
          </a>
          <a
            className="footer-bsc"
            target="_blank"
            href={links && links.contract}
          >
            <img
              src="/assets/img/bscscan.png"
              alt="BSC Scan"
              className="footer-bottom-img bsc"
            />
          </a>
          <a target="_blank" href={links && links.dapp}>
            <img
              src="/assets/img/dapp-logo.png"
              alt="dapp"
              className="footer-bottom-img dapp-img"
            />
          </a>
          <a target="_blank" href={links && links.hazecrypto}>
            <img
              src="/assets/img/haze.png"
              alt="haze crypto"
              className="footer-bottom-img haze"
            />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
