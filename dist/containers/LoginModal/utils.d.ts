import { ProviderType } from "decentraland-connect/dist/types";
import { LoginModalOptionType } from "decentraland-ui/dist/components/LoginModal/LoginModal";
export declare function toModalOptionType(providerType: ProviderType): LoginModalOptionType | undefined;
export declare function toProviderType(modalOptionType: LoginModalOptionType): ProviderType;
