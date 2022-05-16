import { connectors } from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';
//Icons

export const providers = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      rpc: {
        1:  'https://bsc-dataseed.binance.org/',
        56: 'https://bsc-dataseed.binance.org/',
      },
    },
  },
};


export const mobileProviders = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      rpc: {
        1:  'https://bsc-dataseed.binance.org/',
        56: 'https://bsc-dataseed.binance.org/',
      },
    },
  },
};