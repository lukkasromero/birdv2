import { useRef, useEffect, useState, useContext } from "react";
import { ReactComponent as CloseBtn } from "../assets/img/close.svg";
import BlockchainContext from "../store/BlockchainContext";

const NetworkModal = ({ handleClose }) => {
  const modalRef = useRef(null);
  const ModalContainerRef = useRef(null);
  const { changeNetworkOpen, handleChangeNetwork } = useContext(BlockchainContext);
  const handleClickOutside = (event) => {
    if (ModalContainerRef.current && !modalRef.current.contains(event.target)) {
        changeNetworkOpen();
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  return (
    <>
      <div className="modalContainer" ref={ModalContainerRef}>
        <div className="network-modal" ref={modalRef}>
          <div className="modal_header d-flex justify-content-center mb-4">
            <h1 className="modal-header-title">Wrong Network</h1>
            <div className="close-modal" onClick={() => changeNetworkOpen()}>
              <CloseBtn />
            </div>
          </div>
          <main className="modal_content promotion-content bonus container d-flex flex-column align-items-center gap-3">
            <p className="network-text">
              <span>You need connect to Binance smartchain Network first!</span>{" "}
              <br />
              Click on 'Add / Change Network' button for add or change network!
            </p>
            <button
              onClick={()=> handleChangeNetwork()}
              className="network-btn bg-slate-900 cursor-pointer hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 text-white font-semibold h-12 px-12 rounded-lg w-full flex items-center justify-center sm:w-auto"
            >
              Add or Change Network
            </button>
          </main>
        </div>
      </div>
    </>
  );
};

export default NetworkModal;
