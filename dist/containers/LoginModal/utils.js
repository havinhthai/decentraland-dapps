"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toProviderType = exports.toModalOptionType = void 0;
const types_1 = require("decentraland-connect/dist/types");
const LoginModal_1 = require("decentraland-ui/dist/components/LoginModal/LoginModal");
const eth_1 = require("../../lib/eth");
const { METAMASK, DAPPER, SAMSUNG, FORTMATIC, COINBASE, WALLET_CONNECT } = LoginModal_1.LoginModalOptionType;
function toModalOptionType(providerType) {
    switch (providerType) {
        case types_1.ProviderType.INJECTED:
            if (eth_1.isCucumberProvider()) {
                return SAMSUNG;
            }
            else if (eth_1.isCoinbaseProvider()) {
                return COINBASE;
            }
            else if (eth_1.isDapperProvider()) {
                return DAPPER;
            }
            else {
                return METAMASK;
            }
        case types_1.ProviderType.FORTMATIC:
            return FORTMATIC;
        case types_1.ProviderType.WALLET_CONNECT:
            return WALLET_CONNECT;
        default:
            console.warn(`Invalid provider type ${providerType}`);
            return;
    }
}
exports.toModalOptionType = toModalOptionType;
function toProviderType(modalOptionType) {
    switch (modalOptionType) {
        case METAMASK:
        case COINBASE:
        case DAPPER:
        case SAMSUNG:
            return types_1.ProviderType.INJECTED;
        case FORTMATIC:
            return types_1.ProviderType.FORTMATIC;
        case WALLET_CONNECT:
            return types_1.ProviderType.WALLET_CONNECT;
        default:
            throw new Error(`Invalid login type ${modalOptionType}`);
    }
}
exports.toProviderType = toProviderType;
//# sourceMappingURL=utils.js.map