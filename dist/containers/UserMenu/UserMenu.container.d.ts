/// <reference types="react" />
import { Props } from './UserMenu.types';
import UserMenu from './UserMenu';
declare const _default: import("react-redux").ConnectedComponent<typeof UserMenu, import("react-redux").Omit<import("react").ClassAttributes<UserMenu> & import("decentraland-ui").UserMenuProps & {
    hasTranslations: boolean;
}, "address" | "avatar" | "hasTranslations" | "i18n" | "onSignIn" | "onSignOut" | "isSignedIn" | "isSigningIn" | "manaBalances" | "hasActivity" | "isActivity" | "menuItems" | "onClickProfile" | "onClickActivity" | "onClickSettings" | "onClickBalance"> & Partial<Props>>;
export default _default;
