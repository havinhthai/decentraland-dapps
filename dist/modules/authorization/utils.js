"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidType = exports.areEqual = exports.hasAuthorization = exports.getTokenAmountToApprove = void 0;
const utils_1 = require("web3x/utils");
const types_1 = require("./types");
function getTokenAmountToApprove() {
    return utils_1.toBN(2)
        .pow(utils_1.toBN(256))
        .sub(utils_1.toBN(1));
}
exports.getTokenAmountToApprove = getTokenAmountToApprove;
function hasAuthorization(authorizations, authorizationToFind) {
    return authorizations.some(authorization => areEqual(authorization, authorizationToFind));
}
exports.hasAuthorization = hasAuthorization;
function areEqual(left, right) {
    return (left.type === right.type &&
        left.authorizedAddress === right.authorizedAddress &&
        left.contractAddress === right.contractAddress &&
        left.chainId === right.chainId &&
        left.address === right.address);
}
exports.areEqual = areEqual;
function isValidType(type) {
    return Object.values(types_1.AuthorizationType).includes(type);
}
exports.isValidType = isValidType;
//# sourceMappingURL=utils.js.map