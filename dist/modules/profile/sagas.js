"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProfileSaga = void 0;
const effects_1 = require("redux-saga/effects");
const dcl_catalyst_commons_1 = require("dcl-catalyst-commons");
const peer_1 = require("../../lib/peer");
const entities_1 = require("../../lib/entities");
const actions_1 = require("../wallet/actions");
const actions_2 = require("./actions");
function createProfileSaga({ peerUrl }) {
    const peerApi = new peer_1.PeerAPI(peerUrl);
    const entities = new entities_1.EntitesOperator(peerUrl);
    function* profileSaga() {
        yield effects_1.takeEvery(actions_2.LOAD_PROFILE_REQUEST, handleLoadProfileRequest);
        yield effects_1.takeEvery(actions_2.SET_PROFILE_AVATAR_DESCRIPTION_REQUEST, handleSetProfileDescription);
        yield effects_1.takeLatest(actions_1.CONNECT_WALLET_SUCCESS, handleWallet);
        yield effects_1.takeLatest(actions_1.CHANGE_ACCOUNT, handleWallet);
    }
    function* handleLoadProfileRequest(action) {
        const { address } = action.payload;
        try {
            const profile = yield effects_1.call([peerApi, 'fetchProfile'], address);
            yield effects_1.put(actions_2.loadProfileSuccess(address, profile));
        }
        catch (error) {
            yield effects_1.put(actions_2.loadProfileFailure(address, error.message));
        }
    }
    function* handleWallet(action) {
        yield effects_1.put(actions_2.loadProfileRequest(action.payload.wallet.address));
    }
    /**
     * Handles the action to set the description of a user's profile.
     * This handler gets the first profile entity of a given address
     * and then rebuilds it with the specified description to deploy it
     * again.
     *
     * @param action - The action that triggered the handler.
     */
    function* handleSetProfileDescription(action) {
        try {
            const { address, description } = action.payload;
            const entity = yield effects_1.call([entities, 'getProfileEntity'], address);
            // Does a profile always have an avatar?
            const newAvatar = Object.assign(Object.assign({}, entity.metadata.avatars[0]), { version: entity.metadata.avatars[0].version + 1, description: description });
            const newEntity = Object.assign(Object.assign({}, entity), { metadata: Object.assign(Object.assign({}, entity.metadata), { avatars: [newAvatar, ...entity.metadata.avatars.slice(1)] }) });
            yield effects_1.call([entities, 'deployEntityWithoutNewFiles'], newEntity, dcl_catalyst_commons_1.EntityType.PROFILE, action.payload.address);
            yield effects_1.put(actions_2.setProfileAvatarDescriptionSuccess(action.payload.address, newAvatar.description, newAvatar.version));
        }
        catch (error) {
            yield effects_1.put(actions_2.setProfileAvatarDescriptionFailure(action.payload.address, error.message));
        }
    }
    return profileSaga;
}
exports.createProfileSaga = createProfileSaga;
//# sourceMappingURL=sagas.js.map