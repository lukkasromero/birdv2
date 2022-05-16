import { useContext, useState } from "react";
import BlockchainContext from "../store/BlockchainContext";
import CopyToClipboard from "react-copy-to-clipboard";
import { toast } from "react-toastify";

const BoxesSection = () => {
  const { account, refCheck } = useContext(BlockchainContext);
  return (
    <main
      id="dashboard"
      className="pt-32 mx-auto max-w-7xl px-4  sm:px-6 pb-8"
      style={{ opacity: "1" }}
    >
      <div className="box-holder">
        <div className="inner-box">
          <div className="col-start-1 col-span-2">
            <div className="rounded-md w-full h-full transition-all ease-in-out duration-200 shadow-xl relative overflow-hidden bg-white rounded-lg">
              <div className="box-padding">
                <h5 className="title-fact">Nutrion Facts</h5>
                <div className="pt-4 fact-holder">
                  <div className="flex-space">
                    <p className="p-primary">Daily Return</p>
                    <p className="p-primary">8%</p>
                  </div>
                  <div className="flex-space">
                    <p className="p-primary">APR</p>
                    <p className="p-primary">2,920%</p>
                  </div>
                  <div className="flex-space">
                    <p className="p-primary">Dev Fee</p>
                    <p className="p-primary">6%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="inner-box ">
          <div className="col-start-1 col-span-2">
            <div className="rounded-md w-full h-full transition-all ease-in-out duration-200 shadow-xl relative overflow-hidden bg-white rounded-lg">
              <div className="box-padding">
                <h5 className="title-fact text-center">Referral Link</h5>
                {account && refCheck ? (
                  <>
                    <input
                      className="input-ref"
                      value={`https://${window.location.host}/?ref=${account}`}
                      readOnly
                    />
                    <CopyToClipboard
                      text={`https://${window.location.host}/?ref=${account}`}
                      onCopy={() => {
                        toast.success("personal link Copied Successfully");
                      }}
                    >
                      <div className="pt-4">
                        <div className="button-100 ">
                          <p className="text-sm ">COPY</p>
                        </div>
                      </div>
                    </CopyToClipboard>
                  </>
                ) : (
                  <>
                    <input
                      className="input-ref"
                      value={`You will get your ref link after investing`}
                      readOnly
                    />
                    <CopyToClipboard
                      text={`https://${window.location.host}`}
                      onCopy={() => {
                        toast.success("personal link Copied Successfully");
                      }}
                    >
                      <div className="pt-4">
                        <div className="button-100 ">
                          <p className="text-sm ">COPY</p>
                        </div>
                      </div>
                    </CopyToClipboard>
                  </>
                )}

                <p className="title-ref">
                  Earn 8% of the BUSD used to bake beans from anyone who uses
                  your referral link
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default BoxesSection;
