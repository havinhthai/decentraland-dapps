import { Dispatch } from 'redux';
import { LoginModalProps } from 'decentraland-ui';
import { ProviderType } from 'decentraland-connect';
import { EnableWalletRequestAction } from '../../modules/wallet/actions';
export declare type DefaultProps = {
    isLoading: boolean;
};
export declare type Props = DefaultProps & LoginModalProps & {
    hasTranslations?: boolean;
    onConnect: (providerType: ProviderType) => any;
};
export declare type State = {
    hasError: boolean;
};
export declare type MapStateProps = Pick<Props, 'hasTranslations' | 'isLoading' | 'hasError'>;
export declare type MapDispatchProps = Pick<Props, 'onConnect'>;
export declare type MapDispatch = Dispatch<EnableWalletRequestAction>;
