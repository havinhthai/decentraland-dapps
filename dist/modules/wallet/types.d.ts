import { ChainId, Network } from '@dcl/schemas';
import { Provider, ProviderType } from 'decentraland-connect';
export { Provider, ProviderType };
export declare type NetworkData = {
    mana: number;
    chainId: ChainId;
};
export declare type Networks = Record<Network, NetworkData>;
export interface Wallet {
    address: string;
    networks: Networks;
    network: Network;
    chainId: ChainId;
    providerType: ProviderType;
}
export interface CreateWalletOptions {
    MANA_ADDRESS?: string;
    CHAIN_ID: string | number;
    TRANSACTIONS_API_URL?: string;
    POLL_INTERVAL?: number;
}
export declare type AddEthereumChainParameters = {
    chainId: string;
    chainName: string;
    nativeCurrency: {
        name: string;
        symbol: string;
        decimals: 18;
    };
    rpcUrls: string[];
    blockExplorerUrls?: string[];
    iconUrls?: string[];
};
