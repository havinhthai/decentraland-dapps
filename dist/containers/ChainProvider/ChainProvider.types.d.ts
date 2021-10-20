/// <reference types="react" />
import { Dispatch } from 'redux';
import { ChainId, Network } from '@dcl/schemas';
export declare type ChainData = {
    chainId: ChainId | null;
    network: Network | null;
    isConnected: boolean;
    isSupported: boolean;
    isPartiallySupported: boolean;
    isUnsupported: boolean;
};
export declare type Props = ChainData & {
    children: (data: ChainData) => React.ReactNode;
};
export declare type MapStateProps = Pick<Props, 'chainId' | 'network' | 'isConnected' | 'isSupported' | 'isPartiallySupported' | 'isUnsupported'>;
export declare type MapDispatchProps = {};
export declare type MapDispatch = Dispatch;
