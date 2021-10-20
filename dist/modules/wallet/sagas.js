"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createWalletSaga = exports.walletSaga = void 0;
const effects_1 = require("redux-saga/effects");
const schemas_1 = require("@dcl/schemas");
const decentraland_connect_1 = require("decentraland-connect");
const eth_1 = require("../../lib/eth");
const actions_1 = require("./actions");
const utils_1 = require("./utils");
const selectors_1 = require("./selectors");
// Patch Samsung's Cucumber provider send to support promises
const provider = window.ethereum;
let cucumberProviderSend;
if (eth_1.isCucumberProvider()) {
    const _send = provider.send;
    cucumberProviderSend = (...args) => {
        try {
            return Promise.resolve(_send.apply(provider, args)).then(accounts => (accounts === null || accounts === void 0 ? void 0 : accounts.result) || []);
        }
        catch (err) {
            return Promise.reject(err);
        }
    };
}
// Can be set on createWalletSaga
let CHAIN_ID;
let POLL_INTERVAL = 5 * 60 * 1000; // 60 seconds
let polling = false;
function* walletSaga() {
    yield effects_1.all([
        effects_1.takeEvery(actions_1.CONNECT_WALLET_REQUEST, handleConnectWalletRequest),
        effects_1.takeEvery(actions_1.ENABLE_WALLET_REQUEST, handleEnableWalletRequest),
        effects_1.takeEvery(actions_1.ENABLE_WALLET_SUCCESS, handleEnableWalletSuccess),
        effects_1.takeEvery(actions_1.FETCH_WALLET_REQUEST, handleFetchWalletRequest),
        effects_1.takeEvery(actions_1.DISCONNECT_WALLET, handleDisconnectWallet),
        effects_1.takeEvery(actions_1.CONNECT_WALLET_SUCCESS, handleConnectWalletSuccess),
        effects_1.takeEvery(actions_1.SWITCH_NETWORK_REQUEST, handleSwitchNetworkRequest),
        effects_1.takeEvery(actions_1.SWITCH_NETWORK_SUCCESS, handleSwitchNetworkSucces)
    ]);
}
exports.walletSaga = walletSaga;
function* handleConnectWalletRequest() {
    try {
        yield effects_1.put(actions_1.fetchWalletRequest());
        const { success, failure } = yield effects_1.race({
            success: effects_1.take(actions_1.FETCH_WALLET_SUCCESS),
            failure: effects_1.take(actions_1.FETCH_WALLET_FAILURE)
        });
        if (success) {
            yield effects_1.put(actions_1.connectWalletSuccess(success.payload.wallet));
        }
        else {
            throw new Error(failure.payload.error);
        }
    }
    catch (error) {
        yield effects_1.put(actions_1.disconnectWallet());
        yield effects_1.put(actions_1.connectWalletFailure(error.message));
    }
}
function* handleEnableWalletRequest(action) {
    const { providerType } = action.payload;
    try {
        const account = yield effects_1.call(() => __awaiter(this, void 0, void 0, function* () {
            if (eth_1.isCucumberProvider()) {
                yield cucumberProviderSend('eth_requestAccounts');
            }
            const { account } = yield decentraland_connect_1.connection.connect(providerType, CHAIN_ID);
            return account;
        }));
        if (!account) {
            throw new Error('Enable did not return any accounts');
        }
        yield effects_1.put(actions_1.enableWalletSuccess(providerType));
    }
    catch (error) {
        yield effects_1.put(actions_1.disconnectWallet());
        yield effects_1.put(actions_1.enableWalletFailure(error.message));
    }
}
function* handleEnableWalletSuccess(_action) {
    yield effects_1.put(actions_1.connectWalletRequest());
}
function* handleDisconnectWallet(_action) {
    try {
        yield effects_1.call(() => decentraland_connect_1.connection.disconnect());
    }
    catch (error) {
        console.error(error);
    }
    // stop polling wallet balances
    polling = false;
}
function* handleFetchWalletRequest(_action) {
    try {
        const wallet = yield effects_1.call(utils_1.buildWallet);
        yield effects_1.put(actions_1.fetchWalletSuccess(wallet));
    }
    catch (error) {
        yield effects_1.put(actions_1.fetchWalletFailure(error.message));
    }
}
function* handleConnectWalletSuccess() {
    // poll wallet balances
    if (!polling && POLL_INTERVAL > 0) {
        polling = true;
        while (polling) {
            yield effects_1.delay(POLL_INTERVAL);
            const isWalletConnected = yield effects_1.select(selectors_1.isConnected);
            if (isWalletConnected) {
                yield effects_1.put(actions_1.fetchWalletRequest());
            }
        }
    }
}
function* handleSwitchNetworkRequest(action) {
    const { chainId } = action.payload;
    const provider = yield effects_1.call(eth_1.getConnectedProvider);
    try {
        if (!provider) {
            throw new Error('Could not get provider');
        }
        yield effects_1.call([provider, 'request'], {
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0x' + chainId.toString(16) }]
        });
        yield effects_1.put(actions_1.switchNetworkSuccess(chainId));
    }
    catch (switchError) {
        // This error code indicates that the chain has not been added to MetaMask.
        if (provider && switchError.code === 4902) {
            try {
                yield effects_1.call([provider, 'request'], {
                    method: 'wallet_addEthereumChain',
                    params: [utils_1.getAddEthereumChainParameters(chainId)]
                });
                const newChainId = yield effects_1.call([provider, 'request'], {
                    method: 'eth_chainId',
                    params: []
                });
                if (chainId !== parseInt(newChainId, 16)) {
                    throw new Error('chainId did not change after adding network');
                }
                yield effects_1.put(actions_1.switchNetworkSuccess(chainId));
                return;
            }
            catch (addError) {
                yield effects_1.put(actions_1.switchNetworkFailure(chainId, `Error adding network: ${addError.message}`));
                return;
            }
        }
        yield effects_1.put(actions_1.switchNetworkFailure(chainId, `Error switching network: ${switchError.message}`));
    }
}
function* handleSwitchNetworkSucces(_action) {
    yield effects_1.put(actions_1.fetchWalletRequest());
}
function createWalletSaga(options) {
    if (eth_1.isValidChainId(options.CHAIN_ID)) {
        CHAIN_ID = Number(options.CHAIN_ID);
    }
    else {
        throw new Error(`Invalid Chain id ${options.CHAIN_ID}. Valid options are ${Object.values(schemas_1.ChainId)}`);
    }
    if (options.MANA_ADDRESS) {
        console.warn('Deprecated notice: the MANA_ADDRESS option on `createWalletSaga` has been deprecated and will be removed in future version.');
    }
    if (options.POLL_INTERVAL) {
        POLL_INTERVAL = options.POLL_INTERVAL;
    }
    if (options.TRANSACTIONS_API_URL) {
        utils_1.setTransactionsApiUrl(options.TRANSACTIONS_API_URL);
    }
    else {
        console.warn(`"TRANSACTIONS_API_URL" not provided on createWalletSaga, using default value "${utils_1.getTransactionsApiUrl()}".`);
    }
    return walletSaga;
}
exports.createWalletSaga = createWalletSaga;
//# sourceMappingURL=sagas.js.map