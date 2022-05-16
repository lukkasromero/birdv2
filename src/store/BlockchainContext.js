import { createContext, useState, useEffect } from "react";
import Web3 from "web3";
import Web3Modal from "web3modal";
import { ABI, BUSDTOKENABI } from "../utils/abi";
import { providers, mobileProviders } from "../utils/Web3Provider";
import { isMobile } from "react-device-detect";
import { toast } from "react-toastify";
import ToastMsg from "../components/ToastMsg";

const BlockchainContext = createContext({
  notification: null,
  showModal: function () {},
  hideModal: function () {},
});

export const BlockchainContextProvider = (props) => {
  const [provider, setProvider] = useState();
  const [web3Instance, setWeb3Instance] = useState();
  const [web3Modal, setWeb3Modal] = useState();
  const [Contract, setContract] = useState();
  const [account, setAccount] = useState();
  const [usdPrice, setUsdPrice] = useState(0);
  const [walletBalance, setWalletBalance] = useState("000.000");
  const [interv, setInterv] = useState();
  const [ischange, setIschange] = useState(true);
  const [pending, setPending] = useState(false);
  const [hatchpending, setHatchPending] = useState(false);
  const [Sellpending, setSellpending] = useState(false);
  const [donatepending, setDonatePending] = useState(false);
  const [userCheckPoint, setUserCheckPoint] = useState();
  const [refCheck, setRefCheck] = useState(false);
  const [networkOpen, setNetworkOpen] = useState(false);
  const [myMiner, setMyMiner] = useState("0");
  const [myreward, setMyReward] = useState("0");
  const [busdStakeText, setBusdStakeText] = useState("Enable");
  const [donateText, setDonateText] = useState("Enable");
  var interva;
  var depositInterva;
  let networkData = [
    {
      chainId: "0x38",
      chainName: "BSCMAINET",
      rpcUrls: ["https://bsc-dataseed1.binance.org"],
      nativeCurrency: {
        name: "BINANCE COIN",
        symbol: "BNB",
        decimals: 18,
      },
      blockExplorerUrls: ["https://bscscan.com/"],
    },
  ];

  // let networkData = [
  //   {
  //     chainId: "0x61",
  //     chainName: "BSC testnet",
  //     rpcUrls: ["https://data-seed-prebsc-2-s3.binance.org:8545/"],
  //     nativeCurrency: {
  //       name: "BINANCE COIN",
  //       symbol: "TBNB",
  //       decimals: 18,
  //     },
  //     blockExplorerUrls: ["https://testnet.bscscan.com/"],
  //   },
  // ];

  useEffect(() => {
    if (
      localStorage.getItem("account") &&
      localStorage.getItem("account") !== "undefined"
    ) {
      connectToWallet("wallet");
    } else {
      connectToWallet("noWallet");
    }
    // toast.success(<NewDepositToast />, {
    //   position: "bottom-left",
    // });
  }, []);

  useEffect(() => {
    if (
      provider &&
      account &&
      web3Instance.currentProvider.isMetaMask === true &&
      ischange
    ) {
      setIschange(false);
      provider.on("accountsChanged", (accounts) => {
        changeUserCheckPoint();
        setAccount(accounts[0]);
        fetchDataFromContract(Contract, web3Instance, accounts[0]);
      });
    }
    if (
      provider &&
      account &&
      web3Instance.currentProvider.isMetaMask === true &&
      ischange
    ) {
      setIschange(false);
      provider.on("networkChanged", (networkId) => {
        if (Number(networkId) != Number(process.env.REACT_APP_CHAIN_ID)) {
          setNetworkOpen(true);
        } else {
          if (!networkOpen) {
            connectToWallet();
          } else {
            setNetworkOpen(false);
          }
        }
      });
    }
  });
  const getRealTimeData = async (contract, web3, account) => {
    interva = setInterval(async () => {
      let accountsInstance = await web3.eth.getAccounts();
      let account = accountsInstance[0];
      // get global info

      if (account) {
      } else {
        setWalletBalance("000.000");
      }
    }, 5000);
    setInterv(interva);
  };

  const connectToWallet = async (type) => {
    if (type === "noWallet") {
      const web3 = new Web3(process.env.REACT_APP_RPF_NODE);
      const contractInstance = new web3.eth.Contract(
        ABI,
        process.env.REACT_APP_CONTRACT
      );
      setContract(contractInstance);
      setWeb3Instance(web3);
      setProvider(provider);
      fetchDataFromContract(contractInstance, web3, null);
    } else {
      const web3Modal = new Web3Modal({
        cacheProvider: true,
        providerOptions: isMobile ? mobileProviders : providers,
        theme: "dark",
      });
      let provider;
      await web3Modal
        .connect(web3Modal)
        .then((res) => {
          provider = res;
        })
        .catch((err) => {
          provider = process.env.REACT_APP_RPF_NODE;
        });
      const web3 = new Web3(provider);
      const account = await web3.eth.getAccounts();
      const chainId = await web3.eth.net.getId();
      if (Number(chainId) != Number(process.env.REACT_APP_CHAIN_ID)) {
        setNetworkOpen(true);
      } else {
        if (account.length > 0 && networkOpen) {
          toast.success("Account connected", {
            position: "bottom-right",
          });
        }
      }
      const contractInstance = new web3.eth.Contract(
        ABI,
        process.env.REACT_APP_CONTRACT
      );
      setContract(contractInstance);
      account.length > 0 && setAccount(account[0]);
      setWeb3Instance(web3);
      setProvider(provider);
      setWeb3Modal(web3Modal);
      fetchDataFromContract(contractInstance, web3, account[0]);
      localStorage.setItem("account", account[0]);
    }
  };

  const fetchDataFromContract = async (contract, web3, account) => {
    //get global info
    if (contract && account) {
      const busdContract = new web3.eth.Contract(
        BUSDTOKENABI,
        process.env.REACT_APP_BUSD_CONRACT
      );
      await busdContract.methods.balanceOf(account).call((error, result) => {
        if (!error) {
          setWalletBalance(web3.utils.fromWei(result));
        }
      });
      await contract.methods.users(account).call((error, result) => {
        if (!error) {
          if (Number(result.checkpoint) > 0) {
            setUserCheckPoint(Number(result.checkpoint) * 1000 + 86400 * 1000);
            setRefCheck(true)
          } else {
            setUserCheckPoint(0)
            setRefCheck(false)
          }
        }
      });
      await contract.methods.getMyMiners(account).call((error, result) => {
        if (!error) {
          setMyMiner(result);
        }
      });
      await contract.methods.getMyEggs(account).call(async (error, egg) => {
        if (!error) {
          if (egg > 0) {
            await contract.methods
              .calculateEggSell(egg)
              .call((error, result) => {
                if (!error) {
                  setMyReward(web3.utils.fromWei(result));
                }
              });
          } else {
            setMyReward(0);
          }
        }
      });
      //get user info
      checkEnable(web3, account);
    }
    if (!Contract) {
      getRealTimeData(contract, web3, account);
    }
  };

  const buyBird = async (amount) => {
    const checkChain = await checkChainId();
    if (!checkChain) {
      return toast.error("Wrong network", {
        position: "bottom-right",
      });
    }
    if (account) {
      let refAccount;
      if (localStorage.getItem("baseRef")) {
        refAccount = localStorage.getItem("baseRef");
      } else {
        refAccount = account;
      }
      const contractInstance = new web3Instance.eth.Contract(
        ABI,
        process.env.REACT_APP_CONTRACT
      );
      await contractInstance.methods
        .buyEggs(refAccount, web3Instance.utils.toWei(amount.toString()))
        .send(
          {
            from: account,
          },
          (error, result) => {
            if (!error) {
              setPending(true);
            }
          }
        )
        .on("receipt", function (receipt) {
          setPending(false);
          fetchDataFromContract(Contract, web3Instance, account);
          toast.success(<ToastMsg receipt={receipt} type="token" />, {
            position: "bottom-right",
          });
        })
        .catch((err) => {
          toast.error("Transaction Rejected", {
            position: "bottom-right",
          });
          setPending(false);
        });
    } else {
      toast.error("Connect to your wallet", {
        position: "bottom-right",
      });
    }
  };
  const hatchBird = async () => {
    if (new Date().getTime() < 1652554800000) {
      return toast.warn("Launch date is Saturday 14th May 2022 at 7pm UTC", {
        position: "bottom-right",
      });
    }
    const checkChain = await checkChainId();
    if (!checkChain) {
      return toast.error("Wrong network", {
        position: "bottom-right",
      });
    }
    if (account) {
      let refAccount;
      if (localStorage.getItem("baseRef")) {
        refAccount = localStorage.getItem("baseRef");
      } else {
        refAccount = account;
      }
      const contractInstance = new web3Instance.eth.Contract(
        ABI,
        process.env.REACT_APP_CONTRACT
      );
      await contractInstance.methods
        .hatchEggs(refAccount)
        .send(
          {
            from: account,
          },
          (error, result) => {
            if (!error) {
              setHatchPending(true);
            }
          }
        )
        .on("receipt", function (receipt) {
          setHatchPending(false);
          fetchDataFromContract(Contract, web3Instance, account);
          toast.success(<ToastMsg receipt={receipt} />, {
            position: "bottom-right",
          });
        })
        .catch((err) => {
          toast.error("Transaction Rejected", {
            position: "bottom-right",
          });
          setHatchPending(false);
        });
    } else {
      toast.error("Connect to your wallet", {
        position: "bottom-right",
      });
    }
  };
  const sellBird = async (type) => {
    if (new Date().getTime() < 1652554800000) {
      return toast.warn("Launch date is Saturday 14th May 2022 at 7pm UTC", {
        position: "bottom-right",
      });
    }
    const checkChain = await checkChainId();
    if (!checkChain) {
      return toast.error("Wrong network", {
        position: "bottom-right",
      });
    }
    if (account) {
      const contractInstance = new web3Instance.eth.Contract(
        ABI,
        process.env.REACT_APP_CONTRACT
      );
      await contractInstance.methods
        .sellEggs()
        .send({ from: account }, (error, result) => {
          if (!error) {
            setSellpending(true);
          }
        })
        .on("receipt", async function (receipt) {
          setSellpending(false);
          fetchDataFromContract(contractInstance, web3Instance, account);
          toast.success(<ToastMsg receipt={receipt} />, {
            position: "bottom-right",
          });
        })
        .catch((err) => {
          toast.error("Transaction Rejected", {
            position: "bottom-right",
          });
          setSellpending(false);
        });
    } else {
      toast.error("Connect to your wallet", {
        position: "bottom-right",
      });
    }
  };
  const handleDonate = async (amount) => {
    if (new Date().getTime() < 1652554800000) {
      return toast.warn("Launch date is Saturday 14th May 2022 at 7pm UTC", {
        position: "bottom-right",
      });
    }
    const checkChain = await checkChainId();
    if (!checkChain) {
      return toast.error("Wrong network", {
        position: "bottom-right",
      });
    }
    if (account) {
      if(Number(amount) > 0){
        const contractInstance = new web3Instance.eth.Contract(
          ABI,
          process.env.REACT_APP_CONTRACT
        );
        await contractInstance.methods
          .donate(web3Instance.utils.toWei(amount.toString()))
          .send(
            {
              from: account,
            },
            (error, result) => {
              if (!error) {
                setDonatePending(true);
              }
            }
          )
          .on("receipt", function (receipt) {
            setDonatePending(false);
            fetchDataFromContract(Contract, web3Instance, account);
            toast.success(<ToastMsg receipt={receipt} type="token" />, {
              position: "bottom-right",
            });
          })
          .catch((err) => {
            toast.error("Transaction Rejected", {
              position: "bottom-right",
            });
            setDonatePending(false);
          });
      }else{
        toast.error("Enter vaild amount", {
          position: "bottom-right",
        });
      }
    } else {
      toast.error("Connect to your wallet", {
        position: "bottom-right",
      });
    }
  };
  const disconnectWallet = async () => {
    setAccount(null);
    localStorage.removeItem("WEB3_CONNECT_CACHED_PROVIDER");
    localStorage.removeItem("walletconnect");
    localStorage.removeItem("account");
    setProvider(null);
    clearInterval(interv);
  };
  const approveBusd = async (account) => {
    const checkChain = await checkChainId();
    if (!checkChain) {
      return toast.error("Wrong network", {
        position: "bottom-right",
      });
    }
    if (account) {
      try {
        const ContractInst = new web3Instance.eth.Contract(
          BUSDTOKENABI,
          process.env.REACT_APP_BUSD_CONRACT
        );
        const amountNumber = 1000000000000000000000000000000 * Math.pow(10, 18);
        const amountNumberWei = "0x" + amountNumber.toString(16);
        ContractInst.methods
          .approve(process.env.REACT_APP_CONTRACT, amountNumberWei)
          .send({ from: account }, (error, result) => {
            if (!error) {
              setPending(true);
            } else {
            }
          })
          .on("receipt", (receipt) => {
            toast.success("Enable Successfully");
            setBusdStakeText("Buy birds");
            setDonateText('Donate Now')
            setPending(false);
          })
          .on("error", (err) => {
            toast.error(err);
            setPending(false);
          });
      } catch (error) {
        console.log("Failed: " + error);
      }
    } else {
      toast.error("Please connect to your wallet");
    }
  };
  const checkEnable = async (web3, account) => {
    const ContractBusdInst = new web3.eth.Contract(
      BUSDTOKENABI,
      process.env.REACT_APP_BUSD_CONRACT
    );
    await ContractBusdInst.methods
      .allowance(account, process.env.REACT_APP_CONTRACT)
      .call((error, result) => {
        if (!error) {
          if (result > 0) {
            setBusdStakeText("Buy birds");
            setDonateText('Donate Now')
          } else {
            setBusdStakeText("Enable");
            setDonateText('Enable')
          }
        }
      });
  };
  const handleChangeNetwork = (web3) => {
    if (window.ethereum) {
      window.ethereum
        .request({
          method: "wallet_addEthereumChain",
          params: networkData,
        })
        .then(() => {
          connectToWallet();
          setNetworkOpen(false);
        });
    }
  };
  const checkChainId = async () => {
    if (web3Instance) {
      const chainId = await web3Instance.eth.net.getId();
      if (Number(chainId) === Number(process.env.REACT_APP_CHAIN_ID)) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };
  const changeNetworkOpen = () => {
    setNetworkOpen(false);
  };
  const changeUserCheckPoint = () => {
    setUserCheckPoint(0);
    setRefCheck(false)
  };
  const context = {
    provider: provider,
    web3Instance: web3Instance,
    Contract: Contract,
    account: account,
    usdPrice: usdPrice,
    walletBalance: walletBalance,
    handleConnectToWallet: connectToWallet,
    handleDisconnectWallet: disconnectWallet,
    pending: pending,
    changeUserCheckPoint: changeUserCheckPoint,
    userCheckPoint,
    buyBird,
    sellBird,
    approveBusd,
    changeNetworkOpen,
    handleChangeNetwork,
    myMiner,
    myreward,
    hatchpending,
    Sellpending,
    networkOpen,
    busdStakeText,
    hatchBird,
    refCheck,
    handleDonate,
    donatepending,
    donateText
  };
  return (
    <BlockchainContext.Provider value={context}>
      {props.children}
    </BlockchainContext.Provider>
  );
};

export default BlockchainContext;
