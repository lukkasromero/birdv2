import { ReactComponent as CheckIcon } from "../assets/img/Chield_check_fill.svg";

const FeatureSection = () => {
  return (
    <main
      id="dashboard"
      className="pt-32 mx-auto max-w-7xl px-4  sm:px-6 pb-8"
      style={{ opacity: "1" }}
    >
      <div className="box-holder">
        <div className="feature_box">
          <p className="feature_title">
            <img src="/assets/img/shield.png" className="feature-img" />
            Anti Whale protection
          </p>
          <p className="feature_text">
            We have an anti whale protection system to secure our liquidity
          </p>
        </div>
        <div className="feature_box">
          <p className="feature_title">
            <img src="/assets/img/secure.png" className="feature-img" />
            Safe & Secure
          </p>
          <p className="feature_text">
            BirdStaking is an audited project by HAZECRYPTO
          </p>
        </div>
        <div className="feature_box">
          <p className="feature_title">
            <img src="/assets/img/gift.png" className="feature-img" />
            Rewards for old hodlers
          </p>
          <p className="feature_text">
            If you participated on a previous BirdStaking you receive a 1% bonus
          </p>
        </div>
      </div>
    </main>
  );
};

export default FeatureSection;
