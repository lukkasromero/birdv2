import { useState, useContext } from "react";
import BlockchainContext from "../store/BlockchainContext";
import { walletAddressSlicer } from "../utils/util";
const HeaderSection = () => {
  const [open, setOpen] = useState(false);
  const { handleConnectToWallet, account, handleDisconnectWallet } =
    useContext(BlockchainContext);
  return (
    <>
      <div className="absolute z-20 top-0 inset-x-0 flex justify-center overflow-hidden pointer-events-none">
        <div className="w-[108rem] flex-none flex justify-end">
          <picture>
            <img
              src="/assets/img/header1.avif"
              alt=""
              className="w-[71.75rem] flex-none max-w-none"
            />
          </picture>
        </div>
      </div>
      <div className="sticky top-0 z-40 w-full border-b border-gray-200 backdrop-blur flex-none transition-colors duration-500 lg:z-50 lg:border-b lg:border-slate-900/10 bg-white/95 supports-backdrop-blur:bg-white/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center py-6 md:justify-start md:space-x-10">
            <div className="flex justify-start lg:w-0 lg:flex-1">
              <a href="#">
                <span className="sr-only">Workflow</span>
                <img
                  className="h-10 w-auto sm:h-12 rounded-lg bg-slate-800 p-2"
                  src="assets/img/logo.png"
                  alt=""
                />
              </a>
            </div>
            <div className="-mr-2 -my-2 md:hidden">
              <button
                className="bg-white border border-slate-200 rounded-md p-2 inline-flex items-center justify-center text-black"
                id="headlessui-popover-button-1"
                type="button"
                aria-expanded="false"
                onClick={() => setOpen(true)}
              >
                <span className="sr-only">Open menu</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  aria-hidden="true"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </button>
            </div>
            <nav className="hidden md:flex space-x-7">
              <a
                className="text-base font-medium text-gray-800 hover:text-gray-900 cursor-pointer"
                href="#/"
              >
                Home
              </a>
              <a
                target="_blank"
                href="/whitepaper.pdf"
                className="-m-3 p-3 block rounded-md cursor-pointer"
              >
                <p className="text-base font-medium text-gray-900">
                  Whitepaper
                </p>
              </a>
              <a
                className="text-base font-medium text-gray-800 hover:text-gray-900 cursor-pointer"
                href="#dashboard"
              >
                Invest
              </a>
              <a
                href={process.env.REACT_APP_BNB_FACTOR_CONRACT}
                target="_blank"
                className="text-base font-medium text-gray-800 hover:text-gray-900"
              >
                Contract
              </a>
            </nav>
            <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
              {account ? (
                <button
                  onClick={() => handleDisconnectWallet("wallet")}
                  className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-slate-900"
                >
                  {walletAddressSlicer(account)}
                </button>
              ) : (
                <button
                  onClick={() => handleConnectToWallet()}
                  className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-slate-900"
                >
                  Connect to wallet
                </button>
              )}
            </div>
          </div>
        </div>
        {open && (
          <div
            className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
            id="headlessui-popover-panel-2"
          >
            <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
              <div className="pt-5 pb-6 px-5">
                <div className="flex items-center justify-between">
                  <div>
                    <img
                      className="h-8 w-auto rounded-lg bg-slate-800 p-1"
                      src="/assets/img/logo.png"
                      alt="Workflow"
                    />
                  </div>
                  <div className="-mr-2">
                    <button
                      className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-900  hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-yellow-500"
                      type="button"
                      tabindex="0"
                      onClick={() => setOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        aria-hidden="true"
                        className="h-6 w-6"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        ></path>
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="mt-6">
                  <nav className="grid gap-y-8">
                    <a
                      className="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50 cursor-pointer"
                      href="#/"
                    >
                      <span className="ml-3 text-base font-medium text-gray-900">
                        Home
                      </span>
                    </a>
                    <a
                      className="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50 cursor-pointer"
                      href={process.env.REACT_APP_BNB_FACTOR_CONRACT}
                    >
                      <span className="ml-3 text-base font-medium text-gray-900">
                        Invest
                      </span>
                    </a>
                    <a
                      href="/whitepaper.pdf"
                      target="_blank"
                      className="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50 cursor-pointer"
                    >
                      <p className="ml-3 text-base font-medium text-gray-900">
                        Whitepaper
                      </p>
                    </a>
                    <a
                      href={process.env.REACT_APP_BNB_FACTOR_CONRACT}
                      target="_blank"
                      className="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50 cursor-pointer"
                    >
                      <span className="ml-3 text-base font-medium text-gray-900">
                        Contract
                      </span>
                    </a>
                  </nav>
                </div>
              </div>
              <div className="py-6 px-5 space-y-6">
                <div>
                  {account ? (
                    <button
                      onClick={() => handleDisconnectWallet("wallet")}
                      className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium bg-slate-900 text-white"
                    >
                      {walletAddressSlicer(account)}
                    </button>
                  ) : (
                    <button
                      onClick={() => handleConnectToWallet()}
                      className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium bg-slate-900 text-white"
                    >
                      Connect to wallet
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default HeaderSection;
