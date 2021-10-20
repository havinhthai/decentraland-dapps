/// <reference types="react" />
import { LoginModalProps } from 'decentraland-ui';
import LoginModal from './LoginModal';
declare const _default: import("react-redux").ConnectedComponent<typeof LoginModal, import("react-redux").Omit<Pick<import("react").ClassAttributes<LoginModal> & import("./LoginModal.types").DefaultProps & LoginModalProps & {
    hasTranslations?: boolean | undefined;
    onConnect: (providerType: import("decentraland-connect/dist").ProviderType) => any;
}, "hasTranslations" | keyof LoginModalProps | "onConnect" | keyof import("react").ClassAttributes<LoginModal>> & Partial<Pick<import("react").ClassAttributes<LoginModal> & import("./LoginModal.types").DefaultProps & LoginModalProps & {
    hasTranslations?: boolean | undefined;
    onConnect: (providerType: import("decentraland-connect/dist").ProviderType) => any;
}, "isLoading">> & Partial<Pick<import("./LoginModal.types").DefaultProps, never>>, "open" | "message" | "loading" | "className" | "onClose" | "i18n" | "hasError"> & LoginModalProps>;
export default _default;
