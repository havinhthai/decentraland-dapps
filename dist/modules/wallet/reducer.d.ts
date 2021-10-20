import { LoadingState } from '../loading/reducer';
import { Wallet } from './types';
import { ConnectWalletRequestAction, ConnectWalletSuccessAction, ConnectWalletFailureAction, DisconnectWalletAction, ChangeAccountAction, ChangeNetworkAction, EnableWalletRequestAction, EnableWalletSuccessAction, EnableWalletFailureAction, FetchWalletRequestAction, FetchWalletSuccessAction, FetchWalletFailureAction, AcceptNetworkPartialSupportAction } from './actions';
export declare type WalletState = {
    data: Wallet | null;
    loading: LoadingState;
    error: string | null;
    hasAcceptedNetworkPartialSupport: boolean;
};
export declare const INITIAL_STATE: WalletState;
export declare type WalletReducerAction = ConnectWalletRequestAction | ConnectWalletSuccessAction | ConnectWalletFailureAction | EnableWalletRequestAction | EnableWalletSuccessAction | EnableWalletFailureAction | DisconnectWalletAction | ChangeAccountAction | ChangeNetworkAction | FetchWalletRequestAction | FetchWalletSuccessAction | FetchWalletFailureAction | AcceptNetworkPartialSupportAction;
export declare function walletReducer(state: WalletState | undefined, action: WalletReducerAction): WalletState;
